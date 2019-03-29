import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {saveEvent} from '../../services/eventService';

const backgroundShape = require('../../images/shape.svg');

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
    width: '60%'
  },
  bigContainer: {
    width: '80%'
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
  }
})

class EventForm extends Component {

  state = {
    data: {
      id: '',
      name: '',
      organizer: '',
      speaker: '',
      startDate: '',
      endDate: '',
      venue: ''
    }
  }

  componentDidMount() {}

  handleChange = ({currentTarget: input}) => {
    console.log(input.name)
    console.log(input.value)
  };

  handleSubmit = e => {
    e.preventDefault()
    let newEvent = {
      ...this.state.data
    }
    saveEvent(newEvent)

  }

  render() {

    const {classes} = this.props;
    const {
      id,
      name,
      organizer,
      speaker,
      startDate,
      endDate,
      venue
    } = this.state.data

    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
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
                      <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <TextField
                            name='id'
                            label='Event Code'
                            value={id}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='name'
                            label='Event Name'
                            value={name}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='organizer'
                            label='Organizer'
                            value={organizer}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='speaker'
                            label='Speaker'
                            value={speaker}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='startDate'
                            label='Start Date'
                            value={startDate}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='endDate'
                            label='End Date'
                            value={endDate}
                            onChange={this.handleChange}
                            margin='normal'/>
                          <TextField
                            name='venue'
                            label='Venue'
                            value={venue}
                            onChange={this.handleChange}
                            margin='normal'/>
                        </FormControl>
                      </div>
                      <div className={classes.buttonBar}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleSubmit}
                          size='large'
                          style={id.length
                          ? {
                            background: classes.button,
                            color: 'white'
                          }
                          : {}}
                          disabled={!id.length}>
                          Submit
                        </Button>
                      </div>
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

export default withRouter(withStyles(styles)(EventForm))