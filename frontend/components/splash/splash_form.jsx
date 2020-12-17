import React from 'react';
import Form from '../reviews/Form';

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