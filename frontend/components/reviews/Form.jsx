import { InputLabel, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import Search from './search'

function Form() {
    const [businessId, setBusinessId]
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
            <form>
                <Search setBusiness={setBusinessId}/>

                <InputLabel>Position</InputLabel>
                <TextField id="standard-basic" label="Position" value={position} onChange={e => setPosition(e.target.value)}/>

                <label>Position</label>
                <input type="text" value={position} onChange={e => setPosition(e.target.value)}/>

                <label>Start year</label>
                <input type="text" value={start} onChange={e => setStart(e.target.value)}/>

                <label>End year(current year if still employed)</label>
                <input type="text" value={end} onChange={e => setEnd(e.target.value)}/>

                <label>Employment Type</label>
                <input type="text" value={start} onChange={e => setStart(e.target.value)}/>
            </form>
        </div>
    )
}

export default connect(null)(Form)