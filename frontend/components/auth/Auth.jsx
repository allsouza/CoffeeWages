import React, { useState } from 'react'
import NewUser from './NewUser'
import Login from './Login'

export default function Auth() {
    const [auth, setAuth] = useState('login')
    return(
        <div className='auth'>
            {auth === 'login' ? <Login setAuth={setAuth} /> : <NewUser setAuth={setAuth} />}
        </div>
    )
}