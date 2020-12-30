import { Button, Snackbar, TextField } from '@material-ui/core'
import { AlertTitle } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/user_actions';
import { clearErrors } from '../../actions/error_actions'

function NewUser({setAuth, sessionErrors, signup, clearErrors}) {
    const initialState = '';
    const [username, setUsername] = useState(initialState)
    const [password, setPassword] = useState(initialState)
    const [email, setEmail] = useState(initialState)
    const [firstName, setFirstName] = useState(initialState)
    const [lastName, setLastName] = useState(initialState)
    const [adminKey, setAdminKey] = useState(initialState)
    const [showAdmin, setShowAdmin] = useState(false)
    const [errors, setErrors] = useState(new Set())

    function createAccount() {
        checkErrors()
        signup({
            username,
            password,
            first_name: firstName,
            last_name: lastName,
            email,
            admin_secret: adminKey
        })
    }

    function checkErrors() {
        Boolean(username) ? errors.delete('username') : errors.add('username')
        password.length >= 6 ? errors.delete('password') : errors.add('password')
        Boolean(email) ? errors.delete('email') : errors.add('email')

        setErrors(new Set(errors))
    }

    useEffect(() => {
        if(errors.size > 0){
            checkErrors()
        } 
    }, [username, password, email])

    return(
        <div className='new-user'>
            <h1>Create an <span onClick={() => setShowAdmin(!showAdmin)}>Account</span></h1>

            <TextField  error={errors.has('username')}
                        label='Username' 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} />

            <TextField  error={errors.has('email')}
                        label='Email' 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} />

            <TextField  error={errors.has('password')}
                        helperText={errors.has('password') ? 'Password must be at least 6 characters' : ''}
                        label='Password' 
                        type='password'
                        value={password} 
                        onChange={e => setPassword(e.target.value)} />
                        
            <TextField  label='First Name' 
                        value={firstName} 
                        onChange={e => setFirstName(e.target.value)} />
                                                
            <TextField  label='Last Name' 
                        value={lastName} 
                        onChange={e => setLastName(e.target.value)} />
                                                
            {showAdmin ? <TextField  
                        label='Admin Secret' 
                        helperText='Enter key for admin privileges'
                        value={adminKey} 
                        onChange={e => setAdminKey(e.target.value)} /> : null}

            <Button variant="contained" color="primary" onClick={createAccount}>Create Account</Button>

            <div>
                <p>Already have an account? 
                    <a className='navlinks' onClick={() => setAuth('login')}>Login</a>
                </p>
            </div>

            <Snackbar
                open={sessionErrors.length > 0}
                autoHideDuration={6000}
                onClose={clearErrors}>
                    <Alert elevation={6} variant='filled' severity='error'>
                        <AlertTitle>Couldn't create account</AlertTitle>
                        <ul>
                            {sessionErrors.map(error => <li key={error}>{error}</li>)}
                        </ul>
                    </Alert>
                </Snackbar>
        </div>
    )
}

const mSTP = state => ({
    sessionErrors: state.errors.session
})

const mDTP = dispatch => ({
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(mSTP, mDTP)(NewUser)