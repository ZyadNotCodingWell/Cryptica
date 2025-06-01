
from fastapi import Depends, HTTPException, APIRouter
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.db.create_tables import User
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.models.user import Coin, UserCrypto


router = APIRouter()


SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")           # ← look here
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        user_id = int(user_id)
    except (JWTError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/me")
def get_my_dashboard_data(user: User = Depends(get_current_user)):
    return {
        "username": user.username,
        "coins": ["BTC", "ETH", "LTC"],  # replace with actual DB fetch
    }

@router.get("/my-coins")
def get_user_followed_coins(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Fetch the coins followed by the user via the user_cryptos link
    user_coins = (
        db.query(Coin)
        .join(UserCrypto, Coin.id == UserCrypto.coin_id)
        .filter(UserCrypto.user_id == user.id)
        .all()
    )

    return [
        {
            "name": coin.name,
            "api_reference": coin.api_reference,
            "icon_link": coin.icon_link
        }
        for coin in user_coins
    ]

