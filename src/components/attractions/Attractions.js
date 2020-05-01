import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
    height: 150,
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    objectFit: 'cover',
    maxHeight: 400,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
  },
  star: {
    marginRight: 20,
    marginLeft: 0,
  },
}));

function Attractions(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.attractions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item xs={8} justify="center" alignItems="center">
          <div className={classes.root}>
            <Paper square elevation={0} className={classes.header}>
              <Rating
                className={classes.star}
                name="read-only"
                // precision={0.5}
                value={props.attractions[activeStep].score / 2}
                readOnly
              />
              <Typography>{props.attractions[activeStep].name}</Typography>
            </Paper>
            <AutoPlaySwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={activeStep}
              interval={8000}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {props.attractions.map((step, index) => (
                <div key={step.name}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img
                      className={classes.img}
                      src={step.imgURL}
                      alt={step.name}
                    />
                  ) : null}
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <Paper square elevation={1} className={classes.bottom}>
              <Typography>{props.attractions[activeStep].snippet}</Typography>
            </Paper>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Back
                </Button>
              }
            />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Attractions;
