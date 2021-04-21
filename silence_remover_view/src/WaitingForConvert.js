import { Typography, Grid, LinearProgress } from "@material-ui/core";
import React from "react";
import firebase from './firebase';

export default function WaitingForConvert({ filename, callback }) {
    React.useEffect(() => {
        if (!filename)
            return;
        let storage = firebase.app().storage();
        var user = firebase.auth().currentUser;
        let ref = storage.ref();

        let child = ref.child(`files/${user.uid}`);
        const reload = () => child.listAll().then((res) => {
            console.info(res.items);
            const found = res.items.find((file) => file.name === `out_${filename}`)?.name;
            if (!found)
                return;

            let child = ref.child(`files/${user.uid}/out_${filename}`);
            child.getDownloadURL().then((url) => {
                clearInterval(reload_inverval);
                window.open(url);
                callback();
            })
        });

        var reload_inverval = setInterval(reload, 5000);

    }, [filename])

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center">
                        ファイルの変換を待っています。。。
                        <LinearProgress />
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}