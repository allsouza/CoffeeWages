import { Button } from '@material-ui/core';
import SplashForm from './splash_form';
import React, { useRef, useState, useEffect } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';

export default function Splash() {

  const useStyles = makeStyles({
    large: {
      fontSize: 64,
      marginLeft: '50%',
      marginRight: '50%',
      marginTop: 60,
      position: 'absolute',
      cursor: 'pointer',
      zIndex: 10,
    }
  });

  const [downScrolled, setDownScrolled] = useState(false);
  const formRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    if (downScrolled) {
      formRef.current.scrollIntoView({ behavior: 'smooth', alignToTop: true });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [downScrolled]);

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
            {downScrolled ?
              <ExpandLessIcon ref={formRef} className={classes.large} onClick={() => setDownScrolled(!downScrolled)} />
              :
              <ExpandMoreIcon ref={formRef} className={classes.large} onClick={() => setDownScrolled(!downScrolled)} />
            }
            <SplashForm />
        </div>
   
       
    
</div>

  
 
  );
}