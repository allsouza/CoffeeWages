import React from 'react'
import Splash from './splash/splash'
import { Route, Switch } from 'react-router-dom';
import Nav from './nav/nav'
import ReviewIndex from './reviews/Index';
import ErrorReport from './contact/error_report';
import NewReview from './reviews/NewReview';
import Footer from './footer/Footer';
import Auth from './auth/Auth';
import { AuthRoute } from '../util/route_util';
import DarkThemeProvider from './DarkThemeProvider';
import styled from 'styled-components';
import { backgroundColor, textColor } from './DarkThemeProvider';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${backgroundColor};
    color: ${textColor};
    min-height: 100%;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    position: relative;

    &::-webkit-scrollbar {
          display: none;
    }
`;

const Component = styled.div`
	flex-grow: 1;
	display: flex;
`;

export default function App() {
  return (
    <DarkThemeProvider>
      <Container>
        <Nav/>
        <Component>
          <Switch>
              <Route path='/new_review' component={Splash} />
              <Route path='/create_review' component={NewReview} />
              <Route path='/reviews' component={ReviewIndex} />
              <Route path='/feedback' component={ErrorReport} />
              <AuthRoute path='/admin' component={Auth} />
              <Route exact path='/' component={Splash}/>
          </Switch>
        </Component>
        <Footer />
      </Container>
    </DarkThemeProvider>  
    

  );
}