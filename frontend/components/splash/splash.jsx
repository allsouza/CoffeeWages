import { Button } from '@material-ui/core';
import SplashForm from './splash_form';
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaPredicate } from 'react-media-hook';
import { ReactComponent as Blob } from '../../../app/assets/images/blob.svg'

export default function Splash() {
  const location = useLocation();
  const history = useHistory();
  const mobile = useMediaPredicate("(max-width: 768px)")
  const theme = useTheme();

  const useStyles = makeStyles({
    large: {
      fontSize: 64,
      marginLeft: '50%',
      marginRight: '50%',
      marginTop: 60,
      position: 'absolute',
      cursor: 'pointer',
      zIndex: 10,
    },
    background: {
      width:"100vw",
      maxWidth: "100%",
      backgroundColor: theme.palette.backgroundColor,
      
    }
  });

  const formRef = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    if (location.pathname === '/new_review') {
      if (Boolean(formRef.current)) formRef.current.scrollIntoView({ behavior: 'smooth', alignToTop: true });
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [location]);

  return (
    
     <div>
         <div className={classes.background}>
            <div className="splashbox">
              <div className="mug-container">
                <Blob fill={theme.palette.splashBlob} className="mug-background" />
                {/* <img className="mug-background" src={blob} /> */}
                {!mobile && <img className="mug" src={neverSettle} />}
              </div>
              <section className="details-container">
                <h1 className="title">
                  <div className="title-first-letter">C</div><div className="title-words">offee</div> <br />
                  <div className="title-first-letter">W</div><div className="title-words-2">ages</div>
                </h1>
                <div className="subtext">Empowering workers in the coffee industry to seek out jobs
                  that offer living wages and the best benefits.
                  <div className="explore-button">
                  <Button 
                    variant="contained" 
                    size="medium" 
                    onClick={() => history.push('/reviews')}
                    color="primary">Explore shops »</Button>
                  </div>
                </div>
              </section>
            </div>
            {location.pathname === '/new_review' ?
              !mobile && <ExpandLessIcon ref={formRef} className={classes.large} onClick={() => {
                history.push('/')
              }} />
              :
              !mobile && <ExpandMoreIcon ref={formRef} className={classes.large} onClick={() => history.push('/new_review')} />
            }
            <SplashForm />
        </div>
   
       
    
</div>

  
 
  );
}