from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import get_db
from .analytics import compute_inventory_matrix

app = FastAPI(title="College APPEC SSMS AI Infrastructure Layer")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/analytics/dashboard")
def get_matrix_dashboard(db: Session = Depends(get_db)):
    metrics = compute_inventory_matrix(db)
    return {
        "status": "synchronized",
        "payload": metrics
    }