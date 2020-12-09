import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import {createReview} from '../../actions/review_actions'

function Form({createReview}) {
    const [business, setBusiness] = useState({})
    const [position, setPosition] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState('')
    const [employment, setEmployment] = useState('')
    const [wage, setWage] = useState('')
    const [wageType, setWageType] = useState('')
    const [tips, setTips] = useState('')
    const [gender, setGender] = useState('')
    const [orientation, setOrientation] = useState('')
    const [race, setRace] = useState('')
    const [errors, setErrors] = useState(new Set())
    const [notes, setNotes] = useState('')
 
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    
    function save() {
        errorCheck()
        if(errors.size === 0){
            const review = {
                business_id: business.id,
                position,
                employment_type: employment,
                wage,
                pay_frequency: wageType,
                gender,
                orientation,
                race,
                tips,
                start_date: start,
                end_date: end,
                notes
            }
            createReview(review)
        }
    }

    function errorCheck() {
        Object.keys(business).length > 0 ? errors.delete('business') : errors.add('business')
        Boolean(position) ? errors.delete('position') : errors.add('position')
        Boolean(start) ? errors.delete('start') : errors.add('start')
        Boolean(end) ? errors.delete('end') : errors.add('end')
        Boolean(employment) ? errors.delete('employment') : errors.add('employment')
        Boolean(wage) ? errors.delete('wage') : errors.add('wage')
        Boolean(wageType) ? errors.delete('wageType') : errors.add('wageType')
        tips !== '' ? errors.delete('tips') : errors.add('tips')
        Boolean(gender) ? errors.delete('gender') : errors.add('gender')
        Boolean(orientation) ? errors.delete('orientation') : errors.add('orientation')
        Boolean(race) ? errors.delete('race') : errors.add('race')
        setErrors(errors)
        forceUpdate()
    }

    useEffect(() => {
        if(errors.size > 0) errorCheck()
    }, [business, position, start, end, employment, wage, wageType, tips, gender, orientation, race])

    return(
        <div className='review-form'>
            <h1>Review form</h1>
            <Search error={errors.has('business')} setBusiness={setBusiness}/>

            {(Object.keys(business).length > 0) ? <TextField disabled id='business' value={`${business.name} - ${business.address}`} variant='outlined' label='Business'/> : null}

            <TextField error={errors.has('position')} label="Position" value={position} onChange={e => setPosition(e.target.value)}/>

            <TextField error={errors.has('start')} label='Start year' value={start} onChange={e => setStart(e.target.value)} />

            <TextField error={errors.has('end')} label='End year(current year if still employed)' value={end} onChange={e => setEnd(e.target.value)} />

            <FormControl  error={errors.has('employment')}>
                <InputLabel>Employment Type</InputLabel>
                <Select
                    value={employment}
                    onChange={e=> setEmployment(e.target.value)}>
                        <MenuItem value={'Part-time'}>Part-time</MenuItem>
                        <MenuItem value={'Full-time'}>Full-time</MenuItem>
                        <MenuItem value={'Temp'}>Temp</MenuItem>
                    </Select>
            </FormControl>

            <div className='wage'>
                <TextField error={errors.has('wage')} 
                            id='standard-basic' 
                            label='Wage' 
                            value={wage} 
                            onChange={e => setWage(e.target.value)} />
                <FormControl error={errors.has('wageType')}>
                <InputLabel id="simples-select-label">Wage Type</InputLabel>
                <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={wageType}
                    onChange={e=> setWageType(e.target.value)}>
                        <MenuItem value={'Hourly'}>Hourly</MenuItem>
                        <MenuItem value={'Yearly'}>Yearly</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <FormControl error={errors.has('tips')}>
                <InputLabel id="simples-select-label">Tips</InputLabel>
                <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={tips}
                    onChange={e=> setTips(e.target.value)}>
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
            </FormControl>

            <FormControl error={errors.has('gender')}>
                <InputLabel id="simples-select-label">Gender</InputLabel>
                <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={gender}
                    onChange={e=> setGender(e.target.value)}>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Non-binary'}>Non-binary</MenuItem>
                        <MenuItem value={'Transgender'}>Transgender</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                        <MenuItem value={'Prefer to self-describe'}>Prefer to self-describe</MenuItem>
                        <MenuItem value={"I don't wish to answer"}>I don't wish to answer</MenuItem>
                    </Select>
            </FormControl>

            <FormControl error={errors.has('orientation')}>
                <InputLabel id="simples-select-label">Orientation</InputLabel>
                <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={orientation}
                    onChange={e=> setOrientation(e.target.value)}>
                        <MenuItem value={'Gay'}>Gay</MenuItem>
                        <MenuItem value={'Lesbian'}>Lesbian</MenuItem>
                        <MenuItem value={'Heterosexual'}>Heterosexual</MenuItem>
                        <MenuItem value={'Bisexual'}>Bisexual</MenuItem>
                        <MenuItem value={'Queer'}>Queer</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                        <MenuItem value={'Prefer to self-describe'}>Prefer to self-describe</MenuItem>
                        <MenuItem value={"I don't wish to answer"}>I don't wish to answer</MenuItem>
                    </Select>
            </FormControl>

            <FormControl error={errors.has('race')}>
                <InputLabel id="simples-select-label">Race</InputLabel>
                <Select
                    labelId='simple-select-label'
                    id='simple-select'
                    value={race}
                    onChange={e=> setRace(e.target.value)}>
                        <MenuItem value={'Hispanic or Latinx'}>Hispanic or Latinx</MenuItem>
                        <MenuItem value={'Native American'}>Native American</MenuItem>
                        <MenuItem value={'Asian'}>Asian</MenuItem>
                        <MenuItem value={'Native Hawaiian or Pacific Islander'}>Native Hawaiian or Pacific Islander</MenuItem>
                        <MenuItem value={'Black or African-American'}>Black or African-American</MenuItem>
                        <MenuItem value={'White'}>White</MenuItem>
                        <MenuItem value={"I don't wish to answer"}>I don't wish to answer</MenuItem>
                    </Select>
            </FormControl>

            <TextField 
                multiline
                rows={5}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                label='Notes'
                variant='outlined'
            />

            <Button variant='contained' onClick={save}>Submit</Button>
        </div>
    )
}

const mDTP = dispatch => ({
    createReview: review => dispatch(createReview(review))
})

export default connect(null, mDTP)(Form)