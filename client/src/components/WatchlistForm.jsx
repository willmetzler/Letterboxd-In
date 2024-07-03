import React, {useState} from 'react'

function WatchlistForm ({setUnwatchedMovies}) {

    const [unwatchedFormData, setUnwatchedFormData] = useState({
        title: "",
        director: "",
        year: "",
        image: "",
    })

    function handleSubmit (event) {
        event.preventDefault()
        fetch("http://localhost:3000/watchlisted", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(unwatchedFormData)
        })
        .then(res => res.json())
        .then(newUnwatchedObj => {
            setUnwatchedFormData({title:'', director:'', year:'', image:''})
            setUnwatchedMovies(unwatchedMovies => [...unwatchedMovies, newUnwatchedObj])
        })
    }

    return (
        <form onSubmit={handleSubmit} className="movie-form">

            <h2 id="log-title">Add Film to Watchlist!</h2>

            <label className="movie-form-label" htmlFor="title">Title: </label>
            <input name="title" 
            value={unwatchedFormData.title}
            className='input-box'
            onChange={(event) => setUnwatchedFormData( {...unwatchedFormData, title: event.target.value} )}
            />

            <label className="movie-form-label" htmlFor="director">Director: </label>
            <input name="director" 
            value={unwatchedFormData.director}
            className='input-box'
            onChange={(event) => setUnwatchedFormData( {...unwatchedFormData, director: event.target.value} )}
            />

            <label className="movie-form-label" htmlFor="image">Poster Image URL: </label>
            <input name="image"
            value={unwatchedFormData.image}
            className='input-box'
            onChange={(event) => setUnwatchedFormData( {...unwatchedFormData, image: event.target.value} )}
            />

            <label className="movie-form-label" htmlFor="year">Year: </label>
            <input name="year" 
            value={unwatchedFormData.year}
            type="number"
            className='input-box'
            onChange={(event) => setUnwatchedFormData( {...unwatchedFormData, year: event.target.value} )}
            />

            <input id="submit-movie-form" type="submit" value="Add Film" />

        </form>
    )
}

export default WatchlistForm 