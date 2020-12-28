import { Button, Snackbar, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { clearErrors } from '../../actions/error_actions'
import { login } from '../../actions/user_actions'

function Login({setAuth, sessionErrors, login, clearErrors}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(new Set())

    function checkErrors() {
        Boolean(username) ? errors.delete('username') : errors.add('username')
        Boolean(password) ? errors.delete('password') : errors.add('password')
        
        setErrors(new Set(errors))
    }

    function tryLogin() {
        checkErrors()
        login({username, password})
    }

    useEffect(() => {
        if(errors.size > 0){
            checkErrors()
        }
    }, [username, password] )

    return(
        <div className='login'>
            <TextField  error={errors.has('username') || sessionErrors.length > 0}
                        label='Username' 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />

            <TextField  error={errors.has('password') || sessionErrors.length > 0}
                        label='Password' 
                        type='password'
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />

            <Button variant="contained" color="primary" onClick={tryLogin}>Login</Button>

            <Snackbar
                open={sessionErrors.length > 0}
                autoHideDuration={6000}
                onClose={clearErrors}>
                <Alert severity='error' elevation={6} variant='filled'>
                    <AlertTitle>Couldn't login</AlertTitle>
                    <ul>
                            {sessionErrors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                </Alert>
            </Snackbar>

            <div>
                <p>Don't have an account? 
                    <a className='navlinks' onClick={() => setAuth('create')}>Create an account</a>
                </p>
            </div>
        </div>
    )
}

const mSTP = state => ({
    sessionErrors: state.errors.session
})

const mDTP = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(Login)