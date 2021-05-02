import React, { useState, useContext } from "react"
import { Context } from "../Context"

function NominatedMovies({ movie }) {
    const [hovered, setHovered] = useState(false)
    const { removeFromNominations } = useContext(Context)

    const iconClassName = hovered ? "ri-delete-bin-fill remove" : "ri-delete-bin-line remove"

    return (
        <main className="nominees">

            <div
                className={`small image-container`}
            >
                <i
                    className={iconClassName}
                    onClick={() => removeFromNominations(movie.imdbID)}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                </i>
                <h5> {`${movie.Title} ( ${movie.Year} )`}</h5>
                <img alt={`${movie.Title} ( ${movie.Year} )`} src={movie.Poster} className="nominee-img-grid" />
            </div>
        </main>
    )
}

export default NominatedMovies