import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';

import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 10,
    height: 325,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    width: '200px',
  },
  cover: {
    display: 'block',
    height: 100,
  },
  coverTile: {
    marginTop: 35,
    display: 'block',
    height: 100,
  },
  date: {
    marginTop: 20,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    alignItems: 'center',
    alignContent: 'center',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: '2rem',
  },
  centerText: {
    textAlign: 'center',
  },
  tile: {
    height: '100% !important',
  },
  titleBar: {
    background: '#fa8d62',
    //'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function Weather(props) {
  const [celsius, setCelsius] = useState(true);
  const classes = useStyles();
  const today = moment();
  const currentWeatherDate = props.weather.filter((el) =>
    moment(moment(el.datetime, 'YYYY-MM-DD')).isSame(
      moment(today, 'YYYY-MM-DD'),
      'day'
    )
  );

  const toggleScale = () => setCelsius(!celsius);
  const converterFahrenheit = (temp) => Math.round(temp * 1.8 + 32);
  console.log({ props });
  console.log({ currentWeatherDate });
  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item xs={8} justify="center" alignItems="center">
          <Card className={classes.root} variant="outlined">
            <div>
              {currentWeatherDate.length > 0 ? (
                <>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      Forecast{' '}
                      <IconButton
                        color="primary"
                        onClick={toggleScale}
                        aria-label="temperature scale"
                      >
                        {celsius ? 'ºC' : 'ºF'}
                      </IconButton>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {moment(currentWeatherDate.datetime).format('ddd')} -{' '}
                      {moment(currentWeatherDate.datetime).format('ll')}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {currentWeatherDate[0].description}
                    </Typography>
                  </CardContent>
                  <Container maxWidth="lg">
                    <Grid container justify="center" className={classes.center}>
                      <img
                        className={classes.cover}
                        src={currentWeatherDate[0].iconURL}
                        alt={currentWeatherDate[0].description}
                      />
                      <Typography component="h1" variant="h2">
                        {celsius
                          ? Math.round(currentWeatherDate[0].temp) + 'ºC'
                          : converterFahrenheit(currentWeatherDate[0].temp) +
                            'ºF'}
                      </Typography>
                    </Grid>
                  </Container>
                </>
              ) : (
                <>
                  <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                      Forecast{' '}
                      <IconButton
                        color="primary"
                        onClick={toggleScale}
                        aria-label="temperature scale"
                      >
                        {celsius ? 'ºC' : 'ºF'}
                      </IconButton>
                    </Typography>
                    <Typography variant="caption" gutterBottom>
                      {moment(props.weather[0].datetime).format('ddd')} -{' '}
                      {moment(props.weather[0].datetime).format('ll')}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {props.weather[0].description}
                    </Typography>
                  </CardContent>
                  <Container maxWidth="lg">
                    <Grid container justify="center" className={classes.center}>
                      <img
                        className={classes.cover}
                        src={props.weather[0].iconURL}
                        alt={props.weather[0].description}
                      />
                      <Typography component="h1" variant="h2">
                        {celsius
                          ? Math.round(props.weather[0].temp) + 'ºC'
                          : converterFahrenheit(props.weather[0].temp) + 'ºF'}
                      </Typography>
                    </Grid>
                  </Container>
                </>
              )}
            </div>
            <div className={classes.root2}>
              <GridList className={classes.gridList} cols={3}>
                {props.weather
                  .filter((el) =>
                    moment(el.datetime, 'YYYY-MM-DD').isBetween(
                      moment(props.initial, 'YYYY-MM-DD'),
                      moment(props.final, 'YYYY-MM-DD').add(1, 'd'),
                      null,
                      '(]'
                    )
                  )
                  .map((tile) => (
                    <GridListTile className={classes.tile} key={tile._id}>
                      <Typography component="h6" variant="h6">
                        {moment(tile.datetime).format('ddd')}
                      </Typography>

                      <Typography variant="caption" gutterBottom>
                        {tile.description}
                      </Typography>

                      <img
                        className={classes.coverTile}
                        src={tile.iconURL}
                        alt={tile.description}
                      />

                      <Typography
                        className={classes.centerText}
                        component="h5"
                        variant="h5"
                      >
                        {moment(tile.datetime).format('ll')}
                      </Typography>

                      <GridListTileBar
                        title={
                          celsius
                            ? Math.round(tile.temp) + 'ºC'
                            : converterFahrenheit(tile.temp) + 'ºF'
                        }
                        classes={{
                          root: classes.titleBar,
                          title: classes.title,
                        }}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
