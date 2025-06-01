# app/db/session.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Database URL
DATABASE_URL = "postgresql://crypto_user:mar1JAN19@localhost:5432/crypto_db"
engine = create_engine(DATABASE_URL)

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Dependency that returns a session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
