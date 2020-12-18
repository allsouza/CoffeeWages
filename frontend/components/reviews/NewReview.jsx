import React from 'react'
import Form from './Form'

export default function NewReview(){
    return(
        <div className='new-review'>
            <h1>Report your wage</h1>
            <p>By reporting your wage you help to create a database where other service workers can compare their current working conditions, and hopefully level the field so that everyone works in a place that treats them like they deserve.</p>
            <Form />
        </div>
    )
}