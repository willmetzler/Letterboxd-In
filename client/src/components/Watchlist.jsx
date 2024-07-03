import React, { useState, useEffect, useContext } from "react";
import UnwatchedMovie from "./UnwatchedMovie";
import WatchlistForm from "./WatchlistForm";
import UserPanel from "./UserPanel";
import { UserContext } from "./UserContext";

function Watchlist() {
    const { user, setUser } = useContext(UserContext);
    const [unwatchedMovies, setUnwatchedMovies] = useState([]);

    useEffect(() => {
        if (user) {
            fetchWatchlist();
        }
    }, [user]);

    const fetchWatchlist = () => {
        fetch("/api/watchlist")
            .then(res => res.json())
            .then(movieData => setUnwatchedMovies(movieData));
    };

    const mappedUnwatched = unwatchedMovies.map(unwatchedMovie => {
        return (
            <UnwatchedMovie
                key={unwatchedMovie.id}
                unwatchedMovies={unwatchedMovies}
                unwatchedMovie={unwatchedMovie}
                setUnwatchedMovies={setUnwatchedMovies}
            />
        );
    });

    const handleLogin = (userData) => {
        setUser(userData);
        fetchWatchlist();
    };

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
                    <UserPanel onLogin={handleLogin} />
                </>
            )}
        </>
    );
}

export default Watchlist;