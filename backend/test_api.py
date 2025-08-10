#!/usr/bin/env python3
"""
Test script for HackaTwin API endpoints
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    response = requests.get(f"{BASE_URL}/health")
    print(f"Health check: {response.status_code} - {response.json()}")
    return response.status_code == 200

def test_answer_question():
    """Test answer question endpoint"""
    data = {
        "question": "How do I form a team for the hackathon?"
    }
    response = requests.post(f"{BASE_URL}/answer_question", json=data)
    print(f"Answer question: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Answer: {result['answer'][:100]}...")
    return response.status_code == 200

def test_generate_agenda():
    """Test agenda generation"""
    data = {
        "event_name": "AI Innovation Hackathon",
        "days": 2,
        "tracks": ["AI/ML", "Web Development", "Mobile Apps"]
    }
    response = requests.post(f"{BASE_URL}/generate_agenda", json=data)
    print(f"Generate agenda: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Agenda generated successfully")
    return response.status_code == 200

def test_generate_challenge():
    """Test challenge generation"""
    data = {
        "theme": "Sustainable Technology",
        "difficulty": "intermediate",
        "audience": "university students"
    }
    response = requests.post(f"{BASE_URL}/generate_challenge", json=data)
    print(f"Generate challenge: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Challenge generated successfully")
    return response.status_code == 200

def test_onboard_member():
    """Test member onboarding"""
    data = {
        "name": "Test User",
        "email": "test@example.com",
        "country": "TestLand"
    }
    response = requests.post(f"{BASE_URL}/onboard_member", json=data)
    print(f"Onboard member: {response.status_code}")
    return response.status_code == 200

def run_tests():
    """Run all tests"""
    print("🧪 Running HackaTwin API Tests\n")
    
    tests = [
        ("Health Check", test_health),
        ("Answer Question", test_answer_question),
        ("Generate Agenda", test_generate_agenda),
        ("Generate Challenge", test_generate_challenge),
        ("Onboard Member", test_onboard_member),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n📋 Testing {test_name}...")
        try:
            if test_func():
                print(f"✅ {test_name} passed")
                passed += 1
            else:
                print(f"❌ {test_name} failed")
        except Exception as e:
            print(f"❌ {test_name} failed with error: {e}")
    
    print(f"\n🎯 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! API is working correctly.")
    else:
        print("⚠️  Some tests failed. Check your configuration and try again.")

if __name__ == "__main__":
    run_tests()
