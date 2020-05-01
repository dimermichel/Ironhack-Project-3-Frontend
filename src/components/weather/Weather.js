import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
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
    color: 'white',
    fontSize: '2rem',
  },
  tile: {
    height: '100% !important',
  },
  titleBar: {
    background: '#3f51b5',
    //'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

export default function Weather(props) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item xs={8} justify="center" alignItems="center">
          <Card className={classes.root} variant="outlined">
            <div>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  Current Weather
                </Typography>

                <Typography variant="h5" color="textSecondary">
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
                    {props.weather[0].temp}ºC
                  </Typography>
                </Grid>
              </Container>
            </div>
            <div className={classes.root2}>
              <GridList className={classes.gridList} cols={3}>
                {props.weather.map((tile) => (
                  <GridListTile className={classes.tile} key={tile._id}>
                    <img
                      className={classes.cover}
                      src={tile.iconURL}
                      alt={tile.description}
                    />
                    <Typography component="h4" variant="h4">
                      {moment(tile.datetime).format('ll')}
                    </Typography>

                    <GridListTileBar
                      title={tile.temp + 'ºC'}
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
