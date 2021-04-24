'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
var pathToFfmpeg = require('ffmpeg-static');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const archiver = require('archiver');
const unzipper = require('unzipper');
const fs = require('fs');
const { rejects } = require('assert');
// target command:
// ffmpeg -i ./input.mp3 -af silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=-30dB output.mp3

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

async function convert(input, output, db) {
  await spawn(pathToFfmpeg, ['-i', input, '-af', `silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=${db}dB`, output]);
}

exports.generateThumbnail = functions.region('asia-northeast1').runWith(runtimeOpts).storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;

  var fileName = path.basename(filePath);

  if (fileName.startsWith('out_')) {
    return functions.logger.log('nothing to do.');
  }

  const specifiedDB = parseInt(fileName.match("_(.*)dB_")[1]);

  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const outTempFilePath = path.join(os.tmpdir(), 'out_' + fileName);

  const metadata = {
    contentType: contentType,
  };
  await bucket.file(filePath).download({ destination: tempFilePath });
  functions.logger.log('Audio downloaded locally to', tempFilePath);


  if (fileName.endsWith('pptx')) {
    // there's fucking pptx

    // making pptx dir
    const pptx_unzipped = path.join(os.tmpdir(), 'pptxExtract_' + fileName);
    fs.mkdirSync(pptx_unzipped)
    functions.logger.log('UNZIPPING:', outTempFilePath);
    const renamed_pptx = tempFilePath.replace('.pptx', '.zip');
    fs.renameSync(tempFilePath, renamed_pptx)
    await fs.createReadStream(renamed_pptx)
      .pipe(unzipper.Extract({ path: pptx_unzipped }))
      .promise();
    fs.unlinkSync(renamed_pptx);
    const media_path = path.join(pptx_unzipped, 'ppt/_media');
    const dest_media_path = path.join(pptx_unzipped, 'ppt/media');
    fs.renameSync(dest_media_path, media_path);

    fs.mkdirSync(dest_media_path);
    var medias = fs.readdirSync(media_path);
    functions.logger.log('CONVERT START:', outTempFilePath);
    await Promise.all(medias.map(async (file) => await convert(path.join(media_path, file), path.join(dest_media_path, file), specifiedDB)));

    functions.logger.log('CONVERT END:', outTempFilePath);
    await new Promise((resolve) => {
      functions.logger.log('ZIPPING START:', outTempFilePath);
      const output = fs.createWriteStream(outTempFilePath);
      const archive = archiver('zip');
      archive.pipe(output);
      output.on('end', () => resolve());
      output.on('finish', () => resolve());
      archive.directory(pptx_unzipped, false);
      archive.finalize();
    })

    functions.logger.log('ROUTINE END.', outTempFilePath);
    await spawn('rm', ['-r', pptx_unzipped]);
  } else {
    await convert(tempFilePath, outTempFilePath, specifiedDB);
  }



  functions.logger.log('converted:', outTempFilePath);
  const outputFilename = `out_${fileName}`;
  const writeDestination = path.join(path.dirname(filePath), outputFilename);

  await bucket.upload(outTempFilePath, {
    destination: writeDestination,
    metadata: metadata,
  });
  return fs.unlinkSync(outTempFilePath);
});
