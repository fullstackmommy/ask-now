import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Question from '../Question/Question'
import {getQuestions, deleteQuestion} from '../../services/questionService'

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
  state = {
    questions: getQuestions(),
    searchString: '',
    filteredList: [],
    updated: false
  }

  onSearchInputChange = (event) => {
    if (event.target.value) {
      this.setState({searchString: event.target.value})
      const filtered = this
        .state
        .questions
        .filter(q => q.description.toLowerCase().includes(this.state.searchString))
      this.setState({filteredList: filtered})
    } else {
      this.setState({searchString: ''})
      const allQuestions = getQuestions()
      this.setState({filteredList: allQuestions})
    }

  }

  handleVoteClick = (id) => {

    if (!this.state.updated) {
      const copy = [...this.state.questions];
      copy
        .find(element => element._id === id)
        .vote += 1;
      this.setState({questions: copy, updated: true});
    } else {
      const copy = [...this.state.questions];
      copy
        .find(element => element._id === id)
        .vote -= 1;
      this.setState({questions: copy, updated: false});
    }
  }

  handleDelete = (id) => {
    deleteQuestion(id)
    this.setState({questions: getQuestions(), filteredList: getQuestions()});
  }

  componentDidMount() {
    const allQuestions = getQuestions()
    this.setState({filteredList: allQuestions});
  }

  render() {
    const {classes} = this.props
    return (
      <div>
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
                    <Link to="/questions/new">
                      <div className={classes.alignRight}>
                        <Button className={classes.actionButton} variant="contained" color="primary">Create New</Button>
                      </div>
                    </Link>
                  </div>
                </Grid>
              </Grid>

              <Grid
                container
                spacing={24}
                style={{
                padding: 24
              }}>
                {this
                  .state
                  .filteredList
                  .map(currentQuestion => (
                    <Grid key={currentQuestion._id} item xs={12} sm={6} lg={4} xl={3}>
                      <Question
                        key={currentQuestion._id}
                        id={currentQuestion._id}
                        question={currentQuestion}
                        updated={this.state.updated}
                        handleVoteClick={this.handleVoteClick}
                        handleDelete={this.handleDelete}/>
                    </Grid>
                  ))}
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