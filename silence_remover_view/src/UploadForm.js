import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button, Slider } from '@material-ui/core';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import firebase from './firebase';


const useStyles = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    warn: {
        textAlign: 'right',
        fontSize: '5px',
        color: 'gray'
    }
}));


export default function AddressForm({ callback }) {
    const classes = useStyles();
    const [progress, onProgress] = useState(null);
    const [limit, onLimit] = useState(-30);
    const [file, onFile] = useState(null);

    const onUploadFileSet = async (event) => {
        var file = event.currentTarget.files[0];
        onFile(file);
        let storage = firebase.app().storage();
        let ref = storage.ref();
        var user = firebase.auth().currentUser;

        var saveRef = ref.child(`files/${user.uid}/_${limit}dB_${file.name}`);
        var uploadTask = saveRef.put(file)

        uploadTask.on('state_changed', (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(progress);
        })

        uploadTask.then((snapshot) => {
            console.info(snapshot);
            callback(saveRef.name);
        });
    }

    return (
        <React.Fragment>
            <Grid container justify="space-around">
                <Grid item xs={12}>
                    <Typography id="discrete-slider" gutterBottom>
                        無音しきい値(dB)
                    </Typography>
                    <Slider
                        defaultValue={-30}
                        getAriaValueText={(tex) => `-${tex} dB`}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={10}
                        marks
                        onChange={(_, l) => onLimit(l)}
                        min={-80}
                        max={-10}
                    />
                    <div className={classes.warn}>
                        この数値よりも下の音量を削除します。無音がまだ残っているときは右にもっていきましょう
                    </div>
                </Grid>
                <Grid item container xs={12} justify="center">
                    <input
                        accept="audio/*"
                        className={classes.input}
                        onChange={onUploadFileSet}
                        id="contained-button-file"
                        type="file"
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            disabled={!!file}
                            component="span"
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<AudiotrackIcon />}
                        >ファイルを選択 </Button>
                    </label>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center">
                        {file?.name}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {progress ? <LinearProgressWithLabel value={progress} /> : null}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}