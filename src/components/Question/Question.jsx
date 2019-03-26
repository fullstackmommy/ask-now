import React, {Component} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

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
    const {question, handleVoteClick} = this.props

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
            <Button>
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleVoteClick(question._id)}>
              {this.setVoteText()}
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }

}

export default Question