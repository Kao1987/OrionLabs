from pydantic import BaseModel, Field, validator
from typing import List, Optional
from datetime import datetime

# 認證相關 Schema
class LoginRequest(BaseModel):
    username: str = Field(..., min_length=1, description="用戶名")
    password: str = Field(..., min_length=1, description="密碼")

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    username: str
    role: str

# 部落格相關 Schema
class BlogPostBase(BaseModel):
    title: str = Field(..., max_length=255, description="文章標題")
    excerpt: str = Field(..., description="文章摘要")
    content: str = Field(..., description="文章內容")
    category: str = Field(..., max_length=100, description="文章分類")
    tags: List[str] = Field(default=[], description="文章標籤")
    read_time: int = Field(default=5, ge=1, description="閱讀時間（分鐘）")
    status: str = Field(default="draft", description="文章狀態")

    @validator('status')
    def validate_status(cls, v):
        if v not in ['draft', 'published']:
            raise ValueError('狀態必須是 draft 或 published')
        return v

    @validator('title')
    def validate_title(cls, v):
        if not v.strip():
            raise ValueError('標題不能為空')
        return v.strip()

    @validator('tags')
    def validate_tags(cls, v):
        # 過濾空字串並去除空白
        return [tag.strip() for tag in v if tag.strip()]

class BlogPostCreate(BlogPostBase):
    author: str = Field(default="Orion", description="作者")

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255, description="文章標題")
    excerpt: Optional[str] = Field(None, description="文章摘要")
    content: Optional[str] = Field(None, description="文章內容")
    category: Optional[str] = Field(None, max_length=100, description="文章分類")
    tags: Optional[List[str]] = Field(None, description="文章標籤")
    read_time: Optional[int] = Field(None, ge=1, description="閱讀時間（分鐘）")
    status: Optional[str] = Field(None, description="文章狀態")

    @validator('status')
    def validate_status(cls, v):
        if v is not None and v not in ['draft', 'published']:
            raise ValueError('狀態必須是 draft 或 published')
        return v

    @validator('title')
    def validate_title(cls, v):
        if v is not None and not v.strip():
            raise ValueError('標題不能為空')
        return v.strip() if v else v

    @validator('tags')
    def validate_tags(cls, v):
        if v is not None:
            return [tag.strip() for tag in v if tag.strip()]
        return v

class BlogPostResponse(BlogPostBase):
    id: int
    author: str
    published_at: datetime
    views: int = 0
    likes: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# 作品集相關 Schema
class PortfolioItemBase(BaseModel):
    title: str = Field(..., max_length=255, description="作品標題")
    description: str = Field(..., description="簡短描述")
    full_description: str = Field(..., description="詳細描述")
    technologies: List[str] = Field(..., description="使用技術")
    category: str = Field(..., description="作品類別")
    status: str = Field(default="completed", description="作品狀態")
    date: str = Field(..., description="完成日期 (YYYY-MM-DD)")
    live_url: Optional[str] = Field(None, description="專案網址")
    github_url: Optional[str] = Field(None, description="GitHub 網址")
    features: List[str] = Field(default=[], description="專案特色")

    @validator('category')
    def validate_category(cls, v):
        if v not in ['web', 'mobile', 'design', 'backend']:
            raise ValueError('類別必須是 web, mobile, design 或 backend')
        return v

    @validator('status')
    def validate_status(cls, v):
        if v not in ['in_progress', 'completed']:
            raise ValueError('狀態必須是 in_progress 或 completed')
        return v

    @validator('date')
    def validate_date(cls, v):
        try:
            datetime.strptime(v, '%Y-%m-%d')
        except ValueError:
            raise ValueError('日期格式必須是 YYYY-MM-DD')
        return v

    @validator('title')
    def validate_title(cls, v):
        if not v.strip():
            raise ValueError('標題不能為空')
        return v.strip()

    @validator('technologies')
    def validate_technologies(cls, v):
        if not v:
            raise ValueError('至少要填入一項技術')
        return [tech.strip() for tech in v if tech.strip()]

    @validator('features')
    def validate_features(cls, v):
        return [feature.strip() for feature in v if feature.strip()]

class PortfolioItemCreate(PortfolioItemBase):
    pass

class PortfolioItemUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255, description="作品標題")
    description: Optional[str] = Field(None, description="簡短描述")
    full_description: Optional[str] = Field(None, description="詳細描述")
    technologies: Optional[List[str]] = Field(None, description="使用技術")
    category: Optional[str] = Field(None, description="作品類別")
    status: Optional[str] = Field(None, description="作品狀態")
    date: Optional[str] = Field(None, description="完成日期 (YYYY-MM-DD)")
    live_url: Optional[str] = Field(None, description="專案網址")
    github_url: Optional[str] = Field(None, description="GitHub 網址")
    features: Optional[List[str]] = Field(None, description="專案特色")

    @validator('category')
    def validate_category(cls, v):
        if v is not None and v not in ['web', 'mobile', 'design', 'backend']:
            raise ValueError('類別必須是 web, mobile, design 或 backend')
        return v

    @validator('status')
    def validate_status(cls, v):
        if v is not None and v not in ['in_progress', 'completed']:
            raise ValueError('狀態必須是 in_progress 或 completed')
        return v

    @validator('date')
    def validate_date(cls, v):
        if v is not None:
            try:
                datetime.strptime(v, '%Y-%m-%d')
            except ValueError:
                raise ValueError('日期格式必須是 YYYY-MM-DD')
        return v

    @validator('title')
    def validate_title(cls, v):
        if v is not None and not v.strip():
            raise ValueError('標題不能為空')
        return v.strip() if v else v

    @validator('technologies')
    def validate_technologies(cls, v):
        if v is not None:
            if not v:
                raise ValueError('至少要填入一項技術')
            return [tech.strip() for tech in v if tech.strip()]
        return v

    @validator('features')
    def validate_features(cls, v):
        if v is not None:
            return [feature.strip() for feature in v if feature.strip()]
        return v

class PortfolioItemResponse(PortfolioItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# 統計相關 Schema
class StatsResponse(BaseModel):
    blogPosts: int = Field(..., description="部落格文章數量")
    portfolioItems: int = Field(..., description="作品集項目數量") 