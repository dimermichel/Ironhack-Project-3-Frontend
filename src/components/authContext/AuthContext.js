import React, { Component } from 'react';
import AUTH_SERVICE from '../../services/AuthServices';

const AuthContext = React.createContext();

class AuthProvider extends Component {
  state = {
    formSignup: {
      username: '',
      usernameErr: '',
      email: '',
      emailErr: '',
      password: '',
      passwordErr: '',
    },
    formLogin: {
      email: '',
      emailErr: '',
      password: '',
      passwordErr: '',
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
  };

  validateEmail = (email) => {
    let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let result = regexEmail.test(String(email).toLowerCase());
    //console.log(result);
    return result;
  };

  validatePassword = (password) => {
    let regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    let result = regexPassword.test(String(password));
    return result;
  };

  validateInputsFormLogin = () => {
    let isErr = false;
    let errors = {};

    if (!this.validateEmail(this.state.formLogin.email)) {
      errors.emailErr = 'Please enter a valid email';
      isErr = true;
    } else {
      errors.emailErr = null;
    }

    if (this.state.formLogin.password.length === 0) {
      errors.passwordErr = 'Password is required.';
      isErr = true;
    } else {
      errors.passwordErr = null;
    }

    if (isErr) {
      this.setState((prevState) => ({
        ...prevState,
        formLogin: {
          ...prevState.formLogin,
          ...errors,
        },
      }));
    }
    return isErr;
  };

  validateInputsFormSubmit = () => {
    let isErr = false;
    let errors = {};
    if (this.state.formSignup.username.length < 4) {
      errors.usernameErr = 'Username must be at least 5 characteres';
      isErr = true;
    } else {
      errors.usernameErr = null;
    }
    if (!this.validateEmail(this.state.formSignup.email)) {
      errors.emailErr = 'Please enter a valid email';
      isErr = true;
    } else {
      errors.emailErr = null;
    }

    if (!this.validatePassword(this.state.formSignup.password)) {
      errors.passwordErr =
        'Password needs to have at least 6 characteres and must contain at least one number, one lowercase and one uppercase letter.';
      isErr = true;
    } else {
      errors.passwordErr = null;
    }

    if (isErr) {
      this.setState((prevState) => ({
        ...prevState,
        formSignup: {
          ...prevState.formSignup,
          ...errors,
        },
      }));
    }
    return isErr;
  };

  handleSignupSubmit = (e) => {
    const err = this.validateInputsFormSubmit();
    if (!err) {
      AUTH_SERVICE.signup(this.state.formSignup)
        .then((response) => {
          const {
            data: { user, message },
          } = response;

          this.setState(
            (prevState) => ({
              ...prevState,
              formSignup: {
                username: '',
                email: '',
                password: '',
              },
              currentUser: user,
              isLoggedIn: true,
              message: null,
            }),
            () => {
              window.location.replace(process.env.REACT_APP_FRONTEND_URL);
            }
          );
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.setState((prevState) => ({
              ...prevState,
              message: err.response.data.message,
            }));
          }
        });
    }
  };

  handleLoginSubmit = (e) => {
    // e.preventDefault();
    //console.log(this.props);
    const err = this.validateInputsFormLogin();
    if (!err) {
      AUTH_SERVICE.login(this.state.formLogin)
        .then((response) => {
          const {
            data: { user, message },
          } = response;

          this.setState(
            (prevState) => ({
              ...prevState,
              formLogin: {
                email: '',
                password: '',
              },
              currentUser: user,
              isLoggedIn: true,
            }),
            () => {
              window.location.replace(process.env.REACT_APP_FRONTEND_URL);
            }
          );
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            this.setState(
              (prevState) => ({
                ...prevState,
                formLogin: {
                  email: '',
                  password: '',
                },
                message: 'Incorrect username or password',
              }),
              () => {
                console.log('Error Case');
              }
            );
          }
        });
    }
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
