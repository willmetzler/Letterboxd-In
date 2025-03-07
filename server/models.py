from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users_table'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    _hashed_password = db.Column(db.String)

    movies = relationship('Movie', backref='user')
    watchlist = relationship('Watchlist', backref='user')

    serialize_rules = ('-movies.user', '-watchlist.user')
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
        }

class Movie(db.Model, SerializerMixin):
    __tablename__ ='movies_table'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    director = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    rating = db.Column(db.Float)
    review = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))

    serialize_rules = ('-user.movies',)


class Watchlist(db.Model, SerializerMixin):
    __tablename__='watchlist_table'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    director = db.Column(db.String, nullable=False)
    year = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))

    serialize_rules = ('-user.watchlist',)

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is not None and (rating < 0 or rating > 10):
            raise ValueError("Rating must be between 0 and 10")
        return rating
