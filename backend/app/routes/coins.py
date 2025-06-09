# app/routes/coins.py

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db.models.schema import Coin, UserCoin, User
from app.routes.dashboard import get_current_user

router = APIRouter()

def coin_to_frontend(coin: Coin):
    return {
        "name": coin.name,
        "apiReference": coin.ticker,   # ticker as apiReference
    }

@router.get("/coins", response_model=list[dict])
def get_all_coins(db: Session = Depends(get_db)):
    coins = db.query(Coin).all()
    return [coin_to_frontend(coin) for coin in coins]

@router.get("/coins/search", response_model=list[dict])
def search_coins(query: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    coins = db.query(Coin).filter(Coin.name.ilike(f"%{query}%")).all()
    return [coin_to_frontend(coin) for coin in coins]

@router.post(
    "/coins/follow/{ticker}",
    status_code=status.HTTP_201_CREATED,
    response_model=dict
)
def follow_coin(
    ticker: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    coin = db.query(Coin).filter(Coin.ticker == ticker).first()
    if not coin:
        raise HTTPException(status_code=404, detail="Coin not found")

    existing = (
        db.query(UserCoin)
        .filter_by(user_id=user.id, coin_ticker=coin.ticker)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already following this coin"
        )

    follow = UserCoin(user_id=user.id, coin_ticker=coin.ticker)
    db.add(follow)
    db.commit()

    return {"message": f"Now following {ticker}"}

@router.delete(
    "/coins/unfollow/{ticker}",
    response_model=dict
)
def unfollow_coin(
    ticker: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    coin = db.query(Coin).filter(Coin.ticker == ticker).first()
    if not coin:
        raise HTTPException(status_code=404, detail="Coin not found")

    follow = (
        db.query(UserCoin)
        .filter_by(user_id=user.id, coin_ticker=coin.ticker)
        .first()
    )
    if not follow:
        raise HTTPException(
            status_code=404,
            detail="Not following this coin"
        )

    db.delete(follow)
    db.commit()

    return {"message": f"Unfollowed {ticker}"}
