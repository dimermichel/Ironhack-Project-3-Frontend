import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GetRangeDate from '../../components/getRangeDate/GetRangeDate';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import TodoList from '../../components/todoList/TodoList';
import { v4 as uuidv4 } from 'uuid';
import PACKLIST_SERVICE from '../../services/PackListServices';
import SelectList from '../../components/selectList/SelectList';
import { useHistory, useParams } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
}));

export default function CreatedTravelPage() {
  const [load, setLoad] = useState(false);
  const [responseTravel, setResponseTravel] = useState({ data: {} });
  const [open, setOpen] = useState(false);
  //   const [initialDate, setInitialDate] = useState(new Date());
  //   const [finalDate, setFinalDate] = useState(new Date());
  //   const [placeId, setPlaceId] = useState({ googleCityId: '' });

  let { id } = useParams();
  const classes = useStyles();

  useEffect(() => {
    PACKLIST_SERVICE.detailTravel(id)
      .then((res) => {
        console.log('Inside DB Call');
        const cityDetails = res.data;
        console.log(cityDetails);
        if (cityDetails) {
          setResponseTravel({ data: cityDetails });
          console.log({ responseTravel });
          setLoad(true);
        }
      })
      .catch((err) => {
        setLoad(true);
      });
  }, []);

  // React Router DOM CORE
  let history = useHistory();

  const handleClick = async () => {
    // if (checkInputs()) {
    //   console.log('ALL GOOD TO GO!!!');
    //   try {
    //     const listResponseDB = await PACKLIST_SERVICE.sendList(response.data);
    //     console.log({ listResponseDB });
    //     const externalAPIsResponse = await PACKLIST_SERVICE.externalAPIs(
    //       placeId.googleCityId
    //     );
    //     console.log({ externalAPIsResponse });
    //     externalAPIsResponse.data.startDate = initialDate;
    //     externalAPIsResponse.data.endDate = finalDate;
    //     externalAPIsResponse.data.fullList = listResponseDB.data._id;
    //     const travelResponseDB = await PACKLIST_SERVICE.sendTravel(
    //       externalAPIsResponse.data
    //     );
    //     console.log({ travelResponseDB });
    //     history.push(`/private/${travelResponseDB.data._id}`);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   setOpen(true);
    // }
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  //   const handleGetDate = (date) => {
  //     setInitialDate(date.start);
  //     setFinalDate(date.end);
  //   };

  //   const handlePlaceId = (placeId) => {
  //     setPlaceId({ googleCityId: placeId });
  //   };

  //   const toggleSelect = (id) => {
  //     const updatedList = response.data.map((list) => {
  //       if (list.id === id) {
  //         return { ...list, selected: !list.selected };
  //       }
  //       return list;
  //     });
  //     console.log({ id }, { updatedList });
  //     setResponse({ data: updatedList });
  //   };

  let result;
  let responseList;

  if (load) {
    result = responseTravel.data.fullList.lists
      .filter((list) => list.selected === true)
      .map((el) => {
        return (
          <TodoList
            key={el._id}
            _id={el._id}
            title={el.title}
            type={el.type}
            items={el.items}
            completed={el.completed}
          />
        );
      });
  }

  //   const checkInputs = () => {
  //     let selectedList = false;
  //     if (response.data.some((list) => list.selected === true)) {
  //       console.log('Object found inside the array.');
  //       selectedList = true;
  //     } else {
  //       console.log('Object not found.');
  //       selectedList = false;
  //     }
  //     return placeId.googleCityId !== '' && selectedList ? true : false;
  //   };

  return (
    <>
      <h1>{responseTravel.data.city}</h1>
      {result}
    </>
  );
}
