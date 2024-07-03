from flask import request, session, jsonify
from config import app, db, bcrypt
from models import User, Movie, Watchlist


# User Log-in/Sign-up

@app.get('/api/users')
def index_users():
    return jsonify([u.to_dict() for u in User.query.all()]), 200

@app.get('/api/users/<int:id>')
def users_by_id(id):
    user = User.query.where(User.id == id).first()
    if user:
        return jsonify(user.to_dict()), 200
    else:
        return jsonify({'error': 'Not found'}), 404

@app.post('/api/users')
def create_user():
    try:
        new_user = User(
            username=request.json['username'],
            first_name=request.json['first_name'],
            last_name=request.json['last_name'],
        )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return jsonify(new_user.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 406

@app.get('/api/get-session')
def get_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user:
            return jsonify(user.to_dict()), 200
    return {}, 204

@app.post('/api/login')
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user._hashed_password, password):
        session['user_id'] = user.id
        return jsonify(user.to_dict()), 201
    else:
        return jsonify({'error': 'Username or password was invalid'}), 401

@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204


# Movies

@app.get('/api/movies')
def get_movies():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    movies = Movie.query.filter_by(user_id=user_id).all()
    return jsonify([movie.to_dict() for movie in movies]), 200

@app.post('/api/movies')
def create_movie():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    new_movie = Movie(
        title=data['title'],
        director=data['director'],
        year=data['year'],
        image=data['image'],
        rating=data['rating'],
        review=data['review'],
        user_id=user_id
    )
    db.session.add(new_movie)
    db.session.commit()
    return jsonify(new_movie.to_dict()), 201

@app.patch('/api/movies/<int:id>')
def update_movie(id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    movie = Movie.query.get(id)
    if not movie or movie.user_id != user_id:
        return jsonify({'error': 'Not found or Unauthorized'}), 404
    data = request.json
    for key, value in data.items():
        setattr(movie, key, value)
    db.session.commit()
    return jsonify(movie.to_dict()), 200

@app.delete('/api/movies/<int:id>')
def delete_movie(id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    movie = Movie.query.get(id)
    if not movie or movie.user_id != user_id:
        return jsonify({'error': 'Not found or Unauthorized'}), 404
    db.session.delete(movie)
    db.session.commit()
    return '', 204

# Watchlist 

@app.get('/api/watchlist')
def get_watchlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    watchlist = Watchlist.query.filter_by(user_id=user_id).all()
    return jsonify([movie.to_dict() for movie in watchlist]), 200

@app.post('/api/watchlist')
def add_to_watchlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    data = request.json
    new_watchlist_movie = Watchlist(
        title=data['title'],
        director=data['director'],
        year=data['year'],
        image=data['image'],
        user_id=user_id
    )
    db.session.add(new_watchlist_movie)
    db.session.commit()
    return jsonify(new_watchlist_movie.to_dict()), 201

@app.delete('/api/watchlist/<int:id>')
def remove_from_watchlist(id):
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    movie = Watchlist.query.get(id)
    if not movie or movie.user_id != user_id:
        return jsonify({'error': 'Not found or Unauthorized'}), 404
    db.session.delete(movie)
    db.session.commit()
    return '', 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)
