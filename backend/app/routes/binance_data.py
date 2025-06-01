from app.core.binance_client import client
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.get("/{symbol}")
async def get_candlestick_data(
    symbol: str,  # The coin symbol (BTCUSDT, ETHUSDT)
    interval: str = "30m",  # Default to 30 minutes
    start: str = "1 week ago UTC",  # Default to 2 days ago
    end: str = None,  # Optional end date
):
    try:
        candles = client.get_historical_klines(symbol, interval, start, end)
        return {"candles": candles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/24h/{symbol}")
async def get_24h_price_change(symbol: str):
		try:
				price_change = client.get_ticker(symbol=symbol)
				return {"price_change": price_change}
		except Exception as e:
				raise HTTPException(status_code=500, detail=str(e))

