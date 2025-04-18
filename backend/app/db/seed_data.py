from sqlalchemy.orm import sessionmaker
from crate_tables import engine, User, Coin, UserCrypto
from datetime import datetime

Session = sessionmaker(bind=engine)
session = Session()

# Clear existing data (optional)
session.query(UserCrypto).delete()
session.query(User).delete()
session.query(Coin).delete()

# Add sample user and coin
user = User(username="satoshi", password_hash="supersecurehash", email="satoshi@btc.com")
coin = Coin(name="Bitcoin", icon_link="https://bitcoin.org/img/icons/opengraph.png", api_reference="BTC")

session.add(user)
session.add(coin)
session.commit()

# Link user to coin
user_crypto = UserCrypto(user_id=user.id, coin_id=coin.id, created_at=datetime.utcnow())
session.add(user_crypto)
session.commit()

print("✅ Seeded test data.")
