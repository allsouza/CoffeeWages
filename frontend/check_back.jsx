import Root from './components/Root';
import configureStore from './store/store';
import React from 'react';
import ReactDOM  from 'react-dom';
// import 'fontsource-roboto';

document.addEventListener("DOMContentLoaded", () => {
    let preloadedState = {};

    const root = document.getElementById('root')
    const store = configureStore(preloadedState);
    
    window.getState = store.getState;
    
    ReactDOM.render(<Root store={store}/>, root);
})