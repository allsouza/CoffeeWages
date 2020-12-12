
import React from 'react';
import {Link} from 'react-router-dom'
import Nav from './../nav/nav'
import { Button } from '@material-ui/core'

export default function Splash() {
  return (
    
     <div>
         <div className="splashbg">
            <div className="splashbox">
              <div>
                <img className="mug" src={neverSettle} />
              </div>
              <section>
                <h1 className="title">Coffee Wages</h1>
                <p className="subtext">Empowering workers in the coffee industry to seek out jobs
                  that offer living wages and the best benefits.
                </p>
                <div className="explore-button"><Button variant="contained" size="medium" color="primary">Explore shops</Button></div>
              </section>
            </div>
            {/* <p color="white" className="createdbytop">Created By:</p> */}
            {/* <div className="createdby">
              
              <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/" target="_blank">Andre Souza</a>
              <a href="https://www.linkedin.com/in/drew-webster-4261a934/" target="_blank" >Drew Webster</a>
              <a href="https://www.linkedin.com/in/bradlarsoncode/" target="_blank">Brad Larson</a>
            </div> */}
        </div>
   
       
    
</div>

  
 
  );
}