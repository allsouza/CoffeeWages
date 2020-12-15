
import React from 'react';
import {Link} from 'react-router-dom'
import Nav from './../nav/nav'
import { Button } from '@material-ui/core'
import SplashForm from './splash_form'

export default function Splash() {
  return (
    
     <div>
         <div className="splashbg">
            <div className="splashbox">
              <div className="mug-container">
                <img className="mug-background" src={blob} />
                <img className="mug" src={neverSettle} />
              </div>
              <section className="details-container">
                <h1 className="title">
                  <div className="title-first-letter">C</div><div className="title-words">offee</div> <br />
                  <div className="title-first-letter">W</div><div className="title-words-2">ages</div>
                </h1>
                <div className="subtext">Empowering workers in the coffee industry to seek out jobs
                  that offer living wages and the best benefits.
                  <div className="explore-button"><Button variant="contained" size="medium" color="primary">Explore shops</Button></div>
                </div>
              </section>
            </div>
            {/* <p color="white" className="createdbytop">Created By:</p> */}
            {/* <div className="createdby">
              
              <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/" target="_blank">Andre Souza</a>
              <a href="https://www.linkedin.com/in/drew-webster-4261a934/" target="_blank" >Drew Webster</a>
              <a href="https://www.linkedin.com/in/bradlarsoncode/" target="_blank">Brad Larson</a>
            </div> */}
            <SplashForm />
        </div>
   
       
    
</div>

  
 
  );
}