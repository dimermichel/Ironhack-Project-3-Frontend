import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from "@material-ui/styles";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AuthContext } from '../context/index'
import {createMuiTheme} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { withRouter, useHistory } from 'react-router-dom';


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
      main: "#424242"
    },
    secondary: {
      main: '#311b92',
    }
  }
});



function SignUp(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleGithub = () => {
    history.push('/auth/github')
    //.then(res => console.log(res))
  }

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
        <AuthContext.Consumer>
          { context => {
            const {formSignup: {username, email, password}} = context.state
            const { handleSignupInput, handleSignupSubmit, handleSignupGithubSubmit } = context
            
            return (
              <>
                <ThemeProvider theme={themeBtn}>
                <a href="/auth/github" style={{textDecoration: 'none'}}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    //onClick={handleGithub}
                  >
                  
                  <FontAwesomeIcon icon={faGithub} />  Log In with github
                 
                </Button>
                </a>
                </ThemeProvider>
          <Typography variant="subtitle1" gutterBottom>
          Or Be Classical 
          </Typography>
                <form onSubmit={handleSignupSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
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
                variant="outlined"
                required
                fullWidth
                value={email}
                onChange={handleSignupInput}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={handleSignupInput}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
          </>
            )
          }
      }
      </AuthContext.Consumer>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);