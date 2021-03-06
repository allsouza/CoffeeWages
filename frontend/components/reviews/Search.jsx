import { Button, LinearProgress, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import * as PlacesApiUtil from '../../util/places_api_util';
import { connect } from 'react-redux';
import { createBusiness } from '../../util/business_api_util';
import { fetchAllBusinesses } from '../../actions/business_action';
import styled from 'styled-components';
import { cardColor, backgroundSecondary } from '../DarkThemeProvider'

const SearchUL = styled.ul`
    background-color: ${cardColor};
    li:hover{
        cursor: pointer;
        background: ${backgroundSecondary};
    }
`;

function Search({error, businesses, setBusiness, getBusinesses}) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [results, setResults] = useState([]);
    const [change, setChange] = useState(false);

    if(Boolean(name)) error=false;
    
    useEffect(() => {
        getBusinesses();
        document.addEventListener('click', handleHide);
        return () => {
            document.removeEventListener('click', handleHide);
        };
    }, []);

    useEffect(() => {
        setChange(true);
    }, [name, address]);

    function select(business) {
        setBusiness(business);
        hideResult();
        setResults([]);
        setAddress('');
        setName('');
    }

    function handleHide(e) {
        const searchBar = document.querySelector('.search-bar');
        if(!searchBar.contains(e.target) && e.target.parentElement !== null && document.querySelector('.results-dropdown').classList.contains('active')){
            hideResult();
        }
    }

    function hideResult() {
        document.querySelector('.results-dropdown').classList.remove('active');
    }

    function search() {
        document.querySelector('.results-dropdown').classList.add('active');
        if(change){
            let list = [];
            setChange(false);
            const addressCheck = new RegExp(address, 'i')
            const nameCheck = new RegExp(name, 'i')
            list = (businesses.filter(business => nameCheck.test(business.name) && addressCheck.test(business.address) && business.address !== null));
            list = (list.map(res => {
                return(
                    <li key={res.id}
                        onClick={() => select(res)}>
                        <h3>{res.name}</h3>
                        <p>{res.address}</p>
                    </li>
                )
            }))
            list.push(<li key={'not in list'}
                          onClick={apiSearch}>Not in list, keep looking</li>)

            setResults(list)
    
            if(list.length <= 1){
                apiSearch()
            }
        }
    }

    async function apiSearch() {
        setResults(<div className="searching">
                    <img src={loading} alt=""/>
                    <p>Searching shops</p>
                </div>)
        const result = await PlacesApiUtil.search({name, address})
        
        setResults(result.map((res) => {
            return(
                <li key={res.place_id}
                    onClick={() => createAndSet(res)}>
                    <h3>{res.name}</h3>
                    <p>{res.formatted_address}</p>
                </li>
            )
        }))
    }

    function createAndSet(data) {
        let exist = false;
        businesses.forEach(business => {
            if(business.name.toUpperCase() === data.name.toUpperCase() && business.address === data.formatted_address){
                exist = business
            }
        })
        
        if(!exist){
            const location = data.formatted_address.split(', ').slice(1,3).join(',')
            createBusiness({name: data.name, address: data.formatted_address, coordinates: `${data.geometry.location.lat},${data.geometry.location.lng}`, location})
                .then(payload => {
                    select(payload)
                })
        }
        else{
            select(exist)
        }
    }

    return(
        <div className='search-bar'>
             <div className='fields'>
                <TextField error={error} value={name} onChange={e => setName(e.target.value)} label="Business name"/>
                <TextField error={error} value={address} onChange={e => setAddress(e.target.value)} label="Address"/>
             </div>
            <Button variant='contained' size="medium" color="primary" onClick={search}>Search</Button>
            <SearchUL className='results-dropdown'>
                {results}
            </SearchUL>
        </div>
    )
}

const mSTP = state => ({
    businesses: Object.values(state.entities.businesses)
})

const mDTP = dispatch => ({
    getBusinesses: () => dispatch(fetchAllBusinesses())
})

export default connect(mSTP, mDTP)(Search)