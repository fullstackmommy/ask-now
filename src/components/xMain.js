import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter, Link} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {FormControl, TextField, Button, Paper} from "@material-ui/core";

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [
      theme
        .breakpoints
        .down('sm')
    ]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  }
});

class Main extends Component {

  state = {
    eventId: '',
    learnMoredialog: false,
    getStartedDialog: false
  };

  componentDidMount() {
    const id = this.props.match
      ? this.props.match.params.id
      : null;
    this.setState({id})
  }

  openDialog = (event) => {
    this.setState({learnMoredialog: true});
  }

  dialogClose = (event) => {
    this.setState({learnMoredialog: false});
  }

  openGetStartedDialog = (event) => {
    this.setState({getStartedDialog: true});
  }

  closeGetStartedDialog = (event) => {
    this.setState({getStartedDialog: false});
  }

  handleChange = eventId => event => {
    this.setState({[eventId]: event.target.value});
  };

  render() {
    const {classes} = this.props

    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.root}>
          <Grid container justify="center">
            <Paper>
              <div
                style={{
                display: "flex",
                justifyContent: "center",
                margin: 20,
                padding: 20
              }}>
                <form style={{
                  width: "50%"
                }}>
                  <FormControl margin="normal" fullWidth>
                    <TextField
                      name='eventId'
                      label='Event Code'
                      value={this.state.eventId}
                      onChange={this.handleChange('eventId')}
                      margin='normal'/>
                  </FormControl>
                  <Link to={`/events/${this.state.eventId}`}>
                    <Button
                      className={classes.actionButton}
                      variant="contained"
                      color="primary"
                      size="medium">
                      Submit
                    </Button>
                  </Link>
                </form>
              </div>
            </Paper>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));
