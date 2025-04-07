class Snapshot:
    def __init__(self, *, hourly_rate=None, weekly_hours=None, weekly_income=None, yearly_income=None, default_weekly_hours=37.5): 
        """ 
        Initialize a SalarySnapshot with one or more parameters. 
        If only an hourly_rate is provided, default weekly_hours is 37.5. 
        For yearly_income without weekly_hours, 40 hours is assumed. 
        """ 
        self.default_weekly_hours = default_weekly_hours 
        self.hourly_rate = hourly_rate 
        self.weekly_hours = weekly_hours 
        self.weekly_income = weekly_income 
        self.yearly_income = yearly_income 

        self.calculate_values()


    def calculate_values(self):
        # Set default weekly_hours if not provided
        if self.weekly_hours is None:
            if self.hourly_rate is not None:
                self.weekly_hours = self.default_weekly_hours
            elif self.weekly_income is not None or self.yearly_income is not None:
                self.weekly_hours = 40  # Assumed for white collar or contract workers
            else:
                # Fallback if nothing is provided
                self.weekly_hours = self.default_weekly_hours

        # Compute hourly_rate if missing
        if self.hourly_rate is None:
            if self.weekly_income is not None and self.weekly_hours:
                self.hourly_rate = self.weekly_income / self.weekly_hours
            elif self.yearly_income is not None and self.weekly_hours:
                self.hourly_rate = self.yearly_income / (self.weekly_hours * 52)
            else:
                self.hourly_rate = 30

        # Compute weekly_income if missing
        if self.weekly_income is None:
            if self.hourly_rate is not None and self.weekly_hours:
                self.weekly_income = self.hourly_rate * self.weekly_hours
            elif self.yearly_income is not None:
                self.weekly_income = self.yearly_income / 52

        # Compute yearly_income if missing
        if self.yearly_income is None:
            if self.weekly_income is not None:
                self.yearly_income = self.weekly_income * 52
            elif self.hourly_rate is not None and self.weekly_hours:
                self.yearly_income = self.hourly_rate * self.weekly_hours * 52

    def breakdown(self):
        """
        Returns a dictionary with the salary breakdown.
        Assumes a 5-day workweek to calculate daily earnings.
        """
        daily_hours = self.weekly_hours / 5
        daily_wage = self.hourly_rate * daily_hours if self.hourly_rate is not None else None

        return {
            "Per Hour you make": self.hourly_rate,
            "Every day you make": daily_wage,
            "Every week you make": self.weekly_income,
            "Every two weeks you make": self.weekly_income * 2 if self.weekly_income is not None else None,
            "Every month you make": self.yearly_income / 12 if self.yearly_income is not None else None,
            "Every year you make": self.yearly_income,
        }
    
    def projections(self):
        return {
            "In 5 years you will have made": self.yearly_income * 5 if self.yearly_income is not None else None,
            "In 10 years you will have made": self.yearly_income * 10 if self.yearly_income is not None else None,
            "In 15 years you will have made": self.yearly_income * 15 if self.yearly_income is not None else None,
        }   

    def timeBank(self):
        return {
            "2025 Toyota Corolla LE 4dr Sedan": self.hours_to_purchase(23970),
            "A brand new house in Ontario": self.hours_to_purchase(834050),
            "A movie night out with some friends": self.hours_to_purchase(12.99),
            "Dinner at a decent restaurant": self.hours_to_purchase(40), 
        }    
    
        

    def hours_to_purchase(self, item_cost):
        """
        Returns the number of work hours required to earn a specified item cost.
        """
        if self.hourly_rate is None or self.hourly_rate == 0:
            return None
        return item_cost / self.hourly_rate

    def adjust_for_raise(self, additional_per_hour):
        """
        Returns a new breakdown based on an increased hourly rate (e.g., UC5).
        """
        new_hourly_rate = self.hourly_rate + additional_per_hour
        new_weekly_income = new_hourly_rate * self.weekly_hours
        new_yearly_income = new_weekly_income * 52
        daily_hours = self.weekly_hours / 5
        new_daily_wage = new_hourly_rate * daily_hours

        return {
            "Hourly": new_hourly_rate,
            "Daily": new_daily_wage,
            "Weekly": new_weekly_income,
            "BiWeekly": new_weekly_income * 2,
            "Monthly": new_yearly_income / 12,
            "Yearly": new_yearly_income,
        }

    # Optional setters for interactive adjustments (UC6)
    def set_hourly_rate(self, hourly_rate):
        self.hourly_rate = hourly_rate
        self.calculate_values()

    def set_weekly_hours(self, weekly_hours):
        self.weekly_hours = weekly_hours
        self.calculate_values()

    def set_weekly_income(self, weekly_income):
        self.weekly_income = weekly_income
        self.calculate_values()

    def set_yearly_income(self, yearly_income):
        self.yearly_income = yearly_income
        self.calculate_values()

    def __str__(self):
        return f"SalarySnapshot({self.breakdown()})"
