import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Question from '../Question/Question'

import {getQuestions, deleteQuestion, saveQuestion} from '../../services/questionService'

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
    width: 200
  }
});
class QuestionsList extends Component {
  state = {
    questions: [],
    searchString: '',
    filteredList: [],
    updated: false,
    description: ''
  }

  onSearchInputChange = async(event) => {
    if (event.target.value) {
      this.setState({searchString: event.target.value})
      const filtered = this
        .state
        .questions
        .filter(q => q.description.toLowerCase().includes(this.state.searchString.toLowerCase()))
      console.log(this.state.filtered)
      this.setState({filteredList: filtered})
    } else {
      this.setState({searchString: ''})
      const allQuestions = await getQuestions(this.props.match.params.id)
      this.setState({filteredList: allQuestions})
    }

  }

  handleVoteClick = (id) => {

    if (!this.state.updated) {
      const copy = [...this.state.questions];
      copy
        .find(element => element.id === id)
        .vote += 1;
      this.setState({questions: copy, updated: true});
    } else {
      const copy = [...this.state.questions];
      copy
        .find(element => element.id === id)
        .vote -= 1;
      this.setState({questions: copy, updated: false});
    }
  }

  handleDelete = async(id) => {
    deleteQuestion(id, this.props.match.params.id)
    const allQuestions = await getQuestions(this.props.match.params.id)
    this.setState({questions: allQuestions, filteredList: allQuestions});
  }

  onNewInputChange = (event) => {
    if (event.target.value) {
      this.setState({description: event.target.value})
    }
  }

  handleNewClick = async(event) => {
    event.preventDefault()
    const newDescription = this.state.description
    saveQuestion(newDescription, this.props.match.params.id)
    const allQuestions = await getQuestions(this.props.match.params.id)
    this.setState({questions: allQuestions, filteredList: allQuestions});
  }

  fetchQuestions = async() => {
    try {
      const allQuestions = await getQuestions(this.props.match.params.id)
      if (allQuestions.length === this.state.filteredList) {
        this.setState({questions: allQuestions, filteredList: allQuestions});
      } else 
        this.setState({questions: allQuestions});
      }
    catch (error) {
      console.log(error)
    }
  }

  async componentDidMount() {
    try {
      const allQuestions = await getQuestions(this.props.match.params.id)
      this.setState({questions: allQuestions, filteredList: allQuestions});
    } catch (error) {
      console.log(error)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.fetchQuestions()
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        {this.state.questions === null && <p>Loading questions...</p>}
        {this.state.questions
          ? (
            <div>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <div className={classes.headerBar}>
                    <TextField
                      style={{
                      padding: 24
                    }}
                      id="searchInput"
                      placeholder="Search for Questions"
                      margin="normal"
                      onChange={this.onSearchInputChange}/>
                  </div>
                </Grid>

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
                            id="outlined-questionDesc"
                            label="Question"
                            value={this.state.description}
                            margin="normal"
                            variant="outlined"
                            onChange={this.onNewInputChange}/>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <div className={classes.alignRight}>
                          <Button onClick={this.handleNewClick}>
                            Submit
                          </Button>
                        </div>
                      </CardActions>
                    </Card>
                  </Grid>
                  {this
                    .state
                    .filteredList
                    .map(currentQuestion => (
                      <Grid key={currentQuestion.id} item xs={12} sm={6} lg={4} xl={3}>
                        <Question
                          key={currentQuestion.id}
                          id={currentQuestion.id}
                          description={currentQuestion.description}
                          vote={currentQuestion.vote}
                          updated={this.state.updated}
                          handleVoteClick={this.handleVoteClick}
                          handleDelete={this.handleDelete}/></Grid>
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

QuestionsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuestionsList);