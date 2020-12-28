import React from 'react'
import Splash from './splash/splash'
import { Route, Switch } from 'react-router-dom';
import Form from './reviews/Form';
import Nav from './nav/nav'
import ReviewIndex from './reviews/Index';
import ShopSearch from './reviews/ShopSearch';
import ErrorReport from './contact/error_report';
import NewReview from './reviews/NewReview';
import Footer from './footer/Footer';
import Auth from './auth/Auth';


export default function App() {
  return (
    <div className="app-container">
    <Nav/>
    <Switch>
        <Route path='/new_review' component={Splash} />
        <Route path='/create_review' component={NewReview} />
        <Route path='/reviews' component={ReviewIndex} />
        <Route path='/feedback' component={ErrorReport} />
        <Route path='/admin' component={Auth} />
        <Route exact path='/' component={Splash}/>
    </Switch>
    <Footer />
    </div>

  );
}