from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import List, Optional
import os
from dotenv import load_dotenv

from database import get_db, engine
from models import Base, BlogPost, PortfolioItem
from schemas import (
    BlogPostCreate, BlogPostUpdate, BlogPostResponse,
    PortfolioItemCreate, PortfolioItemUpdate, PortfolioItemResponse,
    LoginRequest, Token, UserResponse, StatsResponse
)
from auth import authenticate_user, create_access_token, get_current_user
import crud

# 載入環境變數
load_dotenv()

# 創建資料表
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Orion Portfolio API",
    description="Personal brand website backend API",
    version="1.0.0",
    # 生產環境建議隱藏文檔
    docs_url="/docs" if os.getenv("DEBUG", "False").lower() == "true" else None,
    redoc_url="/redoc" if os.getenv("DEBUG", "False").lower() == "true" else None
)

# 改善的 CORS 設定
# 生產環境應該設定具體的域名
allowed_origins = []
if os.getenv("DEBUG", "False").lower() == "true":
    # 開發環境
    allowed_origins = [
        "http://localhost:5173", 
        "http://localhost:3000", 
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]
else:
    # 生產環境 - 請設定實際的域名
    production_origin = os.getenv("FRONTEND_URL")
    if production_origin:
        allowed_origins = [production_origin]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],  # 限制允許的方法
    allow_headers=["Authorization", "Content-Type"],  # 限制允許的標頭
    expose_headers=["Content-Range", "Accept-Ranges"]  # 暴露需要的標頭
)

security = HTTPBearer()

# 根路由
@app.get("/")
async def root():
    return {"message": "Orion Portfolio API", "version": "1.0.0", "status": "running"}

# 健康檢查端點
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

# 認證路由
@app.post("/auth/login", response_model=Token)
async def login(login_request: LoginRequest):
    """管理員登入"""
    user = authenticate_user(login_request.username, login_request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="帳號或密碼錯誤",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 1440)))
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """取得目前使用者資訊"""
    return current_user

# 公開的部落格路由（不需要認證）
@app.get("/api/blog/public", response_model=List[BlogPostResponse])
async def get_published_blog_posts(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """取得已發布的部落格文章列表（公開）"""
    posts = crud.get_blog_posts(db, skip=skip, limit=limit, category=category, status="published")
    return posts

@app.get("/api/blog/public/{post_id}", response_model=BlogPostResponse)
async def get_published_blog_post(post_id: int, db: Session = Depends(get_db)):
    """取得單一已發布的部落格文章（公開）"""
    post = crud.get_blog_post(db, post_id)
    if not post or post.status != "published":
        raise HTTPException(status_code=404, detail="文章不存在或未發布")
    
    # 增加瀏覽次數
    crud.increment_blog_post_views(db, post_id)
    return post

# 管理員專用的部落格路由
@app.get("/api/blog", response_model=List[BlogPostResponse])
async def get_blog_posts(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """取得部落格文章列表（管理員）"""
    posts = crud.get_blog_posts(db, skip=skip, limit=limit, category=category, status=status)
    return posts

@app.get("/api/blog/{post_id}", response_model=BlogPostResponse)
async def get_blog_post(
    post_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """取得單一部落格文章（管理員）"""
    post = crud.get_blog_post(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    return post

@app.post("/api/blog", response_model=BlogPostResponse)
async def create_blog_post(
    post: BlogPostCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """創建部落格文章（需要管理員權限）"""
    return crud.create_blog_post(db, post)

@app.put("/api/blog/{post_id}", response_model=BlogPostResponse)
async def update_blog_post(
    post_id: int,
    post: BlogPostUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """更新部落格文章（需要管理員權限）"""
    updated_post = crud.update_blog_post(db, post_id, post)
    if not updated_post:
        raise HTTPException(status_code=404, detail="文章不存在")
    return updated_post

@app.delete("/api/blog/{post_id}")
async def delete_blog_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """刪除部落格文章（需要管理員權限）"""
    if not crud.delete_blog_post(db, post_id):
        raise HTTPException(status_code=404, detail="文章不存在")
    return {"message": "文章已刪除"}

# 公開的作品集路由
@app.get("/api/portfolio/public", response_model=List[PortfolioItemResponse])
async def get_published_portfolio_items(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """取得已完成的作品集列表（公開）"""
    items = crud.get_portfolio_items(db, skip=skip, limit=limit, category=category, status="completed")
    return items

@app.get("/api/portfolio/public/{item_id}", response_model=PortfolioItemResponse)
async def get_published_portfolio_item(item_id: int, db: Session = Depends(get_db)):
    """取得單一已完成的作品（公開）"""
    item = crud.get_portfolio_item(db, item_id)
    if not item or item.status != "completed":
        raise HTTPException(status_code=404, detail="作品不存在或未完成")
    return item

# 管理員專用的作品集路由
@app.get("/api/portfolio", response_model=List[PortfolioItemResponse])
async def get_portfolio_items(
    skip: int = 0, 
    limit: int = 100, 
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """取得作品集列表（管理員）"""
    items = crud.get_portfolio_items(db, skip=skip, limit=limit, category=category, status=status)
    return items

@app.get("/api/portfolio/{item_id}", response_model=PortfolioItemResponse)
async def get_portfolio_item(
    item_id: int, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """取得單一作品（管理員）"""
    item = crud.get_portfolio_item(db, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="作品不存在")
    return item

@app.post("/api/portfolio", response_model=PortfolioItemResponse)
async def create_portfolio_item(
    item: PortfolioItemCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """創建作品（需要管理員權限）"""
    return crud.create_portfolio_item(db, item)

@app.put("/api/portfolio/{item_id}", response_model=PortfolioItemResponse)
async def update_portfolio_item(
    item_id: int,
    item: PortfolioItemUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """更新作品（需要管理員權限）"""
    updated_item = crud.update_portfolio_item(db, item_id, item)
    if not updated_item:
        raise HTTPException(status_code=404, detail="作品不存在")
    return updated_item

@app.delete("/api/portfolio/{item_id}")
async def delete_portfolio_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """刪除作品（需要管理員權限）"""
    if not crud.delete_portfolio_item(db, item_id):
        raise HTTPException(status_code=404, detail="作品不存在")
    return {"message": "作品已刪除"}

# 統計路由
@app.get("/api/stats", response_model=StatsResponse)
async def get_stats(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """取得統計數據（需要管理員權限）"""
    blog_count = crud.get_blog_posts_count(db)
    portfolio_count = crud.get_portfolio_items_count(db)
    
    return StatsResponse(
        blogPosts=blog_count,
        portfolioItems=portfolio_count
    )

# 文章按讚端點
@app.post("/api/blog/{post_id}/like")
async def like_blog_post(post_id: int, db: Session = Depends(get_db)):
    """按讚部落格文章（公開）"""
    post = crud.increment_blog_post_likes(db, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="文章不存在")
    return {"message": "按讚成功", "likes": post.likes}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("DEBUG", "False").lower() == "true"
    ) 