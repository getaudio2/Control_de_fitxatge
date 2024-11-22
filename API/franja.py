from pydantic import BaseModel
from typing import Optional

# Pydantic Model for franja
class Franja(BaseModel):
    hora_inicio: str
    hora_fin: str
    descanso: str
