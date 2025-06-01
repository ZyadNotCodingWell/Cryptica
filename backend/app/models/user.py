# app/models/user.py

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Coin(Base):
    __tablename__ = 'coins'
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    icon_link = Column(String, nullable=False)
    api_reference = Column(String, nullable=False)

class UserCrypto(Base):
    __tablename__ = 'user_cryptos'
    
    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    coin_id = Column(Integer, ForeignKey('coins.id'), primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship('User', backref='user_cryptos')
    coin = relationship('Coin', backref='user_cryptos')
