import { Outlet } from 'react-router-dom'

function About () {

    return(
        <div>
            <h2 className="subheader">What is Letterboxd In?</h2>
                <p className='about-text'>In 2011, now social media phenomenon <em>Letterboxd</em> launched, advertising itself as "the GoodReads for film". Today, the movie rating app boasts 10 million users and is the go-to online destination for discourse on films both new and old. With an emphasis on ratings and reviews, Letterboxd asks you to put your opinions out for all to see... <span className='inline-text'>but what if you wanted to keep track of your favorite movies without the performative ask of social media?</span></p>
                <br/>
                <p className='about-text'>Here at Letterbox'd In, you can be free to keep track of your wishlist and movie diary without feeling the need to write reviews your friends will find funny or without feeling embarrassed by what you watch. It's just for you!</p>
                <br/>
                <p className='about-text'><span className='inline-text'>Most importantly</span>, here users can be free to rate movies on a 20-point scale instead of Letterbox's <span className='inline-text'>smothering</span> 5-star, 10-point (including half-stars) scale. True fans of shouting their opinions on media into the void know that there is a <span className='inline-text'>HUGE</span> difference between a 3-star and a 3.5 star film, and sometimes that choice can be paralyzing! Here at Letterboxd In, you can feel free to get a little more specific.</p>
            <Outlet />
        </div>
    )
}

export default About