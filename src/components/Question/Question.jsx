import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export class Question extends Component {
  state = {
    vote: false
  }

  setVoteText = () => {
    if (!this.state.vote) 
      return "Vote"
    return "Un-vote"
  }

  render() {
    const {classes, question, handleVoteClick, handleDelete} = this.props

    return (
      <div>
        <Card>
          <CardContent>
            <Typography component="h2">
              {question.description}
            </Typography>
            <Typography component="p">
              Number of votes: {question.vote}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.alignRight}>
              <Button onClick={() => handleDelete(question._id)}>
                Delete
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleVoteClick(question._id)}>
                {this.setVoteText()}
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }

}

Question.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Question)