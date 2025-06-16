from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for posts
posts_db = []

class Post(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    title: str
    content: str
    author: Optional[str] = None

class PostResponse(Post):
    id: int
    created_at: str

@app.get("/api/posts", response_model=List[PostResponse])
async def get_posts():
    return posts_db

@app.post("/api/posts", response_model=PostResponse)
async def create_post(post: Post):
    # Create a new post with ID and timestamp
    new_post = {
        "id": len(posts_db) + 1,
        "title": post.title,
        "content": post.content,
        "author": post.author,
        "created_at": datetime.now().isoformat()
    }
    posts_db.append(new_post)
    return new_post 