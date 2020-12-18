import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllReviews } from '../../actions/review_actions';

export default function ShopSearch({}) {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL',
                    'IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT',
                    'NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
                    'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
    const [errors, setErrors] = useState(new Set());
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const dispatch = useDispatch();

    function search() {
        const location = `${city},${state}`;
        if (name || location) {
            dispatch(fetchAllReviews({ filters: { name, location } }));
        }
    }

    function errorCheck() {
        Boolean(name) ? errors.delete('name') : errors.add('name');
        Boolean(city) ? errors.delete('city') : errors.add('city');
        Boolean(state) ? errors.delete('state') : errors.add('state');
        setErrors(errors);
        forceUpdate();
    }

    useEffect(() => {
        if(errors.size > 0) errorCheck();
    }, [name, city, state]);

    return(
        <form onSubmit={search} className='reviews-index-search-form'>
            <TextField value={name} onChange={e => setName(e.target.value)} label='Shop Name' />
            <TextField value={city} onChange={e => setCity(e.target.value)} label='City' />
            <FormControl>
                <InputLabel>State</InputLabel>
                <Select
                    value={state}
                    onChange={e=> setState(e.target.value)}>
                        {STATES.map((state, idx) => {
                            return <MenuItem key={idx} value={state}>{state}</MenuItem>
                        })}
                    </Select>
            </FormControl>
            <Button variant='contained' size="medium" color="primary" type='submit'>Search</Button>
        </form>
    )
}