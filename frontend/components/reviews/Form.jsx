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
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Search from './Search';
import { createReview, RECEIVE_REVIEW } from '../../actions/review_actions';
import { capitalize } from '../../util/string_util';

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

const regex = new RegExp(/[^0-9]/, 'g');
const date = new Date();

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
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    
    function save() {
        errorCheck();
        if (Object.keys(errors).length === 0){
            const review = {
                business_id: business.id,
                position: capitalize(position),
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

    function checkPosition(newErrors) {
        if (position.length > 4) {
            delete newErrors['position'];
        } else { 
            newErrors['position'] = "Minimum 4 characters";
        }
    }

    function checkStartYear(newErrors) {
        if (start.match(regex) || !!start === false) {
            newErrors['start'] = 'Must be a number';
        } else if (parseInt(start) < 1950) {
            newErrors['start'] = 'Start date is too old';
        } else if (parseInt(start) > date.getFullYear()) {
            newErrors['start'] = "Start date can't be in the future";
        } else {
            delete newErrors['start'];
        }
    }

    function checkEndYear(newErrors) {
        if (capitalize(end) === 'Current') {
            setEnd(capitalize(end));
        }

        if (!!end === false || (end.match(regex) && end !== 'Current')) {
            newErrors['end'] = "Must be a number or 'Current'";
        } else if (parseInt(end) < 1950) {
            newErrors['end'] = 'End date is too old';
        } else if (parseInt(end) > date.getFullYear()) {
            newErrors['end'] = "End date can't be in the future";
        } else {
            delete newErrors['end'];
        }
    }

    function checkTips(newErrors) {
        if (tips !== '') {
            delete newErrors['tips'];
            if (tips) {
                parseFloat(avgTips).toString() !== 'NaN' ? delete newErrors['avgTips'] : newErrors['avgTips'] = 'Must be a number';
            }
        } else {
            newErrors['tips'] = true;
        } 
    }

    function checkWage(newErrors) {
        if (wage.match(regex) || !!wage === false) {
            newErrors['wage'] = 'Must be a number';
        } else if (wageType === 'Hourly' && parseFloat(wage) > 100) {
            newErrors['wage'] = 'Wage is too high';
        } else if (wageType === 'Yearly' && parseFloat(wage) < 10000) {
            newErrors['wage'] = 'Salary is too low';
        } else {
            delete newErrors['wage'];
        }
    }

    function errorCheck() {
        
        const newErrors = Object.assign(errors);

        Object.keys(business).length > 0 ? delete newErrors['business'] : newErrors['business'] = true;
        
        checkPosition(newErrors);
        checkStartYear(newErrors);
        checkEndYear(newErrors);
        checkTips(newErrors);
        checkWage(newErrors);

        Boolean(employment) ? delete newErrors['employment'] : newErrors['employment'] = true;
 
        Boolean(wageType) ? delete newErrors['wageType'] : newErrors['wageType'] = true;

        Boolean(gender) ? delete newErrors['gender'] : newErrors['gender'] = true;
        Boolean(orientation) ? delete newErrors['orientation'] : newErrors['orientation'] = true;;
        Boolean(race) ? delete newErrors['race'] : newErrors['race'] = true;;
        setErrors(newErrors);
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
        if (Object.keys(errors).length > 0) errorCheck();
    }, [business, position, start, end, employment, wage, 
        wageType, tips, gender, orientation, race, avgTips]);

    return(
        <Paper className='review-form-container'>
      
            {!saved ? <div className='review-form'>
                
                <Search error={errors['business']} setBusiness={setBusiness}/>

                {(Object.keys(business).length > 0) ? <TextField disabled id='business' value={`${business.name} - ${business.address}`} variant='outlined' label='Business'/> : null}

                <section className="employment-fields">
                    <TextField 
                        className={clsx(classes.small)}
                        error={!!errors['position']} 
                        label="Position" 
                        value={position} 
                        helperText={errors['position']}
                        onChange={e => setPosition(e.target.value)}
                    />

                    <TextField 
                        className={clsx(classes.small)}
                        error={!!errors['start']} 
                        label='Start year' 
                        value={start} 
                        helperText={errors['start']}
                        onChange={e => setStart(e.target.value)} 
                    />

                    <TextField 
                        className={clsx(classes.small)}
                        error={!!errors['end']} 
                        label='End year (or current)' 
                        value={end} 
                        onChange={e => setEnd(e.target.value)} 
                        helperText={errors['end']}
                    />
                    <FormControl error={errors['employment']}>
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
                    <TextField error={!!errors['wage']} 
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                helperText={errors['wage']}
                                className={clsx(classes.medium)}
                                id='standard-basic' 
                                label='Wage' 
                                value={wage} 
                                onChange={e => setWage(e.target.value)} />
                    <FormControl error={errors['wageType']}>
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
                    <FormControl error={errors['tips']}>
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
                    {Boolean(tips) ?  <TextField 
                                        error={!!errors['avgTips']}
                                        helperText={errors['avgTips']}
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
                    <FormControl error={errors['gender']}>
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

                    <FormControl error={errors['orientation']}>
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

                    <FormControl error={errors['race']}>
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