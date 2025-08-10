"""
Database initialization script for HackaTwin
Run this script to set up the database and migrate existing data
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database.utils import create_tables, migrate_json_to_db

def init_database():
    """Initialize the database with tables and migrate existing data"""
    print("🚀 Initializing HackaTwin Database...")
    
    # Create tables
    print("📊 Creating database tables...")
    create_tables()
    print("✅ Database tables created successfully!")
    
    # Migrate existing JSON data
    print("📦 Migrating existing JSON data to database...")
    migrate_json_to_db()
    
    print("🎉 Database initialization complete!")
    print("💡 You can now use the database-powered API endpoints!")

if __name__ == "__main__":
    init_database()
