#!/usr/bin/env python3
"""
Complete test script for HackaTwin API with Local AI and Email
"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"🔍 Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"✅ Server is healthy: {response.json()}")
            return True
        else:
            print(f"❌ Health check failed: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Health check error: {e}")
        return False

def test_local_ai():
    """Test local AI integration"""
    try:
        print(f"\n🤖 Testing Local AI Integration...")
        data = {
            "question": "How do I form a team for the hackathon?"
        }
        response = requests.post(f"{BASE_URL}/answer_question", json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Local AI working!")
            print(f"📝 Question: {result['question']}")
            print(f"🤖 Answer: {result['answer'][:200]}...")
            print(f"⏰ Timestamp: {result['timestamp']}")
            return True
        else:
            print(f"❌ Local AI test failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Local AI test error: {e}")
        return False

def test_email_functionality():
    """Test email sending capability"""
    try:
        print(f"\n📧 Testing Email Functionality...")
        data = {
            "name": "Test User",
            "email": "vtu21413@veltech.edu.in",  # Send to yourself for testing
            "country": "India"
        }
        response = requests.post(f"{BASE_URL}/onboard_member", json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Email functionality working!")
            print(f"📝 Message: {result['message']}")
            print(f"📧 Email status: {result.get('email_status', 'N/A')}")
            print(f"💬 Slack status: {result.get('slack_status', 'N/A')}")
            return True
        else:
            print(f"❌ Email test failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Email test error: {e}")
        return False

def test_outreach_with_ai_and_email():
    """Test the complete outreach flow with AI generation and email sending"""
    try:
        print(f"\n🚀 Testing Complete Outreach Flow (AI + Email)...")
        data = {
            "custom_message": "Join our amazing AI-focused hackathon!"
        }
        response = requests.post(f"{BASE_URL}/outreach", json=data, timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Complete outreach flow working!")
            print(f"📝 Message: {result['message']}")
            print(f"📊 Results: {len(result.get('results', []))} outreach emails processed")
            
            # Show first result details
            if result.get('results'):
                first_result = result['results'][0]
                print(f"📧 First email - Name: {first_result.get('name')}")
                print(f"📧 First email - Status: {first_result.get('status')}")
            
            return True
        else:
            print(f"❌ Outreach test failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Outreach test error: {e}")
        return False

def test_agenda_generation():
    """Test AI-powered agenda generation"""
    try:
        print(f"\n📋 Testing AI Agenda Generation...")
        data = {
            "event_name": "AI Innovation Hackathon 2025",
            "days": 2,
            "tracks": ["AI/ML", "Web Development", "Mobile Apps", "Blockchain"]
        }
        response = requests.post(f"{BASE_URL}/generate_agenda", json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Agenda generation working!")
            print(f"📝 Message: {result['message']}")
            print(f"📋 Agenda preview: {result['agenda'][:300]}...")
            return True
        else:
            print(f"❌ Agenda generation failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Agenda generation error: {e}")
        return False

def run_comprehensive_tests():
    """Run all tests in sequence"""
    print("🧪 HackaTwin API - Comprehensive Integration Tests")
    print("=" * 60)
    print(f"🕐 Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    tests = [
        ("Server Health Check", test_health),
        ("Local AI Integration", test_local_ai),
        ("Email Functionality", test_email_functionality),
        ("AI Agenda Generation", test_agenda_generation),
        ("Complete Outreach Flow", test_outreach_with_ai_and_email),
    ]
    
    passed = 0
    total = len(tests)
    results = []
    
    for test_name, test_func in tests:
        print(f"\n🔄 Running: {test_name}")
        print("-" * 40)
        try:
            if test_func():
                print(f"✅ {test_name} - PASSED")
                passed += 1
                results.append((test_name, "PASSED"))
            else:
                print(f"❌ {test_name} - FAILED")
                results.append((test_name, "FAILED"))
        except Exception as e:
            print(f"💥 {test_name} - ERROR: {e}")
            results.append((test_name, "ERROR"))
    
    # Final summary
    print("\n" + "=" * 60)
    print("🎯 TEST SUMMARY")
    print("=" * 60)
    
    for test_name, status in results:
        icon = "✅" if status == "PASSED" else "❌" if status == "FAILED" else "💥"
        print(f"{icon} {test_name}: {status}")
    
    print(f"\n📊 Overall Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED! Your HackaTwin API is fully operational!")
        print("🚀 Features confirmed working:")
        print("   • Local AI (Ollama + qwen2:1.5b)")
        print("   • Gmail SMTP email sending")
        print("   • AI-powered content generation")
        print("   • Complete hackathon automation workflows")
    elif passed > total // 2:
        print("⚠️  Most tests passed. Check failed tests above.")
    else:
        print("🔴 Many tests failed. Please check your configuration:")
        print("   • Ensure Ollama is running: 'ollama serve'")
        print("   • Check your .env file settings")
        print("   • Verify email credentials")
    
    print(f"\n🕐 Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    run_comprehensive_tests()
