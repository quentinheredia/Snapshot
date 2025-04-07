# user_profile.py
from snapshot import Snapshot

class UserProfile:
    def __init__(self, username=None, user_salary=None, snapshot=None):
        self.username = username
        self.user_salary = user_salary
        # If no snapshot provided, create a new one with the salary
        self.snapshot = Snapshot(user_salary) if snapshot is None else snapshot

    def set_username(self, name):
        self.username = name

    def set_salary(self, salary):
        self.user_salary = salary
        # Optionally update the snapshot salary if necessary
        if self.snapshot:
            self.snapshot.salary = salary

    def get_username(self):
        return self.username

    def get_salary(self):
        return self.user_salary

    def __str__(self):
        return f"UserProfile(username={self.username}, user_salary={self.user_salary}, snapshot={self.snapshot})"
