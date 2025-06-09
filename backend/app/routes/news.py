from fastapi import APIRouter, HTTPException
import os
import httpx
from dotenv import load_dotenv
from typing import List, Dict, Any
from datetime import datetime

load_dotenv()

router = APIRouter()

COINDESK_API = "https://data-api.coindesk.com/news/v1/search"
COINDESK_KEY = os.getenv("COINDESK_API_KEY")  # Make sure this is in your .env
BINANCE_ROUTE = "http://localhost:8000/data/symbol-info"

async def fetch_symbol_assets(symbol: str) -> Dict[str, str]:
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{BINANCE_ROUTE}/{symbol}")
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Failed to retrieve symbol info")
        return resp.json()

async def fetch_coindesk_news(keyword: str, limit: int = 15) -> List[Dict[str, Any]]:
    params = {
        "search_string": keyword,
        "lang": "EN",
        "source_key": "coindesk",
        "api_key": COINDESK_KEY,  # Assuming this is the correct parameter name
        "limit": limit,
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.get(COINDESK_API, params=params)
            resp.raise_for_status()
            
            data = resp.json()
            if not data.get("Data"):
                return []
                
            return [
                {
                    "title": item.get("TITLE", "No title"),
                    "description": (item.get("SUBTITLE") or (item.get("BODY", "")[:200] + "...")) if (item.get("SUBTITLE") or item.get("BODY")) else "No description",
                    "published_at": datetime.utcfromtimestamp(item["PUBLISHED_ON"]).isoformat() if item.get("PUBLISHED_ON") else "",
                    "url": item.get("URL", ""),
                    "image_url": item.get("IMAGE_URL", ""),
                    "source": "CoinDesk",
                    "sentiment": item.get("SENTIMENT", ""),
                    "keywords": [kw.strip() for kw in item.get("KEYWORDS", "").split(",")] if item.get("KEYWORDS") else []
                }
                for item in data["Data"]
                if item.get("URL")  # Only include items with valid URLs
            ]
            
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f"CoinDesk API error: {e.response.text}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )

@router.get("/{symbol}")
async def get_crypto_news(symbol: str) -> List[Dict[str, Any]]:
    try:
        assets = await fetch_symbol_assets(symbol)
        base, quote = assets["baseAsset"], assets["quoteAsset"]

        # Fetch news for both base and quote assets
        base_news = await fetch_coindesk_news(base)
        quote_news = await fetch_coindesk_news(quote)

        seen = set()
        combined_news = []

        for item in base_news + quote_news:
            if item["url"] not in seen:
                seen.add(item["url"])
                combined_news.append(item)

        return combined_news[:15]  # Return top 15 unique items

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))