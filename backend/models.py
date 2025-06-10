from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Enum
from sqlalchemy.sql import func
from database import Base
import enum

class PostStatus(str, enum.Enum):
    draft = "draft"
    published = "published"

class ProjectStatus(str, enum.Enum):
    in_progress = "in_progress"
    completed = "completed"

class ProjectCategory(str, enum.Enum):
    web = "web"
    mobile = "mobile"
    design = "design"
    backend = "backend"

class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    excerpt = Column(Text, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String(100), nullable=False, index=True)
    tags = Column(JSON, default=list)
    author = Column(String(100), nullable=False, default="Orion")
    status = Column(Enum(PostStatus), default=PostStatus.draft, index=True)
    published_at = Column(DateTime(timezone=True), default=func.now())
    read_time = Column(Integer, default=5)
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class PortfolioItem(Base):
    __tablename__ = "portfolio_items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    full_description = Column(Text, nullable=False)
    technologies = Column(JSON, default=list)
    category = Column(Enum(ProjectCategory), nullable=False, index=True)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.completed, index=True)
    date = Column(String(10), nullable=False)  # YYYY-MM-DD 格式
    live_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    features = Column(JSON, default=list)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 