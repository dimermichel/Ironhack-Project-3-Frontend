import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/signUp/SignUp'
import LogIn from './components/logIn/LogIn'
import Album from './components/album/Album'
import Navbar from './components/navBar/NavBar'
import Footer from './components/footer/Footer'
import Dashboard from './views/Dashboard/Dashbord'
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/login' component={LogIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/' component={Album} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
