import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthConsumer } from '../authContext/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { CssBaseline, Typography, createMuiTheme } from '@material-ui/core';
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
    marginTop: theme.spacing(1),
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

function SignIn(props) {
  const classes = useStyles();

  //console.log({props});
  return (
    <AuthConsumer>
      {(context) => {
        const {
          formLogin: { email, password },
        } = context.state;
        const { handleLoginInput, handleLoginSubmit } = context;

        return (
          <>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log In
                </Typography>
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
                <form className={classes.form}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleLoginInput}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleLoginInput}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => {
                      handleLoginSubmit();
                      props.history.push('/');
                    }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </>
        );
      }}
    </AuthConsumer>
  );
}

export default withRouter(SignIn);
