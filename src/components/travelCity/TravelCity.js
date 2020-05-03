import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
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
    flex: 1,
  },
  space: {
    marginTop: 20,
  },
}));

export default function TravelCity(props) {
  const classes = useStyles();

  let startDate = moment(props.startDate).format('ll');
  let finalDate = moment(props.endDate).format('ll');

  return (
    <Container key={props._id} maxWidth="lg" className={classes.space}>
      <Grid container justify="center">
        <Grid item xs={12} justify="center" alignItems="center">
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
                  className={classes.space}
                  variant="subtitle1"
                  color="textSecondary"
                >
                  {startDate} - {finalDate}
                </Typography>
                <Link
                  to={`/travel/${props._id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    className={classes.space}
                    variant="outlined"
                    color="primary"
                    startIcon={<ListAltOutlinedIcon />}
                  >
                    Details
                  </Button>
                </Link>
                <div className={classes.space}>
                  <Button
                    onClick={() => props.sure(props._id)}
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </div>
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
