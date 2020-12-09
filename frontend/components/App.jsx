import React from 'react'
import Splash from './splash/splash'
import { Route, Switch } from 'react-router-dom';
import Form from './reviews/Form';
import Nav from './nav/nav'

export default function App() {
  return (
    <Switch>
        <Route path='/new_review' component={Form} />
        <Route path='/' component={Splash}/>
        <Route exact path="/" component={Nav} />
    </Switch>
  );
}