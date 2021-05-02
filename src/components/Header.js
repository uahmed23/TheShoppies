import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { Context } from "../Context"

function Header() {
    const { nominations } = useContext(Context)
    const nominatedClassName = nominations.length > 0 ? "ri-star-fill" : "ri-star-line"
    return (
        <>
            <header>
                <Link to="/"><h2>The Shoppies</h2></Link>
                <Link to="/nominations">
                    <div className="star-page">
                        <h3>My Nominations</h3><i className={`${nominatedClassName} header-star ri-fw ri-2x`}></i>
                    </div>
                </Link>
            </header>
        </>
    )
}

export default Header
