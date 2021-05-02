import React, { useState, useContext } from "react"

import { Context } from "../Context"

function Poster({ movie }) {
    const [hovered, setHovered] = useState(false)
    const { addToNominations, nominations, removeFromNominations } = useContext(Context)


    function starIcon() {
        const alreadyNominated = nominations.some(item => item.imdbID === movie.imdbID)

        if (alreadyNominated) {
            return <i className="ri-star-fill star" onClick={() => removeFromNominations(movie.imdbID)}></i>
        } else if (hovered && nominations.length < 5) {
            return <i className="ri-star-line star" onClick={() => addToNominations(movie)}></i>
        }
        else if (hovered && nominations.length > 4) {
            return <i className="ri-alert-fill full"></i>
        }
    }

    return (
        <div
            className={`big image-container`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h5>{`${movie.Title} ( ${movie.Year} )`}</h5>
            <img alt={`${movie.Title} ( ${movie.Year} )`} src={movie.Poster} className="image-grid" />

            {starIcon()}
        </div>
    )
}

export default Poster
