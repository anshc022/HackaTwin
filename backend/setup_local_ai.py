#!/usr/bin/env python3
"""
Setup script for local AI models with HackaTwin
"""

import os
import subprocess
import requests
import platform
import zipfile
import shutil
from pathlib import Path

def download_file(url: str, filename: str):
    """Download a file from URL"""
    print(f"📥 Downloading {filename}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()
    
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)
    print(f"✅ Downloaded {filename}")

def install_ollama_windows():
    """Install Ollama on Windows"""
    try:
        print("🔍 Checking if Ollama is already installed...")
        result = subprocess.run(["ollama", "--version"], capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Ollama is already installed!")
            return True
    except FileNotFoundError:
        pass
    
    print("📥 Downloading Ollama for Windows...")
    ollama_url = "https://ollama.com/download/OllamaSetup.exe"
    
    try:
        download_file(ollama_url, "OllamaSetup.exe")
        print("🚀 Please run OllamaSetup.exe to install Ollama, then restart this script.")
        print("💡 After installation, Ollama will start automatically.")
        return False
    except Exception as e:
        print(f"❌ Error downloading Ollama: {e}")
        return False

def setup_ollama_model():
    """Download and setup a lightweight model"""
    models = [
        ("llama3.2:3b", "Llama 3.2 3B - Fast and efficient (2GB)"),
        ("phi3:mini", "Phi-3 Mini - Microsoft's lightweight model (2.3GB)"),
        ("qwen2:1.5b", "Qwen2 1.5B - Very fast and small (0.9GB)"),
        ("gemma2:2b", "Gemma 2 2B - Google's efficient model (1.6GB)")
    ]
    
    print("\n🤖 Available Local AI Models:")
    for i, (model, description) in enumerate(models, 1):
        print(f"  {i}. {description}")
    
    try:
        choice = input("\nSelect a model (1-4) or press Enter for default (1): ").strip()
        if not choice:
            choice = "1"
        
        model_index = int(choice) - 1
        if 0 <= model_index < len(models):
            selected_model, description = models[model_index]
            print(f"\n📦 Installing {description}...")
            
            # Pull the model using Ollama
            result = subprocess.run(["ollama", "pull", selected_model], 
                                  capture_output=True, text=True)
            
            if result.returncode == 0:
                print(f"✅ Successfully installed {selected_model}")
                
                # Update .env file with the selected model
                update_env_model(selected_model)
                return True
            else:
                print(f"❌ Error installing model: {result.stderr}")
                return False
        else:
            print("❌ Invalid selection")
            return False
            
    except ValueError:
        print("❌ Invalid input")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def update_env_model(model_name: str):
    """Update .env file with selected model"""
    env_path = ".env"
    if os.path.exists(env_path):
        with open(env_path, 'r') as f:
            content = f.read()
        
        # Update the model name
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.startswith('LOCAL_AI_MODEL='):
                lines[i] = f'LOCAL_AI_MODEL={model_name}'
                break
        
        with open(env_path, 'w') as f:
            f.write('\n'.join(lines))
        
        print(f"✅ Updated .env with model: {model_name}")

def test_local_ai():
    """Test the local AI setup"""
    try:
        print("\n🧪 Testing local AI connection...")
        
        # Test Ollama API
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2:3b",
                "prompt": "Hello, this is a test. Please respond briefly.",
                "stream": False
            },
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            test_response = result.get("response", "").strip()
            print(f"✅ Local AI is working! Response: {test_response[:100]}...")
            return True
        else:
            print(f"❌ API test failed with status: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Local AI test failed: {e}")
        print("💡 Make sure Ollama is running. Try: 'ollama serve'")
        return False

def start_ollama_service():
    """Start Ollama service"""
    try:
        print("🚀 Starting Ollama service...")
        if platform.system() == "Windows":
            # On Windows, Ollama usually starts automatically
            subprocess.Popen(["ollama", "serve"], creationflags=subprocess.CREATE_NEW_CONSOLE)
        else:
            subprocess.Popen(["ollama", "serve"])
        
        print("✅ Ollama service started")
        return True
    except Exception as e:
        print(f"❌ Error starting Ollama: {e}")
        return False

def main():
    print("🤖 HackaTwin Local AI Setup")
    print("=" * 40)
    
    system = platform.system()
    
    if system == "Windows":
        if not install_ollama_windows():
            print("\n⏳ Please install Ollama manually and run this script again.")
            print("📝 Instructions:")
            print("   1. Download from: https://ollama.com/download")
            print("   2. Run the installer")
            print("   3. Restart this script")
            return
    else:
        print("🐧 For Linux/Mac, install Ollama with:")
        print("   curl -fsSL https://ollama.com/install.sh | sh")
        return
    
    # Start Ollama service
    start_ollama_service()
    
    # Wait a moment for service to start
    import time
    print("⏳ Waiting for Ollama service to start...")
    time.sleep(5)
    
    # Setup model
    if setup_ollama_model():
        # Test the setup
        if test_local_ai():
            print("\n🎉 Local AI setup complete!")
            print("🚀 You can now run your HackaTwin API with local AI.")
            print("📝 Run: python start_server.py")
        else:
            print("\n⚠️  Setup completed but testing failed.")
            print("💡 Try restarting Ollama: 'ollama serve'")
    else:
        print("\n❌ Model setup failed. Please try again.")

if __name__ == "__main__":
    main()
