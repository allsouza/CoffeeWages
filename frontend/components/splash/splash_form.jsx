import React, { useRef, useState, useEffect } from 'react';
import Form from '../reviews/Form'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles'



export default function SplashForm() {

    const useStyles = makeStyles({
        large: {
            fontSize: 64,
            marginLeft: '50%',
            marginRight: '50%',
            paddingTop: 60,
            position: 'absolute',
            cursor: 'pointer',
        }
    })
    
    const [downScrolled, setDownScrolled] = useState(false)
    const formRef = useRef(null);

    const classes = useStyles()

    useEffect(() => {
        if (downScrolled) {
            formRef.current.scrollIntoView({behavior: 'smooth'})
        } else {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
            })
        }
    }, [downScrolled]);

    return(
        <div className="splash-form">
            {downScrolled ? 
                <ExpandLessIcon className={classes.large} onClick={() => setDownScrolled(!downScrolled)} />
                :
                <ExpandMoreIcon className={classes.large} onClick={() => setDownScrolled(!downScrolled)} />
            }
            <img className="splash-form-blob" src={blob2} alt=""/>
            <div className="splash-form-contents" ref={formRef} >
                <h1 className="splash-form-header">Report Your Wage:</h1>
            </div>
            <Form />
        </div>
    )
}