import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {withRouter} from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import {isValidEvent} from '../services/questionService'

const backgroundShape = require('../images/shape.svg');

const logo = require('../images/logo.svg');

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
  stepGrid: {
    width: '80%'
  },
  buttonBar: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: theme.palette.primary['A100']
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  stepper: {
    backgroundColor: 'transparent'
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 42
  },
  formControl: {
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
})

class Main extends Component {

  state = {
    activeStep: 0,
    eventId: '',
    labelWidth: 0
  }

  componentDidMount() {}

  handleNext = async() => {
    const isValid = await isValidEvent(this.state.eventId)
    if (!isValid) 
      this.props.history.push('/')
    if (isValid) 
      this.props.history.push(`/events/${this.state.eventId}`)
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  stepActions() {
    if (this.state.activeStep === 0) {
      return 'Submit';
    }
    return 'Next';
  }

  render() {

    const {classes} = this.props;
    const {activeStep} = this.state;

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
                <div className={classes.logo}>
                  <img width={100} height={100} src={logo} alt=""/>
                </div>
                <div className={classes.stepContainer}>
                  {activeStep === 0 && (
                    <div className={classes.smallContainer}>
                      <Paper className={classes.paper}>
                        <div>
                          <div>
                            <Typography
                              style={{
                              marginBottom: 20
                            }}
                              color='secondary'
                              gutterBottom>
                              Enter your event code
                            </Typography>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <TextField
                                name='eventId'
                                label='Event Code'
                                value={this.state.eventId}
                                onChange={this.handleChange}
                                margin='normal'/>
                            </FormControl>
                          </div>
                        </div>
                        <div className={classes.buttonBar}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            size='large'
                            style={this.state.eventId.length
                            ? {
                              background: classes.button,
                              color: 'white'
                            }
                            : {}}
                            disabled={!this.state.eventId.length}>
                            Submit
                          </Button>
                        </div>
                      </Paper>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main))
