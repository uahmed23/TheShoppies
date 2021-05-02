import React, { useState, useContext } from "react"
import { Context } from "../Context"
import NominatedMovies from "../components/NominatedMovies"

function Nominations() {
    const { nominations } = useContext(Context)

    const nominatedMovies = nominations.map(movie => (
        <NominatedMovies key={movie.imdbID} movie={movie} />
    ))

    return (
        <main className="nominee-page">
            <div className="nomination-page-title">
                <h1>Nomination List</h1>
            </div>
            {nominations ? nominatedMovies : null}
            {
                nominations.length > 0 ? null : <p>You have not nominated any movies yet.</p>
            }
        </main>
    )
}

export default Nominations