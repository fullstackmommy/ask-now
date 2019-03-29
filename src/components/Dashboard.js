import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link, withRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import Icon from '@material-ui/core/Icon';
import EventTable from './EventTable/EventTable'
import Back from './common/Back';
import {getAllEvents, deleteEvent} from '../services/eventService'

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary['A100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    margin: `0 ${theme.spacing.unit * 2}px`
  },
  smallContainer: {
    width: '100%'
  },
  bigContainer: {
    width: '90%'
  },
  logo: {
    marginBottom: 24,
    display: 'flex',
    justifyContent: 'center'
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  formControl: {
    width: '100%'
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800]
    }
  }
})

class Dashboard extends Component {
  state = {
    events: []
  }

  fetchEvents = async() => {
    try {
      const allEvents = await getAllEvents()
      this.setState({events: allEvents})
    } catch (error) {
      console.log(error)
    }
  }

  handleDelete = async(eventId) => {
    await deleteEvent(eventId)
    this.fetchEvents()
  }

  async componentDidMount() {
    this.fetchEvents()
  }

  render() {
    const {classes} = this.props;
    const {events} = this.state
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <Back/>
          <Grid container justify="center">
            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.stepContainer}>
                  <div className={classes.smallContainer}>
                    <Paper className={classes.paper}>
                      <Grid>
                        <Link to="/events/new">
                          <Icon
                            className={classes.iconHover}
                            color="error"
                            style={{
                            fontSize: 30
                          }}>
                            add_circle
                          </Icon>
                        </Link>
                      </Grid>
                      <EventTable events={events} handleDelete={this.handleDelete}/>
                    </Paper>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Dashboard))
