from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..db.session import get_db
from ..db.crate_tables import Coin

router = APIRouter()


@router.get("/coins")
def get_all_coins(db: Session = Depends(get_db)):
    return db.query(Coin).all()
