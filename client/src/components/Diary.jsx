import React, { useState, useEffect } from "react";
import Movies from "./Movies";
import MovieForm from "./MovieForm";
import EditMovies from "./EditMovies";
import UserPanel from "./UserPanel";

function Diary() {
    const [movies, setMovies] = useState([]);
    const [editMovie, setEditMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/get-session')
            .then(res => res.json())
            .then(data => {
                if (data.id) {
                    setUser(data);
                    fetch("/api/movies")
                        .then((res) => res.json())
                        .then((movieData) => setMovies(movieData.reverse())); // Reverse the order here
                }
            });
    }, []);

    function handleEdit(movie) {
        setEditMovie(movie);
    }

    function handleEditFormSubmit(updatedMovie) {
        fetch(`/api/movies/${updatedMovie.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        })
            .then(res => res.json())
            .then(updatedMovieData => {
                setMovies(movies.map(movie =>
                    movie.id === updatedMovieData.id ? updatedMovieData : movie
                ));
                setEditMovie(null);
            })
            .catch(error => console.error('Error updating movie:', error));
    }

    return (
        <div id="movie-diary">
            {user ? (
                <>
                    <div className="edit-form">
                        {editMovie && <EditMovies movie={editMovie} onSubmit={handleEditFormSubmit} />}
                    </div>
                    <h2 className="subheader">My Movies</h2>
                    <div className="grid with-sidebar">
                        <div className="flex-container">
                            {movies.map((movie) => (
                                <Movies
                                    key={movie.id}
                                    movie={movie}
                                    movies={movies}
                                    setMovies={setMovies}
                                    handleEdit={() => handleEdit(movie)}
                                />
                            ))}
                        </div>
                        <div className="sidebar">
                            <MovieForm className="movie-form" setMovies={setMovies} />
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <h2 className="subheader">Log in or sign up to add a film</h2>
                    <UserPanel onLogin={setUser} />
                </>
            )}
        </div>
    );
}

export default Diary;
