import React from 'react';
import InfiniteCalendar, { Calendar, withRange } from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
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
  //const [initialDate, setInitialDate] = React.useState(new Date());
  //const [finalDate, setFinalDate] = React.useState(new Date());

  // Limitation Due to the Weather API
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 16);

  const handleClick = (event) => {
    console.log({ event });
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
                min={new Date()} // Minimum month to render
                minDate={new Date()} // Minimum selectable date
                maxDate={maxDate} // Max selectable date
                selected={{
                  start: props.initialDate,
                  end: props.finalDate,
                }}
                onSelect={(date) => {
                  if (date.eventType === 3) {
                    // setInitialDate(date.start);
                    // setFinalDate(date.end);
                    props.getDate(date);
                    setInputField(
                      `${moment(date.start).format('MMMM Do YYYY')} - ${moment(
                        date.end
                      ).format('MMMM Do YYYY')} - ${
                        moment(date.start).diff(date.end, 'days') * -1
                      } days `
                    );
                    setAnchorEl(anchorEl && null);

                    console.log(date);
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
