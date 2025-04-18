from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime


Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    email = Column(String, nullable=True)
    
class Coin(Base):
    __tablename__ = 'coins'
    
    id = Column(Integer, primary_key=True)
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

# Connection setup (replace with your actual database URI)
DATABASE_URL = "postgresql://crypto_user:mar1JAN19@localhost:5432/crypto_db"
engine = create_engine(DATABASE_URL)

Base.metadata.create_all(engine)
