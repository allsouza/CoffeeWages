import { Button, TextField } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'

export default function ErrorReport() {
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] =  useState(new Set())
    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])

    function checkErrors() {
        Boolean(subject) ? errors.delete('subject') : errors.add('subject')
        Boolean(body) ? errors.delete('body') : errors.add('body')
        setErrors(errors)   
        forceUpdate() 
    }

    function send() {
        checkErrors()
        if(errors.size === 0){
            debugger
        }
    }

    useEffect(()=>{
        if(errors.size > 0){
            checkErrors()
        }
    }, [subject, body])

    return(
        <div className='error-reporter'>
            <TextField error={errors.has('subject')} label='Subject' value={subject} onChange={e => setSubject(e.target.value)} />
            <TextField 
                error={errors.has('body')}
                multiline
                rows={5}
                value={body}
                onChange={e => setBody(e.target.value)}
                label='Message'
                variant='outlined'
            />
            <Button variant='contained' color='primary' onClick={send} >Send</Button>
        </div>
    )
}