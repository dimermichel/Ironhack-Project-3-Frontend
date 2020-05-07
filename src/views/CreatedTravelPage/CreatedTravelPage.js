import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import TodoList from '../../components/todoList/TodoList';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../../components/alert/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import PACKLIST_SERVICE from '../../services/PackListServices';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory, useParams } from 'react-router-dom';
import City from '../../components/city/City';
import Weather from '../../components/weather/Weather';
import Container from '@material-ui/core/Container';
import Attractions from '../../components/attractions/Attractions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
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
  button: {
    marginTop: '4vh',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '10vh',
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

export default function CreatedTravelPage() {
  const [load, setLoad] = useState(false);
  const [loadExternal, setLoadExternal] = useState(false);
  const [cityDetails, setCityDetails] = useState({});
  const [fullList, setFullList] = useState({});
  const [attractions, setAttractions] = useState({ attractions: [] });
  const [open, setOpen] = useState(false);
  const [initialDate, setInitialDate] = useState({ initial: '' });
  const [finalDate, setFinalDate] = useState({ final: '' });
  const [weather, setWeather] = useState({ weather: [] });

  let { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    PACKLIST_SERVICE.detailTravel(id)
      .then((res) => {
        //console.log('Inside DB Call');
        const cityInfo = res.data;
        //console.log(cityInfo);
        if (cityInfo) {
          const cityDetails = {};
          cityDetails.city = cityInfo.city;
          cityDetails.state_code = cityInfo.state_code;
          cityDetails.country_code = cityInfo.country_code;
          cityDetails.country = cityInfo.country;
          cityDetails.imgURL = cityInfo.imgURL;
          setCityDetails(cityDetails);
          setFullList(cityInfo.fullList);
          setAttractions({ attractions: cityInfo.attractions });
          setWeather({ weather: cityInfo.weather });
          setInitialDate({ initial: cityInfo.startDate });
          setFinalDate({ final: cityInfo.endDate });
          //console.log({ fullList });
          setLoad(true);
        }
      })
      .catch((err) => {
        setLoad(true);
      });
  }, []);

  // React Router DOM CORE
  let history = useHistory();

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClick = async () => {
    //console.log('ALL GOOD TO GO!!!');
    setLoadExternal(true);
    //console.log({ fullList });
    let copyArray = {};
    copyArray = { ...fullList };
    //console.log({ copyArray });
    const newList = copyArray.lists.map((el) => {
      el.items = el.items.map((item) => {
        item._id = undefined;
        return item;
      });
      return el;
    });
    copyArray.lists = newList;
    try {
      const listResponseDB = await PACKLIST_SERVICE.sendListUpdate(
        fullList._id,
        copyArray.lists
      );
      //console.log({ listResponseDB });
      setLoadExternal(false);
      history.push(`/travels`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleListUpdate = (_id, todo, completion) => {
    //console.log({ _id, todo, completion });

    let copyArray = {};
    copyArray = { ...fullList };
    //console.log({ copyArray });
    const newList = copyArray.lists.map((el) => {
      if (el._id === _id) {
        el.items = todo.items;
        el.completed = completion.completed;
      }
      return el;
    });
    copyArray.lists = newList;

    setFullList(copyArray);
    //console.log({ fullList });
  };

  let result;
  let city;

  if (load) {
    //console.log({ fullList });
    result = fullList.lists
      .filter((list) => list.selected === true)
      .map((el) => {
        return (
          <Container maxWidth="lg">
            <Grid container justify="center">
              <Grid item xs={8} justify="center" alignItems="center">
                <TodoList
                  key={el._id}
                  _id={el._id}
                  title={el.title}
                  type={el.type}
                  items={el.items}
                  completed={el.completed}
                  update={handleListUpdate}
                />
              </Grid>
            </Grid>
          </Container>
        );
      });
    city = (
      <>
        <City {...cityDetails} {...initialDate} {...finalDate} />
        <Container maxWidth="lg">
          <Typography
            className={classes.text}
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Weather
          </Typography>
        </Container>
        <Weather {...weather} {...initialDate} {...finalDate} />
        <Container maxWidth="lg">
          <Typography
            className={classes.text}
            variant="h4"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Attractions
          </Typography>
        </Container>
        <Attractions {...attractions} />
      </>
    );
  }

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          className={classes.text}
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Travel Details
        </Typography>
      </Container>
      {city}
      <Container maxWidth="lg">
        <Typography
          className={classes.text}
          variant="h4"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Pack your bags
        </Typography>
      </Container>
      {result}
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
              startIcon={<FontAwesomeIcon icon={faSave} />}
            >
              Save
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
            <span role="img" aria-label="glass emoji">
              🤓
            </span>
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
