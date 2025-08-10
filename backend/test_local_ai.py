import requests
import json

def test_local_ai():
    """Test the local AI endpoint"""
    url = "http://localhost:8000/answer_question"
    data = {"question": "How do I form a team for the hackathon?"}
    
    try:
        response = requests.post(url, json=data, timeout=10)
        if response.status_code == 200:
            result = response.json()
            print("✅ API Response:")
            print(f"Question: {result['question']}")
            print(f"Answer: {result['answer']}")
            print(f"Timestamp: {result['timestamp']}")
        else:
            print(f"❌ API Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Connection Error: {e}")

if __name__ == "__main__":
    test_local_ai()
