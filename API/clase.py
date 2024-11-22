from pydantic import BaseModel
from typing import Optional

# Pydantic Model for Alumne
class Clase(BaseModel):
    Modulo: str
    Nombre: str
    grado_id: int
    franja_id: int
    Aula: str
    Dia: str