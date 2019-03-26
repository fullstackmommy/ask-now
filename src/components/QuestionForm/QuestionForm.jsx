import React, {Component} from 'react'
import PropTypes from 'prop-types';
/*
import classNames from 'classnames';

import MenuItem from '@material-ui/core/MenuItem'; */
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import {saveQuestion} from '../../services/questionService'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

export class QuestionForm extends Component {
  state = {
    description: ""
  }

  handleSubmit = e => {
    e.preventDefault()
    let {description} = this.state
    saveQuestion(description)
    this
      .props
      .history
      .replace(this.props.returnPath)
  }

  handleChange = description => event => {
    this.setState({[description]: event.target.value});
  };

  render() {
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-questionDesc"
              label="Question"
              value={this.state.description}
              margin="normal"
              variant="outlined"
              onChange={this.handleChange('description')}/>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.handleSubmit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

QuestionForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionForm)
