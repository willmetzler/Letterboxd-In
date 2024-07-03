import React, { useState, useEffect } from "react";
import Movies from "./Movies";
import MovieForm from "./MovieForm";
import EditMovies from "./EditMovies";

function Diary() {
    const [movies, setMovies] = useState([]);
    const [editMovie, setEditMovie] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then((res) => res.json())
            .then((movieData) => setMovies(movieData));
    }, []);

    function handleEdit(movie) {
        setEditMovie(movie);
    }

    function handleEditFormSubmit(updatedMovie) {
        fetch(`http://localhost:3000/movies/${updatedMovie.id}`, {
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
        </div>
    );
}

export default Diary;
