#!/usr/bin/env python3
"""
管理員帳號創建腳本
用於在 GCP MySQL 中創建加密密碼的管理員帳號
"""

import os
import sys
from getpass import getpass
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from passlib.context import CryptContext
from dotenv import load_dotenv

# 設定資料庫連線
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

# 載入環境變數
load_dotenv()

# 密碼加密設定
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(username: str):
    """從資料庫取得用戶資訊"""
    session = Session()
    try:
        result = session.execute(
            text("SELECT id, username, password_hash,email,role FROM users WHERE username = :username"),
            {"username": username}
        )
        user_data = result.fetchone()
        if user_data:
            return {
                "id": user_data[0],
                "username": user_data[1],
                "password_hash": user_data[2],
                "email": user_data[3],
                "role": user_data[4]
            }
        else:
            return None
    except Exception as e:
        print(f"❌ 查詢失敗: {e}")
        return None
    finally:
        session.close()

def create_admin_user():
    """創建管理員用戶"""
    
    # 取得資料庫連線
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ 錯誤: 請在 .env 檔案中設定 DATABASE_URL")
        sys.exit(1)
    
    try:
        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        print("🔐 創建管理員帳號")
        print("=" * 50)
        
        # 輸入帳號資訊
        username = input("請輸入管理員帳號: ").strip()
        if not username:
            print("❌ 帳號不能為空")
            return
        
        # 檢查帳號是否已存在
        result = session.execute(
            text("SELECT id FROM users WHERE username = :username"), 
            {"username": username}
        )
        if result.fetchone():
            print(f"❌ 帳號 '{username}' 已經存在")
            return
        
        # 輸入密碼
        while True:
            password = getpass("請輸入密碼: ")
            password_confirm = getpass("請再次確認密碼: ")
            
            if password != password_confirm:
                print("❌ 密碼不一致，請重新輸入")
                continue
                
            if len(password) < 8:
                print("❌ 密碼至少需要8個字元")
                continue
                
            # 檢查密碼強度
            has_upper = any(c.isupper() for c in password)
            has_lower = any(c.islower() for c in password)
            has_digit = any(c.isdigit() for c in password)
            
            if not (has_upper and has_lower and has_digit):
                print("❌ 密碼必須包含大寫字母、小寫字母和數字")
                continue
                
            break
        
        # 輸入email（可選）
        email = input("請輸入Email (可選): ").strip()
        if email and "@" not in email:
            print("❌ Email格式不正確")
            return
        
        # 選擇角色
        print("\n選擇角色:")
        print("1. admin (管理員)")
        print("2. editor (編輯者)")
        role_choice = input("請選擇 (1 或 2): ").strip()
        role = "admin" if role_choice == "1" else "editor"
        
        # 加密密碼
        password_hash = pwd_context.hash(password)
        
        # 插入用戶
        insert_sql = """
        INSERT INTO users (username, password_hash, email, role)
        VALUES (:username, :password_hash, :email, :role)
        """
        
        session.execute(text(insert_sql), {
            "username": username,
            "password_hash": password_hash,
            "email": email if email else None,
            "role": role
        })
        
        session.commit()
        session.close()
        
        print(f"\n✅ 管理員帳號 '{username}' 創建成功！")
        print(f"   角色: {role}")
        print(f"   Email: {email if email else '未設定'}")
        print(f"   密碼已使用 bcrypt 加密存儲")
        
    except Exception as e:
        print(f"❌ 創建失敗: {e}")
        sys.exit(1)

def list_users():
    """列出所有用戶"""
    database_url = os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ 錯誤: 請在 .env 檔案中設定 DATABASE_URL")
        return
    
    try:
        engine = create_engine(database_url)
        Session = sessionmaker(bind=engine)
        session = Session()
        
        result = session.execute(text("""
            SELECT id, username, email, role, created_at 
            FROM users 
            ORDER BY created_at DESC
        """))
        
        users = result.fetchall()
        
        print("\n👥 現有用戶列表")
        print("=" * 80)
        print(f"{'ID':<4} {'用戶名':<15} {'Email':<25} {'角色':<8} {'創建時間'}")
        print("-" * 80)
        
        for user in users:
            print(f"{user[0]:<4} {user[1]:<15} {user[2] or '未設定':<25} {user[3]:<8} {user[4]}")
        
        session.close()
        
    except Exception as e:
        print(f"❌ 查詢失敗: {e}")

def main():
    """主函數"""
    print("🚀 Orion 用戶管理工具")
    print("=" * 50)
    print("1. 創建新的管理員帳號")
    print("2. 列出所有用戶")
    print("3. 退出")
    
    while True:
        choice = input("\n請選擇功能 (1-3): ").strip()
        
        if choice == "1":
            create_admin_user()
        elif choice == "2":
            list_users()
        elif choice == "3":
            print("👋 再見！")
            break
        else:
            print("❌ 無效選擇，請輸入 1-3")

if __name__ == "__main__":
    main()