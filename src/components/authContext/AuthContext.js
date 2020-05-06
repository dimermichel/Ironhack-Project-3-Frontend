import React, { Component } from 'react';
import AUTH_SERVICE from '../../services/AuthServices';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    formSignup: {
      username: '',
      email: '',
      password: '',
    },
    formLogin: {
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
        const { user } = responseFromServer.data;

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
          const { user } = responseFromServer.data;

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

  handleLoginInput = (e) => {
    const {
      target: { name, value },
    } = e;
    this.setState((prevState) => ({
      ...prevState,
      formLogin: {
        ...prevState.formLogin,
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
        this.props.history.push('/');
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState((prevState) => ({
            ...prevState,
            message: err.response.data.message,
          }));
        }
      });
  };

  handleLoginSubmit = (e) => {
    // e.preventDefault();

    AUTH_SERVICE.login(this.state.formLogin)
      .then((response) => {
        console.log({ response });
        const {
          data: { user, message },
        } = response;

        this.setState((prevState) => ({
          ...prevState,
          formLogin: {
            email: '',
            password: '',
          },
          currentUser: user,
          isLoggedIn: true,
        }));
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState((prevState) => ({
            ...prevState,
            message: err.response.data.message,
          }));
        }
      });
  };

  handleLogout = (e) => {
    AUTH_SERVICE.logout()
      .then(() => {
        this.setState((prevState) => ({
          ...prevState,
          currentUser: {},
          isLoggedIn: false,
        }));
      })
      .catch((err) => {
        console.log('Error while logout: ', err);
      });
  };

  render() {
    const {
      state,
      handleSignupInput,
      handleSignupSubmit,
      handleLoginInput,
      handleLoginSubmit,
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
          handleLoginInput,
          handleLoginSubmit,
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
