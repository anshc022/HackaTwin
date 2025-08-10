import os
import requests
import json
from dotenv import load_dotenv

load_dotenv()

class OfflineAIService:
    """
    Completely offline AI service using Hugging Face Transformers
    """
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = "cpu"  # Use CPU for compatibility
        
        try:
            self._load_model()
        except Exception as e:
            print(f"Could not load offline model: {e}")
            print("Falling back to template responses...")
            self.model = None

    def _load_model(self):
        """Load a lightweight local model"""
        try:
            from transformers import AutoTokenizer, AutoModelForCausalLM
            import torch
            
            # Use a very lightweight model
            model_name = "microsoft/DialoGPT-small"  # ~230MB
            # Alternative: "distilgpt2" (~330MB) or "gpt2" (~500MB)
            
            print(f"Loading offline AI model: {model_name}")
            self.tokenizer = AutoTokenizer.from_pretrained(model_name)
            self.model = AutoModelForCausalLM.from_pretrained(model_name)
            
            # Add padding token if not present
            if self.tokenizer.pad_token is None:
                self.tokenizer.pad_token = self.tokenizer.eos_token
            
            print("✅ Offline AI model loaded successfully!")
            
        except ImportError:
            print("⚠️  Transformers library not installed. Install with: pip install transformers torch")
            raise
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise

    def generate_text(self, prompt: str, max_tokens: int = 200) -> str:
        """Generate text using the offline model"""
        if self.model is None:
            return self._get_template_response(prompt)
        
        try:
            # Prepare the input
            system_prompt = "You are HackaTwin, an AI assistant for hackathons. Be helpful and enthusiastic.\n"
            full_prompt = f"{system_prompt}Human: {prompt}\nHackaTwin:"
            
            # Tokenize
            inputs = self.tokenizer.encode(full_prompt, return_tensors="pt", max_length=512, truncation=True)
            
            # Generate
            with torch.no_grad():
                outputs = self.model.generate(
                    inputs,
                    max_length=inputs.shape[1] + min(max_tokens, 100),  # Limit output length
                    num_return_sequences=1,
                    temperature=0.7,
                    do_sample=True,
                    pad_token_id=self.tokenizer.eos_token_id
                )
            
            # Decode and clean up
            response = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
            
            # Extract only the generated part
            response = response[len(full_prompt):].strip()
            
            # Clean up common issues
            if not response or len(response) < 10:
                return self._get_template_response(prompt)
            
            return response
            
        except Exception as e:
            print(f"Error with offline generation: {e}")
            return self._get_template_response(prompt)

    def _get_template_response(self, prompt: str) -> str:
        """Fallback template responses"""
        prompt_lower = prompt.lower()
        
        if any(word in prompt_lower for word in ["outreach", "invite", "join", "participate"]):
            return """Thank you for your interest in our hackathon! We're excited to have passionate innovators like you join our community. 

Our hackathon brings together developers, designers, and entrepreneurs to create amazing solutions over an intensive weekend. You'll have access to mentors, workshops, and the opportunity to win exciting prizes!

Please visit our registration page to secure your spot. We can't wait to see what you'll build! 🚀"""

        elif any(word in prompt_lower for word in ["team", "group", "collaborate", "partner"]):
            return """Great question about team formation! Here are some tips for building a successful hackathon team:

• Aim for 3-4 team members with complementary skills
• Include at least one developer, one designer, and one domain expert
• Don't worry if you're coming solo - we have team formation sessions
• Communication and collaboration are key to success

Our event includes dedicated time for networking and team formation. You'll find your perfect teammates! 👥"""

        elif any(word in prompt_lower for word in ["agenda", "schedule", "timeline", "program"]):
            return """Our hackathon features an action-packed schedule designed to maximize your creative potential:

🎯 Day 1:
• Opening ceremony and keynote
• Team formation and networking
• Technical workshops
• Mentor office hours

🚀 Day 2:
• Development time with mentor support
• Mid-point check-ins
• Final presentations
• Judging and awards ceremony

The agenda balances structured learning with plenty of time for innovation and collaboration!"""

        elif any(word in prompt_lower for word in ["challenge", "problem", "theme", "topic"]):
            return """This hackathon challenge focuses on creating innovative solutions that address real-world problems. Here's what you need to know:

🎯 Challenge Focus: Build technology solutions that make a positive impact
📋 Requirements: Working prototype, clear value proposition, user-focused design
⚖️ Judging Criteria: Innovation (25%), Technical Implementation (25%), User Experience (25%), Impact Potential (25%)
🎁 Deliverables: Live demo, presentation, and source code

Choose a problem you're passionate about - that's where the best solutions come from!"""

        elif any(word in prompt_lower for word in ["sponsor", "partnership", "support", "funding"]):
            return """We're excited about the opportunity to partner with innovative companies like yours!

Our hackathon provides excellent value for sponsors:
• Direct access to top technical talent
• Brand visibility to the developer community  
• Opportunity to scout for recruitment
• Association with innovation and cutting-edge technology

We offer various sponsorship tiers with benefits including mentorship opportunities, booth space, and speaking slots. Let's discuss how we can create a partnership that drives value for your organization! 🤝"""

        elif any(word in prompt_lower for word in ["register", "signup", "apply", "how to join"]):
            return """Ready to join our hackathon? Here's how to get started:

1. 📝 Visit our registration website
2. ✅ Complete the application form
3. 📧 Wait for confirmation email
4. 💬 Join our Discord/Slack community
5. 🚀 Prepare for an amazing weekend of innovation!

Registration is free and includes meals, swag, and access to all workshops and mentoring sessions. Spots are limited, so register early to secure your place! 

We welcome participants of all skill levels - from beginners to experienced developers. What matters most is your enthusiasm to learn and create! 🎉"""

        else:
            return """Thank you for reaching out to HackaTwin! We're thrilled about your interest in our hackathon community.

Our events bring together passionate innovators to collaborate, learn, and build amazing solutions. Whether you're a seasoned developer or just starting your tech journey, you'll find a welcoming community ready to help you grow.

For specific questions about registration, challenges, or logistics, please check our website or reach out to our team directly. We're here to help make your hackathon experience incredible! 

Happy hacking! 🚀✨"""

