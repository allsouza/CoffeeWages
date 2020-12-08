import { Button, LinearProgress, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as PlacesApiUtil from '../../util/places_api_util'
import { connect } from 'react-redux'
import { createBusiness } from '../../util/business_api_util'

function Search({businesses, setBusiness}) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [results, setResults] = useState([])

    function select(business) {
        setBusiness(business)
        setResults([])
        setAddress('')
        setName('')
    }

    async function search() {
        setResults(businesses.filter(business => business.name.toUpperCase() === name.toUpperCase() && business.address.toUpperCase().includes(address.split(' ')[0].toUpperCase())))
        results.push(<li key={results.length+1}
                         onClick={() => setResults([])}>Not in list, look deeper</li>)
        setResults(results.map(res => {
            return(
                <li key={res.id}
                    onClick={() => select(res)}>
                    {res.name}
                    {res.address}
                </li>
            )
        }))

        if(results.length <= 1){
            setResults(<div>
                            Searching
                            <LinearProgress/>
                        </div>)
            const result = await PlacesApiUtil.search({name, address})
            setResults(result.results.map((res, idx) => {
                console.log(res)
                return(
                    <li key={idx}
                        onClick={() => createAndSet(res)}>
                        <h3>{res.name}</h3>
                        <p>{res.formatted_address}</p>
                    </li>
                )
            }))
        }
    }

    function createAndSet(data) {
        createBusiness({name: data.name, address: data.formatted_address, coordinates: `${data.geometry.location.lat},${data.geometry.location.lng}`})
            .then(payload => {
                select(payload)
            })
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

export default connect(mSTP)(Search)