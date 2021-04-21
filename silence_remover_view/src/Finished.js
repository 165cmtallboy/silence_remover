import { Typography, Grid } from "@material-ui/core";
import React from "react";

export default function Finished({ filename, callback }) {
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center" variant="h4">
                        変換が官僚しました。
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                        音声がダウンロードされます。
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}