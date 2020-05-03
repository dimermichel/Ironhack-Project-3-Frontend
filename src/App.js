import React, { useState, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import axios from 'axios';
import LogIn from './components/logIn/LogIn';
import Travels from './views/Travels/Travels';
import CreatedTravelPage from './views/CreatedTravelPage/CreatedTravelPage';
import StartPage from './views/StartPage/StartPage';
import Navbar from './components/navBar/NavBar';
import Footer from './components/footer/Footer';
import Private from './components/private/Private';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { AuthProvider } from './components/authContext/AuthContext';
import './App.css';

const data = [
  {
    title: 'Train',
    type: 'Transportation',
    items: [
      {
        name: 'Train Tickets',
        quantity: 1,
        checked: true,
      },
      {
        name: 'Download Netflix Movie',
        quantity: 1,
        checked: true,
      },
    ],
    completed: true,
  },
  {
    title: 'Work',
    type: 'Business',
    items: [
      {
        name: 'Laptop',
        quantity: 1,
        checked: true,
      },
      {
        name: 'Laptop Charger',
        quantity: 1,
        checked: true,
      },
      {
        name: 'Work Badge',
        quantity: 1,
        checked: true,
      },
    ],
    completed: true,
  },
];

function App() {
  const baseURL = process.env.REACT_APP_SERVER_URL;

  const service = axios.create({
    baseURL,
    withCredentials: true,
  });

  const [load, setLoad] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const sendList = () => {
    console.log(data);
    service
      .post('/api/list', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const updateList = (listId) => {
    console.log(data);
    service
      .post(`/api/list/${listId}/update`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const deleteList = (listId) => {
    console.log(data);
    service
      .post(`/api/list/${listId}/delete`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    //Need to change in production to script tag inside index.html
    //  const script = document.createElement('script');
    //  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places&language=en`;
    //  document.head.append(script);

    service
      .get('/api/isLoggedIn')
      .then((res) => {
        if (res.data.isLoggedIn === true) {
          setIsLoggedIn(res.data.isLoggedIn);
          setLoad(true);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
  }, []);

  if (load) {
    let listId = '5e92174405ee760dfea388eb';
    return (
      <>
        <CssBaseline />
        <AuthProvider>
          <Navbar />
          {/* <button onClick={() => sendList()}>Send List API Test</button>
          <button onClick={() => updateList(listId)}>
            Update List API Test
          </button>
          <button onClick={() => deleteList(listId)}>
            Delete List API Test
          </button> */}
          <Switch>
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            {isLoggedIn ? (
              <>
                <Route exact path="/travels" component={Travels} />
                <Route exact path="/private" component={Private} />
                <Route exact path="/travel/:id" component={CreatedTravelPage} />
                <Route exact path="/" component={StartPage} />
              </>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
          <Footer />
        </AuthProvider>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default App;
