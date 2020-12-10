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
    </header>
  );
}

