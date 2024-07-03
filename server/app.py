from flask import request, session, jsonify
from config import app, db, bcrypt
from models import User, Movie, Watchlist



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



if __name__ == '__main__':
    app.run(port=5555, debug=True)
