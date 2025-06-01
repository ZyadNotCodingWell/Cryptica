# app/db/create_tables.py
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, DateTime, text
from sqlalchemy.orm import sessionmaker, relationship, Session, declarative_base
from datetime import datetime
from app.db.session import engine, get_db  # Import session setup

Base = declarative_base()

# Define tables (models)
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

# Create the tables (drop and recreate)
def create_tables():
    Base.metadata.drop_all(engine)  # Drop the tables if they already exist
    Base.metadata.create_all(engine)  # Create the tables anew

# Function to print the database layout (list tables)
def print_database_layout(db_session: Session):
    # Use `text()` to explicitly mark the SQL as a textual query
    result = db_session.execute(
        text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    )
    
    # Print the result
    for row in result:
        print(row)

# Create the tables and print the layout
if __name__ == "__main__":
    create_tables()    
    dbSession = next(get_db())        # Drop and recreate tables
    print_database_layout(dbSession)    # Print all tables in the database
