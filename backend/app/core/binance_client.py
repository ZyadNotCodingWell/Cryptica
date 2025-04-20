from binance.client import Client

# Initialize client without keys for public endpoints
client = Client()

def get_latest_price(symbol: str):
    return client.get_symbol_ticker(symbol=symbol)

def get_candlestick_data(symbol: str, interval="1m", limit=100):
    return client.get_klines(symbol=symbol, interval=interval, limit=limit)

print(get_latest_price("ETHUSDT"))


