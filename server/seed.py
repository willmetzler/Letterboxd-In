#!/usr/bin/env python3

from app import app
from models import db, User, Movie, Watchlist
from faker import Faker

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")

        # Clear existing data
        db.session.query(Movie).delete()
        db.session.query(Watchlist).delete()
        db.session.query(User).delete()
        
        # Creating a dummy user for testing purposes
        user = User(
            username="testuser",
            first_name="Test",
            last_name="User",
            _hashed_password=bcrypt.generate_password_hash("password").decode('utf-8')
        )
        db.session.add(user)
        db.session.commit()

        # Seed movies
        movies_data = [
            {
                "id": 1,
                "title": "The Holdovers",
                "director": "Alexander Payne",
                "year": 2023,
                "image": "https://m.media-amazon.com/images/M/MV5BNDc2MzNkMjMtZDY5NC00NmQ0LWI1NjctZjRhNWIzZjc4MGRiXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg",
                "rating": 9,
                "review": "My new favorite Christmas movie!"
            },
            # Add other movies here...
        ]

        for movie_data in movies_data:
            movie = Movie(
                title=movie_data["title"],
                director=movie_data["director"],
                year=movie_data["year"],
                image=movie_data["image"],
                rating=movie_data.get("rating"),
                review=movie_data.get("review"),
                user_id=user.id
            )
            db.session.add(movie)

        # Seed watchlisted movies
        watchlist_data = [
            {
                "id": 2,
                "title": "American Fiction",
                "director": "Cord Jefferson",
                "year": 2023,
                "image": "https://m.media-amazon.com/images/M/MV5BZDlkZmRlYTctNGJmNy00MjVkLThjZDQtMWY5Zjg2NjlhZDZkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1000_.jpg"
            },
            # Add other watchlisted movies here...
        ]

        for watchlist_data in watchlist_data:
            watchlisted_movie = Watchlist(
                title=watchlist_data["title"],
                director=watchlist_data["director"],
                year=watchlist_data["year"],
                image=watchlist_data["image"],
                user_id=user.id
            )
            db.session.add(watchlisted_movie)

        db.session.commit()

        print("Seeding complete!")
