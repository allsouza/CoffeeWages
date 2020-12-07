import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function Search({businesses, setBusiness}) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    function select(id) {
        setBusiness(businesses[id])
    }

    useEffect(()=> {
        setResults(businesses.filter(business => business.name.toUpperCase().includes(query.toUpperCase())))
    }, [query])

    return(
        <div className='search-bar'>
            <TextField value={query} onChange={e => setQuery(e.target.value)}/>
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