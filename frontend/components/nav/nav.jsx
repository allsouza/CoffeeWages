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
    </header>
  );
}

