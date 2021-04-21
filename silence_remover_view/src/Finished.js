import { Typography, Grid, Link } from "@material-ui/core";
import React from "react";

export default function Finished({ converted }) {
    console.info(converted);
    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Typography align="center" variant="h4">
                        変換完了！
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center" variant="h6">
                        <Link href={converted}>
                            クリックしてダウンロード
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}