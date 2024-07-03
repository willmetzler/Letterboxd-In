import React, { useState, useEffect } from "react";
import UnwatchedMovie from "./UnwatchedMovie";
import WatchlistForm from "./WatchlistForm";
import UserPanel from "./UserPanel";

function Watchlist() {
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/get-session')
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                    fetch("/api/watchlisted")
                        .then(res => res.json())
                        .then(movieData => setUnwatchedMovies(movieData.reverse())); // Reverse the order here
                }
            });
    }, []);

    const mappedUnwatched = unwatchedMovies.map(unwatchedMovie => {
        return (<UnwatchedMovie key={unwatchedMovie.id} unwatchedMovies={unwatchedMovies} unwatchedMovie={unwatchedMovie} setUnwatchedMovies={setUnwatchedMovies} />);
    });

    return (
        <>
            {user ? (
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
            ) : (
                <>
                    <h2 className="subheader">Log in or sign up to add a film</h2>
                    <UserPanel onLogin={setUser} />
                </>
            )}
        </>
    );
}

export default Watchlist;
