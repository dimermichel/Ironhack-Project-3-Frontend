import React from 'react';
import InfiniteCalendar, { Calendar, withRange } from 'react-infinite-calendar';
//import 'react-infinite-calendar/styles.css';
import './GetRangeDate.css';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

// Render the Calendar
const CalendarWithRange = withRange(Calendar);

export default function GetRangeDate(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [inputField, setInputField] = React.useState('');

  // Limitation Due to the Weather API
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 16);

  const handleClick = (event) => {
    //console.log({ event });
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-read-only-input"
            label="Date"
            value={inputField}
            InputProps={{
              readOnly: true,
            }}
            onClick={handleClick}
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={500}>
            <div className={classes.paper}>
              <InfiniteCalendar
                Component={CalendarWithRange}
                theme={{
                  accentColor: 'rgb(212, 233, 229)',
                  selectionColor: 'rgb(186, 218, 213)',
                  textColor: {
                    default: '#333',
                    active: 'rgba(57, 96, 108, 0.96)',
                  },
                  todayColor: 'rgb(212, 233, 229)',
                  weekdayColor: 'rgb(186, 218, 213)',
                  headerColor: 'rgb(57, 96, 108)',
                  floatingNav: {
                    background: 'rgba(57, 96, 108, 0.96)',
                    color: '#FFF',
                    chevron: '#FFA726',
                  },
                }}
                min={new Date()} // Minimum month to render
                minDate={new Date()} // Minimum selectable date
                maxDate={maxDate} // Max selectable date
                selected={{
                  start: props.initialDate,
                  end: props.finalDate,
                }}
                onSelect={(date) => {
                  // 3 => Double click event number
                  if (date.eventType === 3) {
                    props.getDate(date);
                    setInputField(
                      `${moment(date.start).format('MMMM Do YYYY')} - ${moment(
                        date.end
                      ).format('MMMM Do YYYY')} - ${
                        moment(date.start).diff(date.end, 'days') * -1
                      } days `
                    );
                    setAnchorEl(anchorEl && null);

                    //console.log(date);
                  }
                }}
                locale={{
                  headerFormat: 'MMM Do',
                }}
              />
            </div>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
