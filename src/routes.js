import React from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
/* import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'

import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop' */
import Main from './components/Main'
import QuestionForm from './components/QuestionForm/QuestionForm'

import Topbar from './TopBar';
export default props => (
  <HashRouter>
    <Topbar/>
    <Switch>
      <Route
        exact
        path='/questions/new'
        render={props => <QuestionForm {...props} returnPath="/"/>}/>
      <Route exact path='/' component={Main}/>
    </Switch>
  </HashRouter>
)