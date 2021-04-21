import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import UploadForm from './UploadForm';
import firebase from './firebase';
import WaitingForConvert from './WaitingForConvert';
import Finished from './Finished';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://twitter.com/techan54321">
        無音リムーバー from 165cmtallboy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <Link color="inherit" href="https://forms.gle/kcP2bX38ro7ni3436">
        お問い合わせ
      </Link>{' '}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['ファイルをアップロード', 'データを変換', 'ダウンロード'];

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loadedFilename, onLoadedFilename] = React.useState(null);

  React.useEffect(() => {
    // login when component initialized
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.info('okay i know who you are:', user);
      } else {
        console.info('user not logged in!')
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({
          hd: "g.kogakuin.jp"
        });
        firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            var user = result.user;
            console.info('okay logged in:', user);
          }).catch((error) => {
            alert(error.message);
            window.location.reload();
          });
      }
    });
  }, []);

  const uploadCallback = (filepath) => {
    setActiveStep(1);
    onLoadedFilename(filepath);
  }

  const onCovnertFinished = () => {
    setActiveStep(2);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UploadForm callback={uploadCallback} />;
      case 1:
        return <WaitingForConvert filename={loadedFilename} callback={onCovnertFinished} />;
      case 2:
        return <Finished />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            無音リムーバー
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            <React.Fragment>
              {getStepContent(activeStep)}
            </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}