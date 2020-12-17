import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
  
    <header className= 'browsenav' >
        <nav>
            <Link to="/">
                <p className="navlinks">Home</p>
            </Link>
        </nav>
        <nav className="explore-links">
            <Link to="/reviews" className="navlinks">Explore Shops</Link>
            <Link to="/new_review" className="navlinks">Report Wages</Link>
            <Link to='/bug_report' className='navlinks'>Report a Bug</Link>
        </nav>
        {/* <nav className="navcontact">
            <p>CREATED BY:</p>
            <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/" target="_blank">Andre Souza</a>
              <a href="https://www.linkedin.com/in/drew-webster-4261a934/" target="_blank" >Drew Webster</a>
              <a href="https://www.linkedin.com/in/bradlarsoncode/" target="_blank">Brad Larson</a>
        </nav> */}
    </header>
  );
}

