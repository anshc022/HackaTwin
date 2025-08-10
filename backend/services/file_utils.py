import json
import os
from pathlib import Path
from datetime import datetime
from typing import List, Dict, Any

def ensure_directory_exists(directory: str):
    """Ensure a directory exists, create if it doesn't"""
    Path(directory).mkdir(parents=True, exist_ok=True)

def load_json_file(file_path: str) -> List[Dict]:
    """Load JSON file, return empty list if file doesn't exist"""
    if not os.path.exists(file_path):
        # Create directory if it doesn't exist
        directory = os.path.dirname(file_path)
        ensure_directory_exists(directory)
        # Create empty file
        save_json_file(file_path, [])
        return []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def save_json_file(file_path: str, data: Any):
    """Save data to JSON file"""
    directory = os.path.dirname(file_path)
    ensure_directory_exists(directory)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def append_to_json_file(file_path: str, new_data: Dict):
    """Append new data to JSON file"""
    current_data = load_json_file(file_path)
    
    # Add timestamp if not present
    if 'timestamp' not in new_data:
        new_data['timestamp'] = datetime.now().isoformat()
    
    current_data.append(new_data)
    save_json_file(file_path, current_data)

def get_current_timestamp() -> str:
    """Get current timestamp in ISO format"""
    return datetime.now().isoformat()
