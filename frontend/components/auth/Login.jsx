import React from 'react'
import { connect } from 'react-redux'

function Login({setAuth}) {
    return(
        <div className='login'>
            <div>
                <p>Don't have an account? 
                    <a className='navlinks' onClick={() => setAuth('create')}>Create an account</a>
                </p>
            </div>
        </div>
    )
}

export default connect(null)(Login)