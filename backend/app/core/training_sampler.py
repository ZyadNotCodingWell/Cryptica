from binance_client import client

print("5 days ago")
for kline in client.get_historical_klines("BTCEUR", "30m", "5 days ago UTC", "4 days ago UTC"):
	print(kline)
print("4 days ago")
for kline in client.get_historical_klines("BTCEUR", "30m", "4 days ago UTC", "3 days ago UTC"):
	print(kline[4])
print("3 days ago")
for kline in client.get_historical_klines("BTCEUR", "30m", "3 days ago UTC", "2 days ago UTC"):
	print(kline[4])
print("2 days ago")
for kline in client.get_historical_klines("BTCEUR", "30m", "2 days ago UTC", "1 day ago UTC"):
	print(kline[4])
print("1 day ago")
for kline in client.get_historical_klines("BTCEUR", "30m", "1 day ago UTC", "now UTC"):
	print(kline[4])

