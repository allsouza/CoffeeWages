import { InputLabel, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import Search from './Search'

function Form() {
    const [business, setBusiness] = useState({})
    const [position, setPosition] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState('')
    const [employment, setEmployment] = useState('')
    const [wage, setWage] = useState('')
    const [tips, setTips] = useState(false)
    const [gender, setGender] = useState('')
    const [orientation, setOrientation] = useState('')
    const [race, setRace] = useState('')
    
    function save() {
        
    }

    return(
        <div className='review-form'>
            <h1>Review form</h1>
            <Search setBusiness={setBusiness}/>

            <TextField id="standard-basic" label="Position" value={position} onChange={e => setPosition(e.target.value)}/>

            <label>Start year</label>
            <input type="text" value={start} onChange={e => setStart(e.target.value)}/>

            <label>End year(current year if still employed)</label>
            <input type="text" value={end} onChange={e => setEnd(e.target.value)}/>

            <label>Employment Type</label>
            <input type="text" value={start} onChange={e => setStart(e.target.value)}/>
        </div>
    )
}

export default connect(null)(Form)