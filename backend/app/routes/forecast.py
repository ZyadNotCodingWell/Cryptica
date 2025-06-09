from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..core.binance_client import client
from ..prediction_models.proto import predict_next_5_closes  # import your proto function

router = APIRouter()

class PredictRequest(BaseModel):
    api_reference: str
    interval: str  # e.g. "1h", "4h"

@router.post("")
def predict_with_prophet(req: PredictRequest):
    try:
        interval_map = {
            "30m": "2 weeks ago UTC",
            "1h": "1 month ago UTC",
            "4h": "3 months ago UTC",
            "1d": "6 months ago UTC"
        }

        # Validate interval
        if req.interval not in interval_map:
            raise HTTPException(status_code=400, detail=f"Unsupported interval '{req.interval}'")

        start = interval_map[req.interval]

        # Fetch candles from Binance client
        candles = client.get_historical_klines(req.api_reference, req.interval, start)
        if not candles:
            raise HTTPException(status_code=404, detail="No candle data returned from Binance API")

        # Call proto.py's prediction function
        predictions = predict_next_5_closes(req.interval.upper(), candles)

        return {
            "predictions": predictions  # list of predicted closing prices (float)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
