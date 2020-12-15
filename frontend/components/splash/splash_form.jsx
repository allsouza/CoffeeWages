import React, { useRef, useState, useEffect } from 'react';
import Form from '../reviews/Form'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles'



export default function SplashForm() {

    return(
        <div className="splash-form">
            <img className="splash-form-blob" src={blob2} alt=""/>
            <div className="splash-form-contents" >
                <h1 className="splash-form-header">Report Your Wage:</h1>
            </div>
            <Form />
        </div>
    )
}