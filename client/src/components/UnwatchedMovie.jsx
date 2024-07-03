import { useState } from 'react'

function UnwatchedMovie({ unwatchedMovie, unwatchedMovies, setUnwatchedMovies }) {

    const [displayMode, setDisplayMode] = useState(1);

    const toggleDisplayMode = () => {
        setDisplayMode((mode) => (mode % 2) + 1);
    };

    function handleLogFilm(event) {
        const rating = prompt("Enter rating:");
        const review = prompt("Enter review:");

        event.stopPropagation()
        const filteredMovies = unwatchedMovies.filter(m => m.id !== unwatchedMovie.id)
        setUnwatchedMovies(filteredMovies)

        fetch(`http://localhost:3000/watchlisted/${unwatchedMovie.id}`, {
            method: 'DELETE'
        })
            .then(response => {
                const loggedMovie = {
                    title: unwatchedMovie.title,
                    director: unwatchedMovie.director,
                    year: unwatchedMovie.year,
                    image: unwatchedMovie.image,
                    rating: rating,
                    review: review
                };

                fetch("http://localhost:3000/movies", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loggedMovie)
                })
                    .then(response => response.json())
                    .then(newLoggedMovie => {
                        const updatedUnwatchedMovies = unwatchedMovies.filter(movie => movie.id !== unwatchedMovie.id);
                        setUnwatchedMovies(updatedUnwatchedMovies);
                    })
                    .catch(error => console.error('Error logging movie:', error));
            })
    }


    function handleRemove(event) {
        event.stopPropagation()
        const isConfirmed = window.confirm("Are you sure you want to delete this movie?");

        if (isConfirmed) {
            const filteredMovies = unwatchedMovies.filter(m => m.id !== unwatchedMovie.id)
            setUnwatchedMovies(filteredMovies)

            fetch(`http://localhost:3000/watchlisted/${unwatchedMovie.id}`, {
                method: 'DELETE'
            })
        } else {
            console.log("Deletion cancelled by user.");
        }
    }



    return (
        <div className="movie-item" onClick={toggleDisplayMode}>
            <div className={`border-box mode-${displayMode}`}>
                {displayMode === 1 && (
                    <img className="posters" src={unwatchedMovie.image} alt={unwatchedMovie.title} />
                )}

                {displayMode === 2 && (
                    <div className="information">
                        <h1 className="title">{unwatchedMovie.title}</h1>
                        <h3 className="director">Director: {unwatchedMovie.director}</h3>
                        <h4 className="year">Year: {unwatchedMovie.year}</h4>
                        <div className="button-container">
                            <button className="log-button" onClick={handleLogFilm}>
                                Log Film
                            </button>
                            <button className="delete-button" onClick={handleRemove}>
                                Remove
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UnwatchedMovie