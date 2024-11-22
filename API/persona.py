from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Persona
class Persona(BaseModel):
    name: str
    email: str
    grado_id: int
    rol: str
    username: str
