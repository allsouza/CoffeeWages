import { Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import * as PlacesApiUtil from '../../util/places_api_util'
import { connect } from 'react-redux'

function Search({businesses, setBusiness}) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [results, setResults] = useState([])

    function select(id) {
        setBusiness(businesses[id])
    }

    async function search() {
        setResults(businesses.filter(business => business.name.toUpperCase() === name.toUpperCase() && business.address.split(' ')[0] === address.split(' ')[0]))
        if(results.length === 0){
            const result = await PlacesApiUtil.search({name, address})
            console.log(result)
        }
    }

    function dbSearch() {
        return(
            <div className='search-bar'>

                <ul>
                    {results.forEach(result => {
                        return(
                            <li key={result.id}
                                onClick={() => select(result.id)}>
                                <h3>{result.name}</h3>
                                <p>{result.address}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )    
    }

    // useEffect(()=> {
    //     setResults(businesses.filter(business => business.name.toUpperCase().includes(query.toUpperCase())))
    // }, [query])

    return(
        <div className='search-bar'>
            <TextField value={name} onChange={e => setName(e.target.value)} label="Business name"/>
            <TextField value={address} onChange={e => setAddress(e.target.value)} label="Address"/>
            <Button variant='contained' onClick={search}>Search</Button>
            <ul>
                    {results.forEach(result => {
                        return(
                            <li key={result.id}
                                onClick={() => select(result.id)}>
                                <h3>{result.name}</h3>
                                <p>{result.address}</p>
                            </li>
                        )
                    })}
                </ul>
        </div>
    )
}

const mSTP = state => ({
    businesses: Object.values(state.entities.businesses)
})

export default connect(mSTP)(Search)