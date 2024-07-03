import React, {useState, useEffect} from "react"
import UnwatchedMovie from "./UnwatchedMovie"
import WatchlistForm from "./WatchlistForm"

function Watchlist () {

    const [unwatchedMovies, setUnwatchedMovies] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/watchlisted")
        .then(res => res.json())
        .then(movieData => setUnwatchedMovies(movieData))
    }, [])

    const mappedUnwatched = unwatchedMovies.map( unwatchedMovie => {
        return (<UnwatchedMovie key={unwatchedMovie.id} unwatchedMovies={unwatchedMovies} unwatchedMovie={unwatchedMovie} setUnwatchedMovies={setUnwatchedMovies} />)
    })

    return (
        <>
        <h2 className="subheader">My Watchlist</h2>
            <div className="grid with-sidebar">
                    <div className="flex-container">
                        {mappedUnwatched}
                    </div>

                    <div className="sidebar">
                        <WatchlistForm unwatchedMovies={unwatchedMovies} setUnwatchedMovies={setUnwatchedMovies} />
                    </div>
            </div>
        </>
    )
}

export default Watchlist