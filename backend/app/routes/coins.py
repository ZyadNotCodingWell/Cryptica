# app/routes/coins.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import Coin, UserCrypto, User
from app.routes.dashboard import get_current_user  # your JWT auth
                                        
router = APIRouter()

@router.get("/coins", response_model=list[dict])
def get_all_coins(db: Session = Depends(get_db)):
    coins = db.query(Coin).all()
    return [
        {
            "id": coin.id,
            "name": coin.name,
            "icon_link": coin.icon_link,
            "api_reference": coin.api_reference,
        }
        for coin in coins
    ]

@router.get("/coins/search", response_model=list[dict])
def search_coins(query: str, db: Session = Depends(get_db)):
    coins = db.query(Coin).filter(Coin.name.ilike(f"%{query}%")).all()
    return [
        {
            "id": coin.id,
            "name": coin.name,
            "icon_link": coin.icon_link,
            "api_reference": coin.api_reference,
        }
        for coin in coins
    ]

@router.post(
    "/coins/follow/{api_reference}",
    status_code=status.HTTP_201_CREATED,
    response_model=dict
)
def follow_coin(
    api_reference: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    coin = db.query(Coin).filter(Coin.api_reference == api_reference).first()
    if not coin:
        raise HTTPException(status_code=404, detail="Coin not found")

    existing = (
        db.query(UserCrypto)
        .filter_by(user_id=user.id, coin_id=coin.id)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already following this coin"
        )

    follow = UserCrypto(user_id=user.id, coin_id=coin.id)
    db.add(follow)
    db.commit()

    return {"message": f"Now following {api_reference}"}

@router.delete(
    "/coins/unfollow/{api_reference}",
    response_model=dict
)
def unfollow_coin(
    api_reference: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    coin = db.query(Coin).filter(Coin.api_reference == api_reference).first()
    if not coin:
        raise HTTPException(status_code=404, detail="Coin not found")

    follow = (
        db.query(UserCrypto)
        .filter_by(user_id=user.id, coin_id=coin.id)
        .first()
    )
    if not follow:
        raise HTTPException(
            status_code=404,
            detail="Not following this coin"
        )

    db.delete(follow)
    db.commit()

    return {"message": f"Unfollowed {api_reference}"}
