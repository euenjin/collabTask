from enum import Enum
from datetime import datetime
from pydantic import BaseModel

class ScheduleType(str, Enum):
    OneTime = "one_time"
    FIXED = "fixed"
    FLEXIBLE = "flexible"

class PriorityLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class ScheduleItem(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    schedule_type: ScheduleType
    priority: PriorityLevel
    repeat: bool = False

    class Config:
        orm_mode = True  # Enable ORM mode for compatibility with SQLAlchemy models
