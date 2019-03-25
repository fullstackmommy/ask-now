import React from 'react'
import {Route, HashRouter, Switch} from 'react-router-dom'
/* import Dashboard from './components/Dashboard'
import Wizard from './components/Wizard'
import Cards from './components/Cards'

import Signup from './components/Signup'
import ScrollToTop from './components/ScrollTop' */
import Main from './components/Main'

export default props => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Main}/>
        </Switch>
    </HashRouter>
)