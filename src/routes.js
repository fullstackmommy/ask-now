import React from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
/* import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'

import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop' */
import Main from './components/Main'
import QuestionForm from './components/QuestionForm/QuestionForm'
import Topbar from './TopBar';
import QuestionsList from './components/QuestionsList/QuestionsList';

export default props => (
  <BrowserRouter>
    <Topbar/>
    <Switch>
      <Route exact path='/events/:id/questions/new' component={QuestionForm}/>
      <Route
        exact
        path='/events/:id'
        render={props => <QuestionsList {...props} returnPath="/events"/>}/>
      <Route exact path='/' component={Main}/>
    </Switch>
  </BrowserRouter>
)