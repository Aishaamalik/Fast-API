from fastapi import APIRouter, HTTPException, status
from typing import List
from ..schemas.post import Post, PostCreate

router = APIRouter()

# In-memory storage for posts
posts = []
post_id_counter = 1

@router.post("/posts", response_model=Post, status_code=status.HTTP_201_CREATED)
async def create_post(post: PostCreate):
    try:
        global post_id_counter
        new_post = Post(
            id=post_id_counter,
            title=post.title.strip(),
            content=post.content.strip(),
            author=post.author.strip() if post.author else None
        )
        posts.append(new_post)
        post_id_counter += 1
        return new_post
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.get("/posts", response_model=List[Post])
async def get_posts():
    return posts 