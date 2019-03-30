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
  }
});
class QuestionsList extends Component {
  _isMounted = false

  state = {
    questions: [],
    searchString: '',
    updated: false,
    description: '',
    endpoint: "http://localhost:8080",
    response: ''
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
    const newDescription = this.state.description
    saveQuestion(newDescription, this.props.match.params.id)
    const allQuestions = await getQuestions(this.props.match.params.id)
    this.setState({questions: allQuestions});
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
    this.fetchQuestions()
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint, {transports: ['websocket']});
    socket.on("FromAPI", data => {
      console.log(data)
      this.setState({response: data})
      //socket.emit('FromClient', 'test3')
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
            <div>
              {(this.state.response > 1) && <div>Hurry! {this.state.response - 1}
                &nbsp; other people getting ready to post a question!</div>}
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
                            fullwidth="true"
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