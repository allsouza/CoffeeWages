import React from 'react';
import { Link } from 'react-router-dom';
import { GiCoffeeCup } from 'react-icons/gi'

export default function Nav() {
  return (
  
    <header className= 'browsenav' >
        <nav>
            <Link to="/">
                <p className="navlinks">Home</p>
            </Link>
            <GiCoffeeCup className="coffeecup"/>
            <Link to="/">
                <p className="navlinks">Search Shops</p>
            </Link>
            <GiCoffeeCup className="coffeecup"/>
             <Link to="/new_review">
                <p className="navlinks">Report Wages</p>
            </Link>
            <GiCoffeeCup className="coffeecup"/>
        </nav>
        <nav className="navcontact">
            <p>CREATED BY:</p>
            <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/" target="_blank">Andre Souza</a>
              <a href="https://www.linkedin.com/in/drew-webster-4261a934/" target="_blank" >Drew Webster</a>
              <a href="https://www.linkedin.com/in/bradlarsoncode/" target="_blank">Brad Larson</a>
        </nav>
    </header>
  );
}

