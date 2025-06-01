from sqlalchemy.orm import sessionmaker
from app.db.create_tables import engine, Coin  # Import Coin model
from binance.client import Client

# Set up session and Binance client
Session = sessionmaker(bind=engine)
session = Session()
client = Client()  # Initialize Binance client

# Clear existing coins (optional, can be skipped if needed)
session.query(Coin).delete()

# Default image for coins without an icon
default_icon = "https://imgs.search.brave.com/LmcWTAsQbgErRAsVTc_KhoYE1-Cz4onVpInv5xitqBI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNS9HYW1l/LUdvbGQtQ29pbi1Q/TkcucG5n"  # Replace with your blank icon URL

# Fetch all available coin pairs from Binance
exchange_info = client.get_exchange_info()

# Loop through each symbol and insert coin data into the database
for symbol_info in exchange_info['symbols']:
    symbol = symbol_info['symbol']
    
    # You can derive the coin's base or quote asset as needed
    base_asset = symbol_info['baseAsset']
    quote_asset = symbol_info['quoteAsset']
    
    # Try to use the base asset name as a placeholder for the coin's name if necessary
    name = base_asset  # You could adjust this if you want a more descriptive name
    
    # Add the coin to the database
    coin = Coin(name=name, icon_link=default_icon, api_reference=symbol)
    session.add(coin)

# Commit the changes to the database
session.commit()

print("✅ Seeded coins data.")
