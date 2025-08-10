import requests
import json

# Test the answer_question endpoint
response = requests.post(
    "http://localhost:8000/answer_question",
    json={"question": "How do I register for the hackathon?"},
    timeout=30
)

if response.status_code == 200:
    result = response.json()
    print("✅ LOCAL AI TEST SUCCESSFUL!")
    print(f"Question: {result['question']}")
    print(f"Answer: {result['answer']}")
    print(f"Timestamp: {result['timestamp']}")
else:
    print(f"❌ Test failed: {response.status_code}")
    print(response.text)
