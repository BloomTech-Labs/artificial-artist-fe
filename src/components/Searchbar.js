import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"

//I dont believe deezer requires an API key
//const { API_KEY } = process.env

const API_URL = "https://api.deezer.com/search?q="

const Searchbar = () => {
    const [query, setQuery] = useState("")

    const [results, setResults] = useState([])

    const fullQuery = `${API_URL}${query}`

    const getInfo = () =>
        console.log(fullQuery);
    axiosWithAuth()
        .get(`${fullQuery}&limit=7`)
        .then(res => {
            console.log('res', res)
            setResults(res.data.data)
        })
        .catch(err => {
            console.log("unable to suggest artist and/or song", err)
        })

    useEffect(() => {
        if (query.length >= 2) getInfo()

    }, [query])

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    return (
        <>
            <input placeholder="Search Artist and/or Song Title" onChange={handleInputChange} />

            <ul>
                {results && (results > 0) ? (
                    results.map(res => (
                        <li key={res.name}>{res.name}</li>
                    ))
                ) : (
                        console.log("broken")
                    )}
                {/* {if (results) {
                    results.map(res => (
                        <li key={res.name}>{res.name}</li>
                    ))}
                } */}
            </ul>
        </>
    )
}

export default Searchbar