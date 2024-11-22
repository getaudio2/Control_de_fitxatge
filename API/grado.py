from pydantic import BaseModel
from typing import Optional

# Pydantic Model for grado
class Grado(BaseModel):
    nombre: str
    curso: int
    grupo: str