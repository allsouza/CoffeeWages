import { Button, LinearProgress, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as PlacesApiUtil from '../../util/places_api_util'
import { connect } from 'react-redux'
import { createBusiness } from '../../util/business_api_util'
import { fetchAllBusinesses } from '../../actions/business_action'

function Search({businesses, setBusiness, getBusinesses}) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [results, setResults] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        getBusinesses()
    }, [])

    useEffect(() => {
        setChange(true)
    }, [name, address])

    function select(business) {
        setBusiness(business)
        setResults([])
        setAddress('')
        setName('')
    }

    function search() {
        if(change){
            let list = [];
            setChange(false)
            list = (businesses.filter(business => business.name.toUpperCase() === name.toUpperCase()))
            list = (list.map(res => {
                return(
                    <li key={res.id}
                        onClick={() => select(res)}>
                        {res.name}
                        {res.address}
                    </li>
                )
            }))
            list.push(<li key={'not in list'}
                          onClick={apiSearch}>Not in list, look deeper</li>)

            setResults(list)
    
            if(list.length <= 1){
                apiSearch()
            }
        }
    }

    async function apiSearch() {
        setResults(<div>
                        Searching
                        <LinearProgress/>
                    </div>)
        const result = await PlacesApiUtil.search({name, address})
        setResults(result.map((res) => {
            console.log(res)
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
            createBusiness({name: data.name, address: data.formatted_address, coordinates: `${data.geometry.location.lat},${data.geometry.location.lng}`})
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
            <TextField value={name} onChange={e => setName(e.target.value)} label="Business name"/>
            <TextField value={address} onChange={e => setAddress(e.target.value)} label="Address"/>
            <Button variant='contained' onClick={search}>Search</Button>
            <ul className='results-dropdown'>
                {results}
            </ul>
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