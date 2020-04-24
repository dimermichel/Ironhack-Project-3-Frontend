import React, { Component } from 'react';
//import { withRouter } from 'react-router-dom';
import AUTH_SERVICE from '../../services/AuthServices';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    formSignup: {
      username: '',
      email: '',
      password: '',
    },
    currentUser: {},
    isLoggedIn: false,
    message: null,
  };

  componentDidMount() {
    AUTH_SERVICE.isLoggedIn()
      .then((responseFromServer) => {
        // console.log('res: ', responseFromServer);

        const { user } = responseFromServer.data;
        localStorage.setItem('userData', JSON.stringify({ user }));

        this.setState((prevState) => ({
          ...prevState,
          currentUser: user,
          isLoggedIn: true,
        }));
      })
      .catch((err) =>
        console.log('Error while getting the user: ', err.response.data)
      );
  }

  componentDidUpdate() {
    if (!this.state.currentUser && !this.state.isLoggedIn) {
      AUTH_SERVICE.isLoggedIn()
        .then((responseFromServer) => {
          // console.log('res: ', responseFromServer);

          const { user } = responseFromServer.data;
          localStorage.setItem('userData', JSON.stringify({ user }));

          this.setState((prevState) => ({
            ...prevState,
            currentUser: user,
            isLoggedIn: true,
          }));
        })
        .catch((err) =>
          console.log('Error while getting the user: ', err.response.data)
        );
    }
  }

  handleSignupInput = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState((prevState) => ({
      ...prevState,
      formSignup: {
        ...prevState.formSignup,
        [name]: value,
      },
    }));
    console.log(this.state.formSignup);
  };

  handleSignupSubmit = (e) => {
    e.preventDefault();

    AUTH_SERVICE.signup(this.state.formSignup)
      .then((response) => {
        console.log({ response });
        const {
          data: { user, message },
        } = response;

        this.setState((prevState) => ({
          ...prevState,
          formSignup: {
            username: '',
            email: '',
            password: '',
          },
          currentUser: user,
          isLoggedIn: true,
        }));

        alert(`${message}`);
        this.props.history.push('/');
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response && err.response.data) {
          this.setState((prevState) => ({
            ...prevState,
            message: err.response.data.message,
          }));
        }
      });
  };

  // handleSignupGithubSubmit = e => {

  //     e.preventDefault()
  //     AUTH_SERVICE.signupGithub()
  //         .then(response => {
  //             console.log({response})
  //         })
  //         .catch(err => console.log(err))
  // }

  handleLogout = (e) => {
    e.preventDefault();
    AUTH_SERVICE.logout()
      .then(() => {
        localStorage.removeItem('userData');
        this.setState((prevState) => ({
          ...prevState,
          currentUser: {},
          isLoggedIn: false,
        }));
        this.props.history.push('/');
      })
      .catch((err) => alert('Error while logout: ', err));
  };

  render() {
    const {
      state,
      handleSignupInput,
      handleSignupSubmit,
      handleLogout,
      handleToggle,
    } = this;
    return (
      <AuthContext.Provider
        value={{
          state,
          isLoggedIn: state.isLoggedIn,
          handleSignupInput,
          handleSignupSubmit,
          handleLogout,
          handleToggle,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

//export default withRouter(AuthProvider);

export { AuthProvider, AuthConsumer, AuthContext };
