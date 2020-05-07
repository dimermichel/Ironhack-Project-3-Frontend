import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from '@material-ui/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthConsumer } from '../authContext/AuthContext';
import { createMuiTheme } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const themeBtn = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
    secondary: {
      main: '#311b92',
    },
  },
});

function SignUp(props) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <AuthConsumer>
          {(context) => {
            const {
              formSignup: {
                username,
                usernameErr,
                email,
                emailErr,
                password,
                passwordErr,
              },
            } = context.state;
            const { handleSignupInput, handleSignupSubmit } = context;

            return (
              <>
                <ThemeProvider theme={themeBtn}>
                  <a
                    href="/auth/github"
                    style={{ textDecoration: 'none', width: '100%' }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      <FontAwesomeIcon icon={faGithub} />  Log In with github
                    </Button>
                  </a>
                </ThemeProvider>
                <Typography variant="subtitle1" gutterBottom>
                  Or Be Classical
                </Typography>
                <div className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        error={usernameErr}
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        helperText={usernameErr}
                        fullWidth
                        value={username}
                        onChange={handleSignupInput}
                        id="username"
                        label="Username"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={emailErr}
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={handleSignupInput}
                        id="email"
                        label="Email Address"
                        helperText={emailErr}
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        error={passwordErr}
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={handleSignupInput}
                        name="password"
                        label="Password"
                        type="password"
                        helperText={passwordErr}
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={async () => {
                      await handleSignupSubmit();
                      props.history.push('/');
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Login
                    </Link>
                  </Grid>
                </Grid>
              </>
            );
          }}
        </AuthConsumer>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);
