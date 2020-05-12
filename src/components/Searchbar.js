import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"

//const { API_KEY } = process.env

//const API_URL = "https://api.deezer.com/search/?q="

const Searchbar = () => {
    const [query, setQuery] = useState("")

    const [results, setResults] = useState([])

    const getInfo = () =>
        axiosWithAuth()
            .get(`https://api.deezer.com/search/?q=${query}&limit=7`)
            .then(res => {
                console.log('res', res)
                setResults(res.data.data)
            })
            .catch(err => {
                console.log("unable to suggest artist and/or song", err)
            })

    useEffect(() => {
        if (query.length > 1 && query.length % 2 === 0) getInfo()

    })

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    return (
        <>
            <input placeholder="Search Artist and/or Song Title" onChange={handleInputChange} />

            <ul>
                {results.map(res => (
                    <li key={res.name}>{res.name}</li>
                ))}
            </ul>
        </>
    )
}

export default Searchbar