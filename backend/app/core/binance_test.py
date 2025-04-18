from binance_client import get_latest_price, get_candlestick_data

# Example usage
print(get_latest_price("BTCUSDT"))

candles = get_candlestick_data("BTCUSDT")
for candle in candles[:5]:  # Just print first 5
    print(candle)
