from binance.client import Client

# Create a client (no need for API keys)
client = Client()

# Request exchange information (this is public)
exchange_info = client.get_exchange_info()
def get_latest_price(symbol):
    try:
        ticker = client.get_symbol_ticker(symbol=symbol)
        return ticker['price']
    except Exception as e:
        print(f"Error fetching price for {symbol}: {e}")
        return None

