def calculate_after_tax(income: float) -> float:
    """
    Calculate the after-tax income for Ontario, Canada.
    """
    federal_tax = calculate_federal_tax(income)
    ontario_tax = calculate_ontario_tax(income)
    total_tax = federal_tax + ontario_tax
    return income - total_tax

def calculate_federal_tax(income: float) -> float:
    """
    Calculate the federal tax based on 2023 brackets (approximate).
    """
    tax = 0.0
    remaining = income
    # Federal tax brackets for 2023 (approximate values)
    brackets = [
        {"threshold": 53359, "rate": 0.15},
        {"threshold": 53358, "rate": 0.205},  # income from $53,359 to $106,717
        {"threshold": 58613, "rate": 0.26},   # income from $106,717 to $165,430
        {"threshold": 70245, "rate": 0.29},   # income from $165,430 to $235,675
        {"threshold": float("inf"), "rate": 0.33},
    ]
    
    for bracket in brackets:
        taxable = min(remaining, bracket["threshold"])
        tax += taxable * bracket["rate"]
        remaining -= taxable
        if remaining <= 0:
            break
    return tax

def calculate_ontario_tax(income: float) -> float:
    """
    Calculate the Ontario provincial tax based on 2023 brackets (approximate).
    """
    tax = 0.0
    remaining = income
    # Ontario tax brackets for 2023 (approximate values)
    brackets = [
        {"threshold": 49231, "rate": 0.0505},
        {"threshold": 49232, "rate": 0.0915},  # income from $49,231 to $98,463
        {"threshold": 51537, "rate": 0.1116},  # income from $98,463 to $150,000
        {"threshold": 70000, "rate": 0.1216},  # income from $150,000 to $220,000
        {"threshold": float("inf"), "rate": 0.1316},
    ]
    
    for bracket in brackets:
        taxable = min(remaining, bracket["threshold"])
        tax += taxable * bracket["rate"]
        remaining -= taxable
        if remaining <= 0:
            break
    return tax

# Example usage:
if __name__ == "__main__":
    income = 100000.0
    after_tax_income = calculate_after_tax(income)
    print(f"After-tax income for ${income:,.2f} is ${after_tax_income:,.2f}")
