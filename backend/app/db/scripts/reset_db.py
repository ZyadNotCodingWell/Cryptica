from backend.app.db.session import get_db
from backend.app.db.utils import create_tables, print_database_layout
from ..session import engine
if __name__ == "__main__":
    create_tables(engine)
    db = next(get_db())
    print_database_layout(db)