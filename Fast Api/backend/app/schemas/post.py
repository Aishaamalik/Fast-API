from pydantic import BaseModel, Field
from typing import Optional

class PostBase(BaseModel):
    title: str = Field(..., min_length=1)
    content: str = Field(..., min_length=1)
    author: Optional[str] = Field(None, min_length=1)

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int

    class Config:
        orm_mode = True 