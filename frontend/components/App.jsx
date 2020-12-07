import React from 'react'
import Splash from './splash/splash'
import { Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
      </Routes>
    </Router>
  );
}