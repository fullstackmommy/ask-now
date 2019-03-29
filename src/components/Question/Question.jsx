import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
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
    const {
      classes,
      description,
      vote,
      id,
      handleVoteClick,
      handleDelete
    } = this.props

    return (
      <div>
        <Card>
          <CardContent>
            <Typography component="h2">
              {description}
            </Typography>
            <Typography component="p">
              Number of votes: {vote}
            </Typography>
          </CardContent>
          <CardActions>
            <div className={classes.alignRight}>
              <Button onClick={() => handleDelete(id)}>
                Delete
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleVoteClick(id)}>
                {this.setVoteText()}
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    )
  }

}

export default withStyles(styles)(Question)