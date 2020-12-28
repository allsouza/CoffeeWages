import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function NewUser({setAuth}) {
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
                        helperText='Enter admin secret in order have admin priviledges with the account'
                        value={adminKey} 
                        onChange={e => setAdminKey(e.target.value)} /> : null}

            <Button variant="contained" color="primary" onClick={createAccount}>Create Account</Button>

            <div>
                <p>Already have an account? 
                    <a className='navlinks' onClick={() => setAuth('login')}>Login</a>
                </p>
            </div>
        </div>
    )
}

const mSTP = state => ({
    errors: state.errors.users
})

export default connect(null)(NewUser)