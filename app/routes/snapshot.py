from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.models.snapshot_model import Snapshot

class SalaryInput(BaseModel):
    hourly_rate: float | None = None
    weekly_hours: float | None = None
    weekly_income: float | None = None
    yearly_income: float | None = None

router = APIRouter()

@router.post("/snapshot", summary="Calculate flexible salary breakdown")
def create_snapshot(data: SalaryInput):
    try:
        snap = Snapshot(
            hourly_rate=data.hourly_rate,
            weekly_hours=data.weekly_hours,
            weekly_income=data.weekly_income,
            yearly_income=data.yearly_income,
        )
        breakdown = snap.breakdown()
        projections = snap.projections()
        timeBank = snap.timeBank()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    return {"breakdown": breakdown, "projections": projections, "timeBank": timeBank}
