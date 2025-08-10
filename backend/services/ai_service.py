import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

class LocalAIService:
    def __init__(self):
        # Support multiple local AI backends
        self.api_type = os.getenv("LOCAL_AI_TYPE", "ollama")  # ollama, localai, lmstudio
        self.base_url = os.getenv("LOCAL_AI_URL", "http://localhost:11434")  # Ollama default
        self.model_name = os.getenv("LOCAL_AI_MODEL", "llama3.2:3b")  # Lightweight model
        
        # Fallback to simple text generation if no local AI is available
        self.fallback_mode = os.getenv("AI_FALLBACK", "true").lower() == "true"
    
    def generate_text(self, prompt: str, max_tokens: int = 500) -> str:
        """
        Generate text using local AI model
        """
        try:
            if self.api_type == "ollama":
                return self._generate_ollama(prompt, max_tokens)
            elif self.api_type == "localai":
                return self._generate_localai(prompt, max_tokens)
            elif self.api_type == "lmstudio":
                return self._generate_lmstudio(prompt, max_tokens)
            else:
                return self._generate_fallback(prompt)
                
        except Exception as e:
            print(f"Error generating text with local AI: {e}")
            if self.fallback_mode:
                return self._generate_fallback(prompt)
            return "Sorry, I couldn't generate a response at the moment."
    
    def _generate_ollama(self, prompt: str, max_tokens: int) -> str:
        """Generate text using Ollama"""
        try:
            url = f"{self.base_url}/api/generate"
            data = {
                "model": self.model_name,
                "prompt": f"You are HackaTwin, an AI co-organizer for hackathons. You are helpful, professional, and enthusiastic about innovation and collaboration.\n\nUser: {prompt}\n\nHackaTwin:",
                "stream": False,
                "options": {
                    "num_predict": max_tokens,
                    "temperature": 0.7
                }
            }
            
            response = requests.post(url, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result.get("response", "").strip()
            
        except Exception as e:
            print(f"Ollama API error: {e}")
            raise
    
    def _generate_localai(self, prompt: str, max_tokens: int) -> str:
        """Generate text using LocalAI"""
        try:
            url = f"{self.base_url}/v1/chat/completions"
            data = {
                "model": self.model_name,
                "messages": [
                    {"role": "system", "content": "You are HackaTwin, an AI co-organizer for hackathons. You are helpful, professional, and enthusiastic about innovation and collaboration."},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": max_tokens,
                "temperature": 0.7
            }
            
            response = requests.post(url, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"].strip()
            
        except Exception as e:
            print(f"LocalAI API error: {e}")
            raise
    
    def _generate_lmstudio(self, prompt: str, max_tokens: int) -> str:
        """Generate text using LM Studio"""
        try:
            url = f"{self.base_url}/v1/chat/completions"
            data = {
                "model": self.model_name,
                "messages": [
                    {"role": "system", "content": "You are HackaTwin, an AI co-organizer for hackathons. You are helpful, professional, and enthusiastic about innovation and collaboration."},
                    {"role": "user", "content": prompt}
                ],
                "max_tokens": max_tokens,
                "temperature": 0.7
            }
            
            response = requests.post(url, json=data, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result["choices"][0]["message"]["content"].strip()
            
        except Exception as e:
            print(f"LM Studio API error: {e}")
            raise
    
    def _generate_fallback(self, prompt: str) -> str:
        """
        Fallback text generation using simple templates
        """
        # Simple template-based responses for common hackathon scenarios
        fallback_responses = {
            "outreach": "Thank you for your interest in our hackathon! We're excited to have innovators like you join our community. Our event brings together passionate developers, designers, and entrepreneurs to create amazing solutions. Please register at our website to secure your spot!",
            
            "team": "Great question about team formation! Teams typically work best with 3-4 members with complementary skills. We recommend having at least one developer, one designer, and one person with domain expertise. Don't worry if you're coming solo - we'll have team formation sessions to help you find the perfect teammates!",
            
            "challenge": "This hackathon challenge focuses on creating innovative solutions that make a positive impact. Participants should develop working prototypes that address real-world problems. Judging criteria include innovation, technical implementation, user experience, and potential for real-world impact.",
            
            "sponsor": "We're excited to partner with forward-thinking companies like yours! Our hackathon provides excellent exposure to top talent and innovative solutions. Sponsorship benefits include brand visibility, talent recruitment opportunities, and direct engagement with the developer community.",
            
            "agenda": "Our hackathon features an exciting schedule including opening ceremonies, technical workshops, mentorship sessions, team formation, development time, project presentations, and awards ceremony. We've designed the agenda to maximize creativity and collaboration while ensuring participants have the support they need.",
            
            "speaker": "Thank you for considering speaking at our hackathon! We're looking for industry experts who can inspire and educate our participants. Your talk would be a valuable addition to our program and would help participants learn about the latest trends and technologies in the field."
        }
        
        # Try to match the prompt to a category
        prompt_lower = prompt.lower()
        for category, response in fallback_responses.items():
            if category in prompt_lower:
                return response
        
        # Default response
        return "Thank you for reaching out! We're excited about your interest in our hackathon. Our team will get back to you soon with more details. In the meantime, feel free to check out our website for the latest updates and information."

# Create a global instance
ai_service = LocalAIService()

def generate_text(prompt: str, max_tokens: int = 500) -> str:
    """
    Global helper function for generating text
    """
    return ai_service.generate_text(prompt, max_tokens)
