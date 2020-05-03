import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PACKLIST_SERVICE from '../../services/PackListServices';
import { useHistory } from 'react-router-dom';
import TravelCity from '../../components/travelCity/TravelCity';
import Container from '@material-ui/core/Container';
import ConfirmationDialog from '../../components/confirmationDialog/ConfirmationDialog';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
      marginBottom: '1vh',
    },
    marginBottom: '10vh',
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  text: {
    paddingTop: 40,
    paddingLeft: '17%',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '6vh',
  },
  paper: {
    width: '50%',
    maxHeight: 435,
  },
}));

export default function Travels() {
  const [load, setLoad] = useState(false);
  const [travels, setTravels] = useState([]);
  const [open, setOpen] = useState(false);
  const [travelId, setTravelId] = useState('');

  const classes = useStyles();

  useEffect(() => {
    PACKLIST_SERVICE.allTravels()
      .then((res) => {
        console.log('Inside DB Call');
        console.log({ STATUS: res.status });
        const allTravelsFromDB = res.data;
        console.log(allTravelsFromDB);
        if (allTravelsFromDB) {
          setTravels(allTravelsFromDB);
          setLoad(true);
        }
      })
      .catch((err) => {
        setLoad(true);
      });
  }, []);

  // React Router DOM CORE
  let history = useHistory();

  const handleOpenDialog = (id) => {
    setTravelId(id);
    setOpen(true);
  };

  const handleClose = (id) => {
    setOpen(false);
  };

  const handleDelete = async () => {
    console.log('ALL GOOD TO GO!!!');
    let response = await PACKLIST_SERVICE.deleteTravel(travelId);
    console.log({ response });
    if (response.status === 200) {
      let newArr = travels.filter((travel) => travel._id !== travelId);
      setTravels(newArr);
    }
  };

  let upComing;
  let previousTravels;

  if (load) {
    console.log({ travels });

    upComing = travels
      .filter((travel) => {
        let a = moment.utc(travel.startDate);
        let b = moment().utc();
        return a.isSameOrAfter(b);
      })
      .map((el) => {
        return (
          <Container maxWidth="lg">
            <Grid container justify="center">
              <Grid item xs={8} justify="center" alignItems="center">
                <TravelCity {...el} sure={handleOpenDialog} />
              </Grid>
            </Grid>
          </Container>
        );
      });

    previousTravels = travels
      .filter((travel) => {
        let a = moment.utc(travel.startDate);
        let b = moment().utc();
        return a.isBefore(b);
      })
      .map((el) => {
        return (
          <Container maxWidth="lg">
            <Grid container justify="center">
              <Grid item xs={8} justify="center" alignItems="center">
                <TravelCity {...el} sure={handleOpenDialog} />
              </Grid>
            </Grid>
          </Container>
        );
      });
  }

  return (
    <div className={classes.root}>
      <ConfirmationDialog
        id="confirmation"
        keepMounted
        open={open}
        onClose={handleClose}
        onDelete={handleDelete}
        classes={{
          paper: classes.paper,
        }}
      />
      <Container maxWidth="lg">
        <Typography
          className={classes.text}
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Upcoming Travels
        </Typography>
      </Container>
      {upComing}
      <Container maxWidth="lg">
        <Typography
          className={classes.text}
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Previous Travels
        </Typography>
      </Container>
      {previousTravels}
    </div>
  );
}
