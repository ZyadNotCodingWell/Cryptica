from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.db.models.schema import User, Coin, UserCoin
from app.db.session import get_db
import os
from dotenv import load_dotenv

router = APIRouter()

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user_id = int(user_id)
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/me", response_model=dict)
def get_my_profile(user: User = Depends(get_current_user)):
    return {
        "username": user.username,
        "email": user.email,
        "tier": user.tier.value  # enum value: "free", "pro", etc.
    }


@router.get("/my-coins")
def get_user_followed_coins(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    followed = (
        db.query(Coin)
        .join(UserCoin, Coin.ticker == UserCoin.coin_ticker)
        .filter(UserCoin.user_id == user.id)
        .all()
    )

    return [
        {
            "name": coin.name,
            "ticker": coin.ticker,
            # "icon_link": coin.icon_link  <-- remove until you add this field
        }
        for coin in followed
    ]
