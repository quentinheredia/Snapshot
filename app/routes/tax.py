from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.utility.taxCalculator import calculate_after_tax  # Verify your folder structure

class SalariesInput(BaseModel):
    salaries: List[float]
    region: str = "Ontario"  # Currently built for Ontario

router = APIRouter()

@router.post("/tax", summary="Calculate after-tax incomes for a list of salaries")
def calculate_taxes(data: SalariesInput):
    try:
        after_tax = [calculate_after_tax(salary) for salary in data.salaries]
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return {"afterTax": after_tax}
