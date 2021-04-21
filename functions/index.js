'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()
var pathToFfmpeg = require('ffmpeg-static');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
// target command:
// ffmpeg -i ./input.mp3 -af silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=-30dB output.mp3

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

exports.generateThumbnail = functions.runWith(runtimeOpts).storage.object().onFinalize(async (object) => {
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
  functions.logger.log('Image downloaded locally to', tempFilePath);
  await spawn(pathToFfmpeg, ['-i', tempFilePath, '-af', `silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=${specifiedDB}dB`, outTempFilePath]);
  functions.logger.log('converted:', outTempFilePath);
  const thumbFileName = `out_${fileName}`;
  const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

  await bucket.upload(outTempFilePath, {
    destination: thumbFilePath,
    metadata: metadata,
  });
  fs.unlinkSync(tempFilePath);
  return fs.unlinkSync(outTempFilePath);
});
