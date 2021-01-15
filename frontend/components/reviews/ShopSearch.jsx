import { Button, Paper, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllReviews } from '../../actions/review_actions';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaPredicate } from 'react-media-hook';

const useStyles = makeStyles({
    root: {
        height: "20vw",
        margin: "0 auto",
        padding: 32,
        position: 'relative',
        top: '10vh'
    },

    header: {
        fontSize: 24,
        padding: 24
    },

    input: {
        paddingRight: 24
    },

    formInputs: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0 auto',
        maxWidth: 500
    },

    searchButton: {
        marginTop: 24
    },

    stateDropdown: {
        width: 55
    },

    errors: {
        color: 'red',
        paddingTop: 12,
    }

});

const STATES = ['--','AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
                'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY', 'D.C.'];

export default function ShopSearch({setReady}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [errors, setErrors] = useState('');
    const [searching, setSearching] = useState(false)
    const mobile = useMediaPredicate('(max-width: 768px)')

    async function search(e) {
        setSearching(true)
        e.preventDefault();
        const location = `${city},${state}`;
<<<<<<< HEAD
        dispatch(fetchAllReviews({ filters: { name, location } }))
        .then(data => {
            data.reviews.length === 0 ? setErrors("No reviews found, try a new search.") : setErrors('');
        });
=======
        if (name || location.length > 1) {
            await dispatch(fetchAllReviews({ filters: { name, location } }))
            .then(data => {
                if (data.reviews.length === 0){
                    setSearching(false)
                    setErrors("No reviews found, try a new search.")
                }
                else{
                    setReady(true)
                }
            });
        }
        else{
            setSearching(false)
            setErrors("All fields can't be blank")
        }
    }

    async function findAll() {
        setSearching(true)
        dispatch(fetchAllReviews()).then(() => setReady(true))
>>>>>>> main
    }

    useEffect(() => {
        setErrors('');
    }, [name, city, state]);


    return(
        <Paper className={classes.root}>
            <h1 className={classes.header}>Begin by searching for a shop, city, or state:</h1>
            <form onSubmit={search} className='reviews-index-search-form'>
                <div className={classes.formInputs}>
                    <TextField className={classes.input} value={name} onChange={e => setName(e.target.value)} label='Shop Name' />
                    <TextField className={classes.input} value={city} onChange={e => setCity(e.target.value)} label='City' />
                    <FormControl>
                        <InputLabel>State</InputLabel>
                        <Select
                            className={classes.stateDropdown}
                            value={state}
                            onChange={e=> setState(e.target.value)}>
                                <MenuItem key='clear' value=''>Clear</MenuItem>
                                {STATES.map((state, idx) => {
                                    return <MenuItem key={idx} value={state}>{state}</MenuItem>
                                })}
                        </Select>
                    </FormControl>
                </div>
                <div className='buttons'>
                    <Button className={classes.searchButton} variant='contained' size="medium" color="primary" type='submit'>Search</Button>
                    {!mobile ? 'or' : null}
                    <Button className={classes.searchButton} variant='contained' size="medium" color="primary" onClick={findAll}>See All Reviews</Button>
                </div>
            </form>
            {errors ? <span className={classes.errors}>{errors}</span> : ''}
            {searching ?                 
                <div className="searching">
                    <img src={loading} alt=""/>
                    <p>Searching shops</p>
                </div> : null}
        </Paper>
    )
}
