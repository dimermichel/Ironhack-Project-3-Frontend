import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AccountCircle from '@material-ui/icons/AccountCircle';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { AuthConsumer } from '../authContext/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AuthConsumer>
      {(context) => {
        const { isLoggedIn } = context;
        const { handleLogout } = context;

        return (
          <>
            <ElevationScroll>
              <>
                <AppBar position="sticky">
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <Link
                        to="/"
                        style={{ textDecoration: 'none', color: 'white' }}
                      >
                        <WidgetsIcon />
                      </Link>
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                      Travelpacking
                    </Typography>
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="/travels"
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          <Button color="inherit">Travels</Button>
                        </Link>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={handleMenu}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={open}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>Profile</MenuItem>
                          <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/signup"
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          <Button color="inherit">Sign Up</Button>
                        </Link>
                        <Link
                          to="/login"
                          style={{ textDecoration: 'none', color: 'white' }}
                        >
                          <Button color="inherit">Login</Button>
                        </Link>
                      </>
                    )}
                  </Toolbar>
                </AppBar>
                {console.log(context.state)}
                {() => console.log(new Date())}
              </>
            </ElevationScroll>
          </>
        );
      }}
    </AuthConsumer>
  );
}
