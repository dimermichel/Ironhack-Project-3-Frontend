import React, { useState , useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import SignUp from './components/signUp/SignUp'
import axios from 'axios'
import LogIn from './components/logIn/LogIn'
import Album from './components/album/Album'
import Navbar from './components/navBar/NavBar'
import Footer from './components/footer/Footer'
import Dashboard from './views/Dashboard/Dashbord'
import Private from './components/private/Private'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { AuthProvider } from './components/authContext/AuthContext'
import GetRangeDate from './components/getRangeDate/GetRangeDate'
import './App.css';

function App() {

  const baseURL = process.env.REACT_APP_SERVER_URL;

  const service = axios.create({
    baseURL,
    withCredentials: true
  });

  const [load, setLoad] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    service.get("/api/isLoggedIn")
        .then(res => {
            if(res.data.isLoggedIn === true){
              setIsLoggedIn(res.data.isLoggedIn)
              setLoad(true)
            }
    }).catch(err => {
              setError(err.message);
              setLoad(true)
            })
}, []);


if (load) {
  return (
      <>
      <AuthProvider>
        <Navbar/>
        <GetRangeDate/>
            <Switch>
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/signup' component={SignUp} />
                { isLoggedIn ? 
                  (<>
                    <Route exact path='/private' component={Private} />
                    <ProtectedRoute path='/dashboard' component={Dashboard} />
                    <Route exact path='/' component={Album} />
                  </>
                  )
                  :
                  <Redirect to="/login" />
                }
            </Switch>
            <Footer />
      </AuthProvider>
    </>
  );
} else {
  return (
      <div>
          Loading...
      </div>
  );
}

}

export default App;