# Create both services - use OfflineAIService if you want completely offline
# offline_ai_service = OfflineAIService()

class LocalAIService:
    def __init__(self):
        # Support multiple local AI backends
        self.api_type = os.getenv("LOCAL_AI_TYPE", "ollama")  # ollama, localai, lmstudio
        self.base_url = os.getenv("LOCAL_AI_URL", "http://localhost:11434")  # Ollama default
        self.model_name = os.getenv("LOCAL_AI_MODEL", "llama3.2:3b")  # Lightweight model
        
        # Fallback to simple text generation if no local AI is available
        self.fallback_mode = os.getenv("AI_FALLBACK", "true").lower() == "true"
        
        # Initialize offline service as fallback
        self.offline_service = None
        if self.fallback_mode:
            try:
                self.offline_service = OfflineAIService()
            except:
                self.offline_service = None
    
    def generate_text(self, prompt: str, max_tokens: int = 500) -> str:
        """
        Generate text using local AI model with multiple fallbacks
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
            
            # Try offline AI if available
            if self.offline_service and self.offline_service.model:
                try:
                    return self.offline_service.generate_text(prompt, max_tokens)
                except:
                    pass
            
            # Final fallback to templates
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
                    {"role": "user", "content": "prompt"}
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
        """Use offline service or templates as fallback"""
        if self.offline_service:
            return self.offline_service._get_template_response(prompt)
        
        # Simple fallback
        return "Thank you for your message! Our AI assistant is currently unavailable, but we'll get back to you soon with a helpful response."

# Create a global instance
ai_service = LocalAIService()

def generate_text(prompt: str, max_tokens: int = 500) -> str:
    """
    Global helper function for generating text
    """
    return ai_service.generate_text(prompt, max_tokens)
