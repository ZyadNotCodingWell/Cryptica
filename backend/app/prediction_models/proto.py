import pandas as pd
from prophet import Prophet

def predict_next_5_closes(interval: str, candles: list):
    """
    Predict next 5 closing prices using Prophet.

    :param interval: string, e.g. '1h', '5m', '1d' — not used directly for prediction but could be logged
    :param candles: list of candles from Binance API, 
                    each candle is [open_time, open, high, low, close, ...]
    :return: list of 5 predicted closing prices (floats)
    """

    # Binance candles example: [open_time, open, high, low, close, ...]
    # We only need timestamp and close price

    # Prepare data for Prophet: DataFrame with columns ds (datetime), y (closing price)
    df = pd.DataFrame(candles, columns=[
        'open_time', 'open', 'high', 'low', 'close', 'volume',
        'close_time', 'quote_asset_volume', 'number_of_trades',
        'taker_buy_base_asset_volume', 'taker_buy_quote_asset_volume', 'ignore'
    ])

    # Convert timestamp (ms) to datetime for Prophet
    df['ds'] = pd.to_datetime(df['close_time'], unit='ms')
    df['y'] = df['close'].astype(float)

    # Only keep required columns
    df = df[['ds', 'y']]

    # Train Prophet model
    model = Prophet(daily_seasonality=True)
    model.fit(df)

    # Create dataframe to hold future dates
    future = model.make_future_dataframe(periods=5, freq=interval)

    # Predict future
    forecast = model.predict(future)

    # Extract only the 5 future predictions (last 5 rows, after original df)
    preds = forecast[['ds', 'yhat']].tail(5)

    # Return just predicted closing prices as a list of floats
    return preds['yhat'].tolist()
