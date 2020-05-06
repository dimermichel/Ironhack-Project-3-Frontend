import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import teal from '@material-ui/core/colors/teal';
import './SelectList.css';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  palette: {
    primary: teal,
  },
}));

export default function SelectList(props) {
  const classes = useStyles();

  let id;
  if (props.data) {
    return (
      <>
        <main>
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Accomodation
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Accomodation')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title},accomodation`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {/* Transportation */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Transportation
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Transportation')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title},transportation`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {/* Essentials */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Essentials
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Essentials')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title},essentials`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {/* Business */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Business
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Business')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title},business`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {/* Activities */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Activities
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Activities')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title},activities`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
          {/* Other */}
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              component="h1"
              variant="h3"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Other
            </Typography>
            <Grid container spacing={4}>
              {props.data
                .filter((el) => el.type === 'Other')
                .map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card id={id} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={`https://source.unsplash.com/800x600/?${card.title}`}
                        title={card.title}
                      />
                      <CardContent
                        className={
                          card.selected
                            ? 'classes.cardContent SelectList'
                            : 'classes.cardContent'
                        }
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                      </CardContent>
                      <CardActions
                        className={card.selected ? 'SelectList' : ''}
                      >
                        <Button
                          onClick={() => props.toggle(card.id)}
                          variant="outlined"
                          color="primary"
                          startIcon={card.selected ? <DoneOutlineIcon /> : null}
                        >
                          {card.selected ? 'Selected' : 'Select'}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
      </>
    );
  }
}
