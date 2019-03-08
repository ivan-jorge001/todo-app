import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages
import AuthPage from './AuthPage/AuthPage';
import Home from './Home/Home';

export const ROUTES = {
	'Auth': '/auth',
	'Home': '/',
}

function isAuth() {
  return true;
}

function canRoute( Component, condition, redirectPath = '/') {
  return  condition ? <Component /> : <Redirect to={redirectPath} />;
}

const routes = () => {
  return (
    <Switch>
      <Route exact path={ROUTES['Auth']} component={AuthPage}/>
      <Route exact path={ROUTES['Home']} render={() => canRoute(Home, isAuth(), ROUTES['Auth'])} />
      <Redirect from='*' to={ROUTES['Auth']}/>
    </Switch>
  );
}

export default routes;
