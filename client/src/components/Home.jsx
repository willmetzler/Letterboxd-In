import { Link } from 'react-router-dom'

function Home () {
    
    return (
        <>
            <h2 className="subheader" >Welcome to Letterboxd In: A movie review app for the introvert!</h2>

            <br/>
            <br/>


            <h3 id="site-directory">Site Directory:</h3>
            <Link to="/diary"><h3 className="directory-section">Movie Diary</h3></Link>
                <h4 className="directory-details">A place to keep track of your favorite movies, give them ratings, and log your reviews!</h4>
            
            <br/>

            <Link to="/watchlist"><h3 className="directory-section">Watchlist</h3></Link>
                <h4 className="directory-details">A resource to keep track of the movies you want to watch next!</h4>

            <br/>

            <Link to="/about"><h3 className="directory-section">About</h3></Link>
                <h4 className="directory-details">Learn more about Letterboxd In!</h4>
        </>
    )
}

export default Home