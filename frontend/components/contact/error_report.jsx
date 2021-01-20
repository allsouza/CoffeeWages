import { Button, Paper, Snackbar, TextField } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { sendError } from '../../util/error_api_util'
import MuiAlert from '@material-ui/lab/Alert'

export default function ErrorReport() {
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('')
    const [errors, setErrors] =  useState(new Set())
    const [status, setStatus] = useState({msg: '', disp: false})
    const [, updateState] = useState()
    const forceUpdate = useCallback(() => updateState({}), [])
    const history = useHistory();

    function checkErrors() {
        Boolean(subject) ? errors.delete('subject') : errors.add('subject')
        Boolean(body) ? errors.delete('body') : errors.add('body')
        setErrors(errors)   
        forceUpdate() 
    }

    function send() {
        checkErrors()
        if(errors.size === 0){
            sendError({body, subject}).then( res => {
                if(res%100 === 2){
                    setStatus({sent: true, msg: 'Message sent! Thanks for your feedback!', disp: true})
                }
                else{
                    setStatus({sent: false, msg: 'There was an error sending your message. Please try again later.', disp: true})
                }
            })
        }
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    useEffect(()=>{
        if(errors.size > 0){
            checkErrors()
        }
    }, [subject, body])

    return(
        <div className='error-reporter'>
            <h1>Feedback</h1>
            <p>Our main goal is to help you have a clearer image of what the service industry looks like around you.</p>
            <p>We are constantly looking to improve so please use this as a tool to let us know what can be improved in the website.</p>
            <p>Thank you so much for your help. And together we can bring transparency to the workplace!</p>
            <Paper>
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
                {status.disp ? <div className='status'>
                    <h3>{status.msg}</h3>
                    <Link to='/'>Return Home</Link>
                </div> : null}
                <Button variant='contained' color='primary' onClick={send} >Send</Button>
            </Paper>
            <Snackbar 
                open={status.disp} 
                autoHideDuration={6000} 
                onClose={() => {
                    setStatus({disp: false})
                    history.push('/')
                }}>
                {status.sent ? <Alert severity='success' onClose={() => setStatus({disp: false})}>{status.msg}</Alert> :
                <Alert severity='error' onClose={() => setStatus({disp: false})}>{status.msg}</Alert>}
            </Snackbar>
        </div>
    )
}