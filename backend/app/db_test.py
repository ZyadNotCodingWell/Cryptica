# test_db.py
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = "postgresql+asyncpg://crypto_user:mar1JAN19@localhost:5432/crypto_db"

async def test():
    engine = create_async_engine(DATABASE_URL, echo=True)
    async with engine.connect() as conn:
        await conn.execute(text("SELECT 1"))
        print("✅ Connection works!")

asyncio.run(test())
