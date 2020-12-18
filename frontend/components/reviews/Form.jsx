import { 
    Button, 
    FormControl, 
    InputLabel, 
    MenuItem, 
    Select, 
    TextField,
    Paper,
    InputAdornment,
    Snackbar
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Search from './Search'
import { createReview, RECEIVE_REVIEW } from '../../actions/review_actions'

const styles = makeStyles({
    root: {
        width: 20
    },

    small: {
        width: 150
    },
    medium: {
        width: 200
    }

});

export default function Form() {
    const classes = styles()

    const [business, setBusiness] = useState({});
    const [position, setPosition] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState('');
    const [employment, setEmployment] = useState('');
    const [wage, setWage] = useState('');
    const [wageType, setWageType] = useState('');
    const [tips, setTips] = useState('');
    const [avgTips, setAvgTips] = useState('');
    const [gender, setGender] = useState('');
    const [orientation, setOrientation] = useState('');
    const [race, setRace] = useState('');
    const [satisfaction, setSatisfaction] = useState(2);
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(new Set());
    const dispatch = useDispatch();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    
    function save() {
        errorCheck();
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
                avg_tips: avgTips,
                start_date: start,
                end_date: end,
                satisfaction,
                notes
            };
            
            dispatch(createReview(review)).then(res => {
                if (res.type === RECEIVE_REVIEW) setSaved(true);
                setOpen(true);
            });
        }
    }

    function errorCheck() {
        Object.keys(business).length > 0 ? errors.delete('business') : errors.add('business');
        Boolean(position) ? errors.delete('position') : errors.add('position');
        Boolean(start) ? errors.delete('start') : errors.add('start');
        Boolean(end) ? errors.delete('end') : errors.add('end');
        Boolean(employment) ? errors.delete('employment') : errors.add('employment');
        Boolean(wage) ? errors.delete('wage') : errors.add('wage');
        Boolean(wageType) ? errors.delete('wageType') : errors.add('wageType');
        if (tips !== '') {
             errors.delete('tips')
             if(tips){
                 parseFloat(avgTips).toString() !== 'NaN' ? errors.delete('avgTips') : errors.add('avgTips')
             }
        } 
        else{
            errors.add('tips');
        } 
        Boolean(gender) ? errors.delete('gender') : errors.add('gender');
        Boolean(orientation) ? errors.delete('orientation') : errors.add('orientation');
        Boolean(race) ? errors.delete('race') : errors.add('race');
        setErrors(errors);
        forceUpdate();
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }

    function handleSatisfaction(event, rating) {
        const faces = Array.from(document.querySelector('.satisfaction').children)
        faces.forEach(icon => {
            icon === event.currentTarget ? icon.classList.add('selected') : icon.classList.remove('selected');
        });
        setSatisfaction(rating);
    }

    useEffect(() => {
        if(errors.size > 0) errorCheck();
    }, [business, position, start, end, employment, wage, wageType, tips, gender, orientation, race, avgTips]);

    return(
        <Paper className='review-form-container'>
      
            {!saved ? <div className='review-form'>
                
                <Search error={errors.has('business')} setBusiness={setBusiness}/>

                {(Object.keys(business).length > 0) ? <TextField disabled id='business' value={`${business.name} - ${business.address}`} variant='outlined' label='Business'/> : null}

                <section className="employment-fields">
                    <TextField 
                        className={clsx(classes.small)}
                        error={errors.has('position')} 
                        label="Position" 
                        value={position} 
                        onChange={e => setPosition(e.target.value)}
                    />

                    <TextField 
                        className={clsx(classes.small)}
                        error={errors.has('start')} 
                        label='Start year' 
                        value={start} 
                        onChange={e => setStart(e.target.value)} 
                    />

                    <TextField 
                        className={clsx(classes.small)}
                        error={errors.has('end')} 
                        label='End year (or current)' 
                        value={end} 
                        onChange={e => setEnd(e.target.value)} 
                    />
                    <FormControl  error={errors.has('employment')}>
                        <InputLabel>Employment Type</InputLabel>
                        <Select
                            className={clsx(classes.small)}
                            value={employment}
                            onChange={e=> setEmployment(e.target.value)}>
                                <MenuItem value={'Part-time'}>Part-time</MenuItem>
                                <MenuItem value={'Full-time'}>Full-time</MenuItem>
                                <MenuItem value={'Temp'}>Temp</MenuItem>
                            </Select>
                    </FormControl>
                </section>


                <div className='wage'>
                    <TextField error={errors.has('wage')} 
                                className={clsx(classes.medium)}
                                id='standard-basic' 
                                label='Wage' 
                                value={wage} 
                                onChange={e => setWage(e.target.value)} />
                    <FormControl error={errors.has('wageType')}>
                    <InputLabel id="simples-select-label">Frequency</InputLabel>
                    <Select
                        className={clsx(classes.medium)}
                        labelId='simple-select-label'
                        id='simple-select'
                        value={wageType}
                        onChange={e=> setWageType(e.target.value)}>
                            <MenuItem value={'Hourly'}>Hourly</MenuItem>
                            <MenuItem value={'Yearly'}>Yearly</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl error={errors.has('tips')}>
                        <InputLabel id="simples-select-label">Tips</InputLabel>
                        <Select
                            className={clsx(classes.medium)}
                            labelId='simple-select-label'
                            id='simple-select'
                            value={tips}
                            onChange={e=> setTips(e.target.value)}>
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                    </FormControl>
                    {Boolean(tips) ? <TextField 
                                error={errors.has('avgTips')} 
                                helperText={errors.has('avgTips') ? 'Please enter a valid dollar amount' : ''}
                                className={clsx(classes.medium)}
                                id='standard-basic' 
                                label='Average Daily Tips' 
                                value={avgTips} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onChange={e => setAvgTips(e.target.value)} /> 
                    : null}
                    
                </div>


                <div className="demographics">
                    <FormControl error={errors.has('gender')}>
                        <InputLabel id="simples-select-label">Gender</InputLabel>
                        <Select
                            className={clsx(classes.medium)}
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
                            className={clsx(classes.medium)}
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
                            className={clsx(classes.medium)}
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
                </div>

                <div className='satisfaction'>
                    <p>Job Satisfaction:</p>
                    <i className="far fa-tired" onClick={e => handleSatisfaction(e, 1)}><p>Bad</p></i>
                    <i className="far fa-meh selected" onClick={e => handleSatisfaction(e, 2)}><p>Neutral</p></i>
                    <i className="far fa-laugh-squint" onClick={e => handleSatisfaction(e, 3)}><p>Good</p></i>
                </div>

                <TextField 
                    multiline
                    rows={5}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    label='Notes'
                    variant='outlined'
                />

                <Button variant='contained' color='primary' onClick={save}>Submit</Button>
            </div>
        : <div className='saved'>
            <h1>Review saved!</h1>
            <p>Thank you for contributing to a more transparent work place.</p>
        </div> }
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
            {saved ? <Alert severity='success' onClose={() => setOpen(false)}>Review saved!</Alert> :
            <Alert severity='error' onClose={() => setOpen(false)}>There was an error saving the review. Please try again later.</Alert>}
        </Snackbar>
        </Paper>
    )
}