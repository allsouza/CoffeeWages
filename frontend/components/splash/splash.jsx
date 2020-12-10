
import React from 'react';
import {Link} from 'react-router-dom'
import Nav from './../nav/nav'

export default function Splash() {
  return (
  
     <div >

{/* <img src="https://webfilms-films.s3.amazonaws.com/coffee/lottabeans.jpg"></img> */}
         <div className="splashbg">
         
          
            <div>
                <h1 className="title">Coffee Wages</h1>
                <p className="subtext">Empowering workers in the coffee industry to seek out jobs <br></br>
                  that offer living wages and the best benefits
                </p>
            </div>
            <div>
              <img className="mug" src="https://webfilms-films.s3.amazonaws.com/coffee/neversettle.jpg"/>
            </div>
            <p color="white" className="createdbytop">Created By:</p>
            <div className="createdby">
              
              <a href="https://www.linkedin.com/in/andre-souza-2ab6a3155/" target="_blank">Andre Souza</a>
              <a href="https://www.linkedin.com/in/drew-webster-4261a934/" target="_blank" >Drew Webster</a>
              <a href="https://www.linkedin.com/in/bradlarsoncode/" target="_blank">Brad Larson</a>
            </div>
        </div>
   
       
    
</div>

  
 
  );
}