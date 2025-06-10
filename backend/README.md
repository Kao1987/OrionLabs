# Orion 個人品牌網站後端 API

基於 FastAPI + MySQL 的個人品牌網站後端管理系統

## 功能特色

- 🔐 JWT 認證系統
- 📝 部落格文章管理（CRUD）
- 🎯 作品集管理（CRUD）
- 📊 管理後台統計
- 🔍 文章分類與搜尋
- 📱 RESTful API 設計
- 🗄️ MySQL 資料庫

## 技術架構

- **Framework**: FastAPI 0.104.1
- **Database**: MySQL + SQLAlchemy
- **Authentication**: JWT (python-jose)
- **Password**: bcrypt 加密
- **CORS**: 支援跨域請求

## 安裝與設定

### 1. 環境需求

- Python 3.8+
- MySQL 8.0+

### 2. 安裝依賴

```bash
cd backend
pip install -r requirements.txt
```

### 3. 資料庫設定

建立 MySQL 資料庫：

```sql
CREATE DATABASE orion_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. 環境變數設定

複製環境變數範例檔案：

```bash
cp env.example .env
```

編輯 `.env` 檔案：

```env
# 資料庫配置
DATABASE_URL=mysql+pymysql://your_username:your_password@localhost:3306/orion_blog

# JWT 配置
SECRET_KEY=your-super-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# 管理員帳號
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# 伺服器配置
HOST=0.0.0.0
PORT=8000
DEBUG=True
```

### 5. 啟動服務

```bash
python main.py
```

或使用 uvicorn：

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API 文件

啟動服務後訪問：

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API 端點

### 認證
- `POST /auth/login` - 管理員登入
- `GET /auth/me` - 取得使用者資訊

### 部落格
- `GET /api/blog` - 取得文章列表
- `GET /api/blog/{id}` - 取得單一文章
- `POST /api/blog` - 建立文章 (需認證)
- `PUT /api/blog/{id}` - 更新文章 (需認證)
- `DELETE /api/blog/{id}` - 刪除文章 (需認證)

### 作品集
- `GET /api/portfolio` - 取得作品列表
- `GET /api/portfolio/{id}` - 取得單一作品
- `POST /api/portfolio` - 建立作品 (需認證)
- `PUT /api/portfolio/{id}` - 更新作品 (需認證)
- `DELETE /api/portfolio/{id}` - 刪除作品 (需認證)

### 統計
- `GET /api/stats` - 取得統計數據 (需認證)

## 資料表結構

### blog_posts 表
- `id` - 主鍵
- `title` - 文章標題
- `excerpt` - 摘要
- `content` - 內容
- `category` - 分類
- `tags` - 標籤 (JSON)
- `author` - 作者
- `status` - 狀態 (draft/published)
- `published_at` - 發布時間
- `read_time` - 閱讀時間
- `views` - 瀏覽次數
- `likes` - 按讚數

### portfolio_items 表
- `id` - 主鍵
- `title` - 作品標題
- `description` - 簡短描述
- `full_description` - 詳細描述
- `technologies` - 使用技術 (JSON)
- `category` - 類別 (web/mobile/design/backend)
- `status` - 狀態 (in_progress/completed)
- `date` - 完成日期
- `live_url` - 專案網址
- `github_url` - GitHub 網址
- `features` - 專案特色 (JSON)

## 開發指引

### 新增 API 端點

1. 在 `models.py` 定義資料模型
2. 在 `schemas.py` 定義 Pydantic schemas
3. 在 `crud.py` 實作資料庫操作
4. 在 `main.py` 新增路由

### 資料庫遷移

如需修改資料表結構，建議使用 Alembic：

```bash
# 安裝 alembic
pip install alembic

# 初始化
alembic init alembic

# 生成遷移檔案
alembic revision --autogenerate -m "Add new table"

# 執行遷移
alembic upgrade head
```

## 部署

### Docker 部署

```dockerfile
FROM python:3.9

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

### 生產環境設定

1. 修改 `.env` 中的 `DEBUG=False`
2. 使用強密碼設定 `SECRET_KEY`
3. 配置 HTTPS
4. 設定資料庫連接池
5. 配置日誌記錄

## 故障排除

### 常見問題

1. **資料庫連接失敗**
   - 檢查 MySQL 服務是否啟動
   - 確認 DATABASE_URL 設定正確
   - 檢查防火牆設定

2. **認證失敗**
   - 確認 SECRET_KEY 設定
   - 檢查管理員帳號密碼

3. **CORS 錯誤**
   - 檢查前端網址是否在 CORS 白名單中

## 授權

MIT License 