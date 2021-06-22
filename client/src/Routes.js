import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//pages
import LogIn from './pages/login';
import Register from './pages/register'
import Home from './pages/home';
import AddNew from './pages/addBudget';
import Movements from './pages/movements';

const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/signup' component={Register} />
                <Route exact path='/' component={Home} />
                <Route exact path='/budget/new' component={AddNew} />
                <Route exact path='/movements' component={Movements} />
            </Switch>
        </Router>
    )
}

export default Routes;