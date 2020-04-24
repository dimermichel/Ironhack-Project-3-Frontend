import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GetRangeDate from '../getRangeDate/GetRangeDate';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import TodoList from '../todoList/TodoList';
import { v4 as uuidv4 } from 'uuid';
import PACKLIST_SERVICE from '../../services/PackListServices';
import SelectList from '../selectList/SelectList';

const useStyles = makeStyles((theme) => ({
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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Album() {
  const [load, setLoad] = useState(false);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    PACKLIST_SERVICE.defaultList()
      .then((res) => {
        if (res.data) {
          //console.log(res.data);
          setResponse([...res.data]);
          console.log({ response });
          setLoad(true);
        }
      })
      .catch((err) => {
        setLoad(true);
      });
  }, []);

  const classes = useStyles();

  let result;

  if (load) {
    result = response.map((el) => {
      const id = uuidv4();
      const items = el.items.map((item) => {
        return { ...item, id: uuidv4() };
      });
      return (
        <TodoList
          key={id}
          title={el.title}
          type={el.type}
          items={items}
          completed={el.completed}
        />
      );
    });
  }

  return (
    <>
      <CssBaseline />
      {/* Hero unit */}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
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
          {/* <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Link to="/dashboard">
                  <Button variant="contained" color="primary">
                    Dashboard
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/private">
                  <Button variant="contained" color="primary">
                    Private
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div> */}
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
      <SearchBar />
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
      <GetRangeDate />
      </div>
      <SelectList />
      {result}
      {/* Footer */}
      <footer className={classes.footer}></footer>
      {/* End footer */}
    </>
  );
}
