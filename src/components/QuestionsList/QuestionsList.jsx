import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Question from '../Question/Question'
import socketIOClient from "socket.io-client";

import {getQuestions, saveQuestion, updateQuestionVote} from '../../services/questionService'
import quotes from "../../lib/quotes"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  headerBar: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textField: {
    width: '100%'
  },
  nudgeText: {
    paddingTop: 10,
    paddingLeft: 10
  }
});
class QuestionsList extends Component {
  _isMounted = false

  state = {
    questions: [],
    searchString: '',
    updated: false,
    description: '',
    response: '',
    quote: ''
  }

  getQuote = quotes => {
    let number = 0
    number = Math.floor(Math.random() * quotes.length)
    this.setState({quote: quotes[number]})
  }

  handleVoteClick = async(id) => {
    const copy = [...this.state.questions];
    copy
      .find(element => element.id === id)
      .vote += 1;
    const newVote = copy
      .find(element => element.id === id)
      .vote
    updateQuestionVote(id, this.props.match.params.id, newVote)
    this.setState({questions: copy})
  }

  onNewInputChange = (event) => {
    if (event.target.value) {
      this.setState({description: event.target.value})
    } else {
      this.setState({description: ''})
    }
  }

  handleNewClick = async(event) => {
    event.preventDefault()
    if (this.state.description) {
      const newDescription = this.state.description
      saveQuestion(newDescription, this.props.match.params.id)
      const allQuestions = await getQuestions(this.props.match.params.id)
      this.setState({description: '', questions: allQuestions});
    }
  }

  fetchQuestions = async() => {
    try {
      const allQuestions = await getQuestions(this.props.match.params.id)
      if (this._isMounted) 
        this.setState({questions: allQuestions});
      }
    catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    this._isMounted = true
    this.getQuote(quotes)
    this.fetchQuestions()

    const endpoint = () => {
      if (process.env.NODE_ENV === "production") {
        return "https://asknow-api.herokuapp.com"
      } else {
        return "http://localhost:8080"
      }
    }
    const socket = socketIOClient(endpoint(), {transports: ['websocket']});
    socket.on("FromAPI", data => {
      this.setState({response: data})
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    this._isMounted = true
    this.fetchQuestions()
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const {classes} = this.props

    return (
      <div>
        {this.state.questions === null && <p>Loading questions...</p>}
        {this.state.questions
          ? (
            <div className={classes.nudgeText}>
              {(this.state.response > 1) && <div>
                <div>{this.state.quote}</div>
                <div>Hurry, {this.state.response - 1}
                  &nbsp; other people getting ready to post a question!</div>
              </div>}
              <Grid container item xs={12}>
                <Grid
                  container
                  spacing={24}
                  style={{
                  padding: 24
                }}>
                  <Grid item xs={12}>
                    <Card>
                      <CardContent>
                        <Typography component="h2">
                          <TextField
                            className={classes.textField}
                            id="questionDesc"
                            label="Question"
                            value={this.state.description}
                            margin="normal"
                            variant="outlined"
                            onChange={this.onNewInputChange}/>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <div className={classes.alignRight}>
                          <Button onClick={this.handleNewClick} color="primary" variant="contained">
                            Submit
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                  {this
                    .state
                    .questions
                    .map(currentQuestion => (
                      <Grid key={currentQuestion.id} item xs={12} sm={6} lg={4} xl={3}>
                        <Question
                          key={currentQuestion.id}
                          id={currentQuestion.id}
                          description={currentQuestion.description}
                          vote={currentQuestion.vote}
                          updated={this.state.updated}
                          handleVoteClick={this.handleVoteClick}/></Grid>
                    ))}
                </Grid>
              </Grid>
            </div>
          )
          : "No questions found"}
      </div>
    )
  }
}

export default withStyles(styles)(QuestionsList);