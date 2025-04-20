from fastapi import FastAPI
from app.routes import auth, coins
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

# Allow requests from your frontend (adjust as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # 👈 frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router, prefix="/auth")
app.include_router(coins.router)
#app.include_router(forecast.router, prefix="/forecast")

@app.get("/")
def root():
    return {"message": "Crypto Forecast Backend is live!"}

@app.get("/test")
def test():
    return {"message": "This is a test route!"}

@app.get("/other_test")
def coins():
    return {"message": "This is another test route!"}

