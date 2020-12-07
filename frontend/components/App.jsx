import React from 'react'
import Splash from './splash/splash'
import { Route } from 'react-router-dom';

export default function App() {
    return(
        // <h1>Our app is running</h1>
        <Route exact path="/" component={Splash} />
    )
}