from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from models import BlogPost, PortfolioItem
from schemas import BlogPostCreate, BlogPostUpdate, PortfolioItemCreate, PortfolioItemUpdate

# 部落格 CRUD 操作
def get_blog_posts(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None
) -> List[BlogPost]:
    """取得部落格文章列表"""
    query = db.query(BlogPost)
    
    # 過濾條件
    filters = []
    if category:
        filters.append(BlogPost.category == category)
    if status:
        filters.append(BlogPost.status == status)
    
    if filters:
        query = query.filter(and_(*filters))
    
    # 按發布時間倒序排列
    query = query.order_by(BlogPost.published_at.desc())
    
    return query.offset(skip).limit(limit).all()

def get_blog_post(db: Session, post_id: int) -> Optional[BlogPost]:
    """取得單一部落格文章"""
    return db.query(BlogPost).filter(BlogPost.id == post_id).first()

def create_blog_post(db: Session, post: BlogPostCreate) -> BlogPost:
    """創建部落格文章"""
    db_post = BlogPost(
        title=post.title,
        excerpt=post.excerpt,
        content=post.content,
        category=post.category,
        tags=post.tags,
        author=post.author,
        read_time=post.read_time,
        status=post.status
    )
    
    # 如果狀態是已發布但沒有設定發布時間，使用當前時間
    if post.status == "published" and not hasattr(post, 'published_at'):
        from datetime import datetime
        db_post.published_at = datetime.utcnow()
    
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def update_blog_post(db: Session, post_id: int, post: BlogPostUpdate) -> Optional[BlogPost]:
    """更新部落格文章"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        return None
    
    # 更新欄位
    update_data = post.dict(exclude_unset=True)
    
    # 如果狀態改為已發布，更新發布時間
    if update_data.get('status') == 'published' and db_post.status != 'published':
        from datetime import datetime
        update_data['published_at'] = datetime.utcnow()
    
    for field, value in update_data.items():
        setattr(db_post, field, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

def delete_blog_post(db: Session, post_id: int) -> bool:
    """刪除部落格文章"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        return False
    
    db.delete(db_post)
    db.commit()
    return True

def get_blog_posts_count(db: Session) -> int:
    """取得部落格文章總數"""
    return db.query(BlogPost).count()

def search_blog_posts(db: Session, query: str, skip: int = 0, limit: int = 100) -> List[BlogPost]:
    """搜尋部落格文章"""
    search_filter = or_(
        BlogPost.title.contains(query),
        BlogPost.excerpt.contains(query),
        BlogPost.content.contains(query)
    )
    
    return (db.query(BlogPost)
            .filter(search_filter)
            .order_by(BlogPost.published_at.desc())
            .offset(skip)
            .limit(limit)
            .all())

# 作品集 CRUD 操作
def get_portfolio_items(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None
) -> List[PortfolioItem]:
    """取得作品集列表"""
    query = db.query(PortfolioItem)
    
    # 過濾條件
    filters = []
    if category:
        filters.append(PortfolioItem.category == category)
    if status:
        filters.append(PortfolioItem.status == status)
    
    if filters:
        query = query.filter(and_(*filters))
    
    # 按創建時間倒序排列
    query = query.order_by(PortfolioItem.created_at.desc())
    
    return query.offset(skip).limit(limit).all()

def get_portfolio_item(db: Session, item_id: int) -> Optional[PortfolioItem]:
    """取得單一作品"""
    return db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()

def create_portfolio_item(db: Session, item: PortfolioItemCreate) -> PortfolioItem:
    """創建作品"""
    db_item = PortfolioItem(
        title=item.title,
        description=item.description,
        full_description=item.full_description,
        technologies=item.technologies,
        category=item.category,
        status=item.status,
        date=item.date,
        live_url=item.live_url,
        github_url=item.github_url,
        features=item.features
    )
    
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_portfolio_item(db: Session, item_id: int, item: PortfolioItemUpdate) -> Optional[PortfolioItem]:
    """更新作品"""
    db_item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not db_item:
        return None
    
    # 更新欄位
    update_data = item.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_item, field, value)
    
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_portfolio_item(db: Session, item_id: int) -> bool:
    """刪除作品"""
    db_item = db.query(PortfolioItem).filter(PortfolioItem.id == item_id).first()
    if not db_item:
        return False
    
    db.delete(db_item)
    db.commit()
    return True

def get_portfolio_items_count(db: Session) -> int:
    """取得作品集項目總數"""
    return db.query(PortfolioItem).count()

def search_portfolio_items(db: Session, query: str, skip: int = 0, limit: int = 100) -> List[PortfolioItem]:
    """搜尋作品集"""
    search_filter = or_(
        PortfolioItem.title.contains(query),
        PortfolioItem.description.contains(query),
        PortfolioItem.full_description.contains(query)
    )
    
    return (db.query(PortfolioItem)
            .filter(search_filter)
            .order_by(PortfolioItem.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all())

def get_portfolio_items_by_category(db: Session, category: str) -> List[PortfolioItem]:
    """根據類別取得作品集"""
    return (db.query(PortfolioItem)
            .filter(PortfolioItem.category == category)
            .order_by(PortfolioItem.created_at.desc())
            .all())

def get_featured_portfolio_items(db: Session, limit: int = 6) -> List[PortfolioItem]:
    """取得精選作品（已完成的作品）"""
    return (db.query(PortfolioItem)
            .filter(PortfolioItem.status == "completed")
            .order_by(PortfolioItem.created_at.desc())
            .limit(limit)
            .all())

def get_published_blog_posts(db: Session, limit: int = 10) -> List[BlogPost]:
    """取得已發布的部落格文章"""
    return (db.query(BlogPost)
            .filter(BlogPost.status == "published")
            .order_by(BlogPost.published_at.desc())
            .limit(limit)
            .all())

def increment_blog_post_views(db: Session, post_id: int) -> Optional[BlogPost]:
    """增加文章瀏覽次數"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if db_post:
        db_post.views += 1
        db.commit()
        db.refresh(db_post)
    return db_post

def increment_blog_post_likes(db: Session, post_id: int) -> Optional[BlogPost]:
    """增加文章按讚數"""
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if db_post:
        db_post.likes += 1
        db.commit()
        db.refresh(db_post)
    return db_post 