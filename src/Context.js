import React, { useState, useEffect } from "react"
import axios from 'axios'
import ls from 'local-storage'



const Context = React.createContext()

function ContextProvider({ children }) {

    const [nominations, setNominations] = useState([])
    const [movies, setMovies] = useState([])
    const [totalResults, setTotalResults] = useState(0)
    const [searchString, setSearchString] = useState('')

    useEffect(() => {
        if (!ls.get('nominations'))
            ls.set('nominations', []);
        let savedNominations = ls.get('nominations');
        setNominations(savedNominations);
    }, [])

    async function fetchMovies(query, pageNum) {
        let data = await axios.get(`http://www.omdbapi.com/?apikey=5209986e&s=${query}&page=${pageNum}&type=movie`)
        let result = data.data.Search ? data.data.Search : []
        let totalMovies = data.data.totalResults ? data.data.totalResults : 0
        setTotalResults(totalMovies)
        setMovies(result)
    }

    function addToNominations(newItem) {
        let updatedNominations = [...nominations, newItem]
        ls.set('nominations', updatedNominations)
        setNominations(prevItems => [...prevItems, newItem])
    }

    function removeFromNominations(id) {
        let updatedNominations = nominations.filter(item => item.imdbID !== id)
        ls.set('nominations', updatedNominations)
        setNominations(prevItems => prevItems.filter(item => item.imdbID !== id))
    }

    return (
        <Context.Provider value={{
            nominations,
            addToNominations,
            removeFromNominations,
            movies,
            totalResults,
            fetchMovies,
            searchString,
            setSearchString
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }