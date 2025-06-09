from sqlalchemy import (
    Column, Integer, String, ForeignKey,
    DateTime, Boolean, Enum, Text
)
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime
from enum import Enum as PyEnum

Base = declarative_base()

class UserTier(PyEnum):
    FREE = "free"
    FLEX = "flex"
    PRO = "pro"
    ENTERPRISE = "enterprise"

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    email = Column(String(100), unique=True, nullable=True)
    tier = Column(Enum(UserTier), default=UserTier.FREE)
    created_at = Column(DateTime, default=datetime.utcnow)

    followed_coins = relationship("UserCoin", back_populates="user")
    unlocked_models = relationship("UserModel", back_populates="user")

class Coin(Base):
    __tablename__ = 'coins'

    ticker = Column(String(20), primary_key=True)
    name = Column(String(50), nullable=False)
    is_active = Column(Boolean, default=True)
    last_updated = Column(DateTime, default=datetime.utcnow)

    followers = relationship("UserCoin", back_populates="coin")
    models = relationship("PredictionModel", back_populates="coin")

class UserCoin(Base):
    __tablename__ = 'user_coins'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    coin_ticker = Column(String(20), ForeignKey('coins.ticker'), primary_key=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="followed_coins")
    coin = relationship("Coin", back_populates="followers")

class PredictionModel(Base):
    __tablename__ = 'prediction_models'

    id = Column(String(50), primary_key=True)
    coin_ticker = Column(String(20), ForeignKey('coins.ticker'))
    name = Column(String(100))
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    coin = relationship("Coin", back_populates="models")
    unlocked_by = relationship("UserModel", back_populates="model")

class UserModel(Base):
    __tablename__ = 'user_models'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    model_id = Column(String(50), ForeignKey('prediction_models.id'), primary_key=True)
    unlocked_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="unlocked_models")
    model = relationship("PredictionModel", back_populates="unlocked_by")
