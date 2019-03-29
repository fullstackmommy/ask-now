import React from 'react'
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Topbar from './TopBar';
import Main from './components/Main'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import QuestionsList from './components/QuestionsList/QuestionsList'
import EventForm from './components/EventForm/EventForm'

export default props => (
  <BrowserRouter>
    <Topbar/>
    <Switch>
      <Route exact path='/events/new' component={EventForm}/>
      <Route
        exact
        path='/events/:id'
        render={props => <QuestionsList {...props} returnPath="/events"/>}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/dashboard' component={Dashboard}/>
      <Route exact path='/' component={Main}/>
    </Switch>
  </BrowserRouter>
)