import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import LogIn from './components/logIn/LogIn';
import Travels from './views/Travels/Travels';
import CreatedTravelPage from './views/CreatedTravelPage/CreatedTravelPage';
import StartPage from './views/StartPage/StartPage';
import Navbar from './components/navBar/NavBar';
import Backdrop from '@material-ui/core/Backdrop';
import Footer from './components/footer/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from './components/authContext/AuthContext';
import { withRouter } from 'react-router';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';

const useStyles = makeStyles((theme) => ({
  // Center the loading spiner
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function App() {
  const classes = useStyles();
  const baseURL = process.env.REACT_APP_SERVER_URL;

  const service = axios.create({
    baseURL,
    withCredentials: true,
  });

  const [load, setLoad] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState({ logged: false });
  const [error, setError] = useState('');

  useEffect(() => {
    service
      .get('/api/isLoggedIn')
      .then((res) => {
        if (res.data.isLoggedIn === true) {
          setIsLoggedIn({ logged: res.data.isLoggedIn });
          setLoad(true);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
  }, []);

  if (load) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Navbar {...isLoggedIn} />
            <Switch>
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              {isLoggedIn.logged ? (
                <>
                  <Route exact path="/travels" component={Travels} />
                  <Route
                    exact
                    path="/travel/:id"
                    component={CreatedTravelPage}
                  />
                  <Route exact path="/" component={StartPage} />
                </>
              ) : (
                <Redirect to="/login" />
              )}
            </Switch>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <Backdrop className={classes.backdrop}>
        <CircularProgress size={60} />
      </Backdrop>
    );
  }
}

export default withRouter(App);
