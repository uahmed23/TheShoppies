import React, { useContext, useState, useCallback, useEffect } from "react"
import Poster from "../components/Poster"
import { Context } from "../Context"
import _ from "lodash";

function Movies() {
    const { movies, fetchMovies, totalResults, nominations, searchString, setSearchString } = useContext(Context)
    const [page, setPage] = useState(1);
    const headerText = "5 movie nomination limit reached";
    // useEffect(() => {
    //     const header = document.getElementById("limitbanner");
    //     const line = document.getElementById("bannerline");

    //     const sticky = line.offsetTop;
    //     const scrollCallBack = window.addEventListener("scroll", () => {
    //         if (nominations.length > 4) {
    //             if (window.pageYOffset > sticky) {
    //                 header.classList.add("sticky");
    //                 header.classList.remove("invisible");

    //             } else {
    //                 header.classList.add("invisible");
    //             }
    //         }
    //         else {
    //             header.classList.add("invisible");
    //         }
    //     });
    //     return () => {
    //         window.removeEventListener("scroll", scrollCallBack);
    //     };
    // }, [nominations]);

    const delayedQuery = useCallback(_.debounce(q => fetchMovies(q, page), 500), []);

    const handleChange = e => {
        setPage(1);
        setSearchString(e.target.value)
        delayedQuery(e.target.value)
    }

    const moviePosters = movies.map((movie, i) => (
        <Poster key={i} movie={movie} />
    ))

    const nextPage = () => {
        if (page < Math.floor(totalResults / 10) + 1) {
            fetchMovies(searchString, page + 1)
            setPage(prevState => prevState + 1)
        }

    }
    const previousPage = () => {
        if (page > 1) {
            fetchMovies(searchString, page - 1)
            setPage(prevState => prevState - 1)
        }
    }
    console.log(movies);
    return (
        <>
            <div className="pageInfo">
                <p>page {page} out of {Math.floor(totalResults / 10) + 1}</p>
                <a href='#' onClick={previousPage} className="previous">&#8249;</a>
                <a href='#' onClick={nextPage} className="next">&#8250;</a>
            </div>
            <div className="search-container">
                <input
                    label="Movie Title..."
                    value={searchString}
                    placeholder="Search movie title..."
                    onChange={handleChange}
                />
                <div className="message" style={{ height: "40px", width: "95%", textAlign: "center" }} >
                    {movies && movies.length > 0 && nominations && nominations.length < 5 ? <h4>Click <i className="ri-star-line banner-star"></i> on a poster to nominate a movie</h4> : null}
                    {nominations && nominations.length > 4 ? <h4><i className="ri-alert-line banner-full"></i> nomination limit reached (5 nominees max.)</h4> : null}
                </div>
            </div>
            {/* <div id="bannerline"></div>
            <header id="limitbanner" className="banner invisible">
                {headerText}
            </header> */}
            <main className="movies">
                {!movies || movies.length < 1 ? <h3>   No matching movie title found</h3> : moviePosters}
            </main>
        </>
    )
}

export default Movies