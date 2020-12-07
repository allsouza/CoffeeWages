import React from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route } from 'react-router-dom'
import App from './App'

export default function Root({store}) {
    return(
        <Provider store={store}>
            <HashRouter>
                <Route path='/' component={App}/>
            </HashRouter>
        </Provider>
    )
}