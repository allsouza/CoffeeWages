import Root from './components/Root';
import configureStore from './store/store';
import React from 'react';
import ReactDOM  from 'react-dom';
// import 'fontsource-roboto';

document.addEventListener("DOMContentLoaded", () => {
    const persistedTheme = localStorage.getItem("theme");
    let preloadedState = {theme: persistedTheme ? JSON.parse(persistedTheme) : {}};

    if(window.currentUser){
        preloadedState = {
            session: {id: window.currentUser.id},
            entities: {users:{[window.currentUser.id]:window.currentUser}},
            theme: persistedTheme ? JSON.parse(persistedTheme) : {}
        }
        delete window.currentUser;
    }

    const root = document.getElementById('root')
    const store = configureStore(preloadedState);

    store.subscribe(() => {
        const preferences = store.getState().theme;
        if (!preferences) return
    
        localStorage.setItem("theme", JSON.stringify(preferences));
    })
    
    ReactDOM.render(<Root store={store}/>, root);
})