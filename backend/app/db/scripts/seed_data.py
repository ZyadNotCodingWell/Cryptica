from sqlalchemy.orm import sessionmaker
from app.db.models.schema import engine, Coin, User, UserTier  # Import models
from binance.client import Client
from datetime import datetime
from passlib.hash import bcrypt

# Set up session and Binance client
Session = sessionmaker(bind=engine)
session = Session()
client = Client()  # No API key needed for public endpoints

# Optional: Clear existing coins
session.query(Coin).delete()
session.commit()

# Fetch all available symbols (trading pairs)
exchange_info = client.get_exchange_info()

tickers_added = 0
for symbol_info in exchange_info['symbols']:
    symbol = symbol_info['symbol']
    base_asset = symbol_info['baseAsset']
    
    coin = Coin(
        ticker=symbol,
        name=base_asset,
        is_active=True,
        last_updated=datetime.utcnow()
    )
    session.add(coin)
    tickers_added += 1

session.commit()
print(f"✅ Seeded {tickers_added} coins from Binance.")

# --- Create Pro User ---
user_email = "zyaddch@gmail.com"
user_password = "mar1JAN19"
hashed_password = bcrypt.hash(user_password)

existing_user = session.query(User).filter_by(email=user_email).first()
if not existing_user:
    pro_user = User(
        username="zyad",
        email=user_email,
        password_hash=hashed_password,
        tier=UserTier.PRO
    )
    session.add(pro_user)
    session.commit()
    print("✅ Pro user created.")
else:
    print("ℹ️ Pro user already exists.")

session.close()
