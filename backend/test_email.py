import requests
import json

# Test email functionality
response = requests.post(
    "http://localhost:8000/onboard_member",
    json={
        "name": "Test User",
        "email": "vtu21413@veltech.edu.in",
        "country": "India"
    },
    timeout=30
)

if response.status_code == 200:
    result = response.json()
    print("✅ EMAIL TEST SUCCESSFUL!")
    print(f"Message: {result['message']}")
    print(f"Email Status: {result.get('email_status', 'N/A')}")
else:
    print(f"❌ Email test failed: {response.status_code}")
    print(response.text)
