# Letterboxd In

Modeled as an offline/privatle alternative to the popular movie reviewing social media app, Letterboxd In is a movie review web application that allows users to log in, sign up, maintain a movie diary, and create a watchlist of movies they plan to watch. This project is built with a React frontend and a Flask/Python backend.

** This is an updated version of my earlier Flatiron School phase 2 project. This version was rebuilt to utilize a Python/Flask backend instead of a json server, and added user verification and sign-up/log-in functionality**

## Features
User Authentication: Users can sign up, log in, and log out.

Movie Diary: Logged-in users can add movies to their diary, rate them, and write reviews.

Watchlist: Logged-in users can add movies to their watchlist and move them to their diary after watching.

Responsive Design: The application is designed to be responsive and user-friendly.

## Technologies Used
Frontend: React, React Router, CSS

Backend: Flask, SQLAlchemy

Database: SQLite


# Installation and Setup

Inside the project run these commands:

```
pipenv install
pipenv shell
cd server
```

## Database Setup

```
flask db init
flask db migrate -m "example migration message"
flask db upgrade
```

Once your database has been upgraded you may run the server with:

```
python app.py
```

## Frontend Setup
In a seperate terminal:
```
cd ..
cd client
npm install
npm run dev
```

# License
This project is licensed under the MIT License.
