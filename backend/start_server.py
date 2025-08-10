#!/usr/bin/env python3
"""
Startup script for HackaTwin API
"""

import uvicorn
import os
from pathlib import Path

def setup_environment():
    """Setup required directories and files"""
    # Create directories
    directories = ["data", "logs", "services"]
    for dir_name in directories:
        Path(dir_name).mkdir(exist_ok=True)
        print(f"✅ Directory '{dir_name}' ready")
    
    # Check for .env file
    if not os.path.exists(".env"):
        print("⚠️  .env file not found. Please copy .env.example to .env and configure your API keys.")
        return False
    
    print("✅ Environment setup complete")
    return True

def main():
    print("🚀 Starting HackaTwin API Server")
    print("=" * 40)
    
    if not setup_environment():
        print("❌ Environment setup failed. Please check your configuration.")
        return
    
    print("\n📡 Starting FastAPI server...")
    print("🌐 API will be available at: http://localhost:8000")
    print("📚 API Documentation at: http://localhost:8000/docs")
    print("\n⌨️  Press Ctrl+C to stop the server")
    
    try:
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            reload_dirs=[".", "services"],
            log_level="info"
        )
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    main()
