import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"

//I dont believe deezer requires an API key
//const { API_KEY } = process.env

const API_URL =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=";

const Searchbar = () => {
    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const [selectedSong, setSelectedSong] = useState({
        title_short: "",
        preview: "",
        artist: "",
        deezer_id: ""
    });

    const fullQuery = `${API_URL}${query}`;

    const getInfo = () => {
        console.log(fullQuery);
        axiosWithAuth()
          .get(`${fullQuery}&limit=7`)
          .then((res) => {
            console.log("res", res);
            setResults(res.data.data);
          })
          .catch((err) => {
            console.log("unable to suggest artist and/or song", err);
          });
    }

    useEffect(() => {
        if (query.length >= 2) getInfo()

    }, [query])

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    const handleClickSong = event => {
        const songItem = event.target.getAttribute("data-index");
        setSelectedSong({
            title_short: results[songItem].title_short,
            preview: results[songItem].preview,
            artist: results[songItem].artist.name,
            deezer_id: results[songItem].id
        });
    };

    return (
      <>
        <input
          placeholder="Search Artist and/or Song Title"
          onChange={handleInputChange}
        />

        <ul>
          {results && results.length > 0
            ? results.map((res, index) => (
                <li onClick={handleClickSong} key={index} data-index={index}>
                  {res.artist.name} - {res.title}
                </li>
              ))
            : console.log("broken")}
        </ul>
      </>
    );
}

export default Searchbar