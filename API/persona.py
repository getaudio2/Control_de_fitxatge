from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Alumne
class Persona(BaseModel):
    name: str
    email: str
    Clase_id: int
    Rol: str
    username: str
