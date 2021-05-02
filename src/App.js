import React from "react"
import './styles.css'
import { Switch, Route } from "react-router-dom"

import Header from "./components/Header"
import Nominations from "./pages/Nominations"
// import Photos from "./pages/Movies"
import Movies from "./pages/Movies"

function App() {
    return (
        <div>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Movies />
                </Route>

                <Route path="/nominations">
                    <Nominations />
                </Route>
            </Switch>
        </div>
    )
}

export default App