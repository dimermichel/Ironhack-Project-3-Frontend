import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    height: 300,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    flex: 1,
  },
  date: {
    marginTop: 20,
  },
}));

export default function City(props) {
  const classes = useStyles();
  let parsedInitialDate = moment(props.initial).format('LL');
  let parsedFinalDate = moment(props.final).format('LL');

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item xs={8} justify="center" alignItems="center">
          <Card className={classes.root} variant="outlined">
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {props.city}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {props.state_code}, {props.country}
                </Typography>
                <Typography
                  className={classes.date}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  <b>Date</b>:
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {parsedInitialDate} - {parsedFinalDate}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              image={props.imgURL}
              title={props.city}
            />
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
