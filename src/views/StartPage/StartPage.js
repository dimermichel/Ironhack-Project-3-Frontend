import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GetRangeDate from '../../components/getRangeDate/GetRangeDate';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Container from '@material-ui/core/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import { v4 as uuidv4 } from 'uuid';
import PACKLIST_SERVICE from '../../services/PackListServices';
import SelectList from '../../components/selectList/SelectList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../../components/alert/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  searchContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 3),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(2),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function StartPage(props) {
  const [load, setLoad] = useState(false);
  const [loadExternal, setLoadExternal] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [open, setOpen] = useState(false);
  const [initialDate, setInitialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [placeId, setPlaceId] = useState({ googleCityId: '' });

  const classes = useStyles();

  //console.log({props});
  useEffect(() => {
    PACKLIST_SERVICE.defaultList()
      .then((res) => {
        if (res.data) {
          const newArr = [...res.data];
          const mappedArr = newArr.map((el) => {
            const id = uuidv4();
            if (el.type === 'Essentials')
              return { ...el, id: id, selected: true };
            return { ...el, id: id, selected: false };
          });
          setResponse({ data: mappedArr });
          console.log({ response });
          setLoad(true);
        }
      })
      .catch((err) => {
        setLoad(true);
      });
  }, []);

  const handleClick = async () => {
    if (checkInputs()) {
      console.log('ALL GOOD TO GO!!!');
      setLoadExternal(true);
      try {
        const listResponseDB = await PACKLIST_SERVICE.sendList(response.data);
        console.log({ listResponseDB });
        const externalAPIsResponse = await PACKLIST_SERVICE.externalAPIs(
          placeId.googleCityId
        );
        console.log({ externalAPIsResponse });
        externalAPIsResponse.data.startDate = initialDate;
        externalAPIsResponse.data.endDate = finalDate;
        externalAPIsResponse.data.fullList = listResponseDB.data._id;
        const travelResponseDB = await PACKLIST_SERVICE.sendTravel(
          externalAPIsResponse.data
        );
        console.log({ travelResponseDB });
        props.history.push(`/travel/${travelResponseDB.data._id}`);
        setLoadExternal(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      setOpen(true);
    }
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleGetDate = (date) => {
    setInitialDate(date.start);
    setFinalDate(date.end);
  };

  const handlePlaceId = (placeId) => {
    setPlaceId({ googleCityId: placeId });
  };

  const toggleSelect = (id) => {
    const updatedList = response.data.map((list) => {
      if (list.id === id) {
        return { ...list, selected: !list.selected };
      }
      return list;
    });
    console.log({ id }, { updatedList });
    setResponse({ data: updatedList });
  };

  let responseList;

  if (load) {
    responseList = <SelectList {...response} toggle={toggleSelect} />;
  }

  const checkInputs = () => {
    let selectedList = false;
    if (response.data.some((list) => list.selected === true)) {
      console.log('Object found inside the array.');
      selectedList = true;
    } else {
      console.log('Object not found.');
      selectedList = false;
    }
    return placeId.googleCityId !== '' && selectedList ? true : false;
  };

  return (
    <>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <div className={classes.center}>
            <img
              src="https://res.cloudinary.com/dimermichel/image/upload/v1588659703/ironhackProject3/app_logo2.png"
              alt="logo"
              height="150"
              width="150"
            />
          </div>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Travelpacking App
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Let us help you step up your game and never forget what is important
            to you. Plan your next trip after COVID-19. As easy as 1, 2, and 3.
          </Typography>
        </Container>
      </div>
      <div className={classes.searchContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <b>Step 1</b> - Where are you going?
          </Typography>
        </Container>
        <SearchBar getPlaceId={handlePlaceId} />
      </div>
      <div className={classes.searchContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <b>Step 2</b> - Select the date
          </Typography>
        </Container>
        <GetRangeDate
          initialDate={initialDate}
          finalDate={finalDate}
          getDate={handleGetDate}
        />
      </div>
      <div className={classes.searchContent}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <b>Step 3</b> - Select your lists
          </Typography>
        </Container>
      </div>
      {responseList}
      <div className={classes.center}>
        <Backdrop className={classes.backdrop} open={loadExternal}>
          {loadExternal && <CircularProgress size={60} />}
        </Backdrop>
        <Grid container spacing={2} justify="center">
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              className={classes.button}
              onClick={handleClick}
              startIcon={<LocalMallOutlinedIcon />}
            >
              Pack Your Bags
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleToastClose}
        >
          <Alert onClose={handleToastClose} severity="error">
            Please, select a city and at least one list.{' '}
            <span role="img" aria-label="glasses">
              🤓
            </span>
          </Alert>
        </Snackbar>
      </div>
      {/* Footer */}
      <footer className={classes.footer}></footer>
      {/* End footer */}
    </>
  );
}
