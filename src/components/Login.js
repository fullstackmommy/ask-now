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

import Back from './common/Back';
import {isAuthenticated} from '../services/eventService';

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

class Login extends Component {

  state = {
    activeStep: 0,
    username: '',
    password: '',
    labelWidth: 0
  }

  componentDidMount() {}

  handleNext = async() => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
    if (this.state.activeStep === 1) {
      const user = await isAuthenticated(this.state.username, this.state.password)
      console.log(user)
      if (user) 
        console.log('valid')
      else 
        console.log('invalid')
      setTimeout(() => this.props.history.push('/dashboard'), 3000)
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({activeStep: 0});
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  stepActions() {
    if (this.state.activeStep === 0) {
      return 'Sign in';
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
          <Back/>
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
                              Welcome to AskNow
                            </Typography>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <TextField
                                name='username'
                                label='Username'
                                value={this.state.username}
                                onChange={this.handleChange}
                                margin='normal'/>
                              <TextField
                                name='password'
                                label='Password'
                                type='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                margin='normal'/>
                            </FormControl>
                          </div>
                        </div>
                        <div className={classes.buttonBar}>
                          {activeStep !== 2
                            ? (
                              <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.backButton}
                                size='large'>
                                Back
                              </Button>
                            )
                            : (
                              <Button
                                disabled={activeStep === 0}
                                onClick={this.handleBack}
                                className={classes.backButton}
                                size='large'>
                                Cancel
                              </Button>
                            )}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            size='large'
                            style={this.state.username.length
                            ? {
                              background: classes.button,
                              color: 'white'
                            }
                            : {}}
                            disabled={!this.state.username.length}>
                            {this.stepActions()}
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

export default withRouter(withStyles(styles)(Login))
