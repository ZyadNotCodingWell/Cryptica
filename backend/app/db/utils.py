
from sqlalchemy import (text)
from sqlalchemy.orm import Session

from backend.app.db.models.schema import Base

def create_tables(engine):
    # Use a raw psycopg2 connection to reset schema
    raw_conn = engine.raw_connection()
    try:
        with raw_conn.cursor() as cur:
            cur.execute("DROP SCHEMA IF EXISTS public CASCADE;")
            cur.execute("CREATE SCHEMA public;")
        raw_conn.commit()
    finally:
        raw_conn.close()

    # Now use SQLAlchemy to recreate tables
    Base.metadata.create_all(engine)

def print_database_layout(db_session: Session):
    result = db_session.execute(
        text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    )
    print("=== Database Tables ===")
    for row in result:
        print(row.table_name)
