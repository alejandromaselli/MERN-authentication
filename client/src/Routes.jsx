import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import App from './App';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Activate from './components/auth/Activate';
import Private from './components/layout/Private';
import Admin from './components/layout/Admin';

import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} exact />
                <Route path="/signup" component={Signup} exact />
                <Route path="/signin" component={Signin} exact />
                <Route path="/auth/activate/:token" component={Activate} exact />
                <PrivateRoute path="/private" component={Private} exact />
                <AdminRoute path="/admin" component={Admin} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
