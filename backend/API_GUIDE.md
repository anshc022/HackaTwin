# HackaTwin API - Development Guide with Local AI

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
# - LOCAL_AI_TYPE (ollama, localai, lmstudio)
# - LOCAL_AI_URL (default: http://localhost:11434)
# - LOCAL_AI_MODEL (default: llama3.2:3b)
# - SENDGRID_API_KEY (for emails)
# - SLACK_BOT_TOKEN (for Slack integration)
```

### 3. Setup Local AI (Choose One)

#### Option A: Ollama (Recommended)
```bash
# Download from https://ollama.com/download and install
# Then pull a lightweight model:
ollama pull llama3.2:3b    # 2GB - Fast and good quality
# OR
ollama pull qwen2:1.5b     # 0.9GB - Very fast
```

#### Option B: Use Our Setup Script
```bash
python setup_local_ai.py
```

#### Option C: Fallback Mode (No AI Installation)
The API includes intelligent template responses if no local AI is available.

### 4. Start the Server
```bash
python start_server.py
```

### 5. Test the API
```bash
python test_local_ai.py
```

## 📚 API Documentation

Once the server is running, visit:
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🏗️ Project Structure

```
backend/
├── main.py                 # Main FastAPI application
├── start_server.py         # Server startup script
├── test_api.py            # API testing script
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── services/             # Service modules
│   ├── ai_service.py     # OpenAI integration
│   ├── email_service.py  # SendGrid integration
│   ├── slack_service.py  # Slack integration
│   └── file_utils.py     # File handling utilities
├── data/                 # Data storage (JSON files)
│   ├── outreach.json
│   ├── jury.json
│   ├── speakers.json
│   └── community.json
└── logs/                 # Application logs
    ├── outreach_log.json
    ├── invites_log.json
    ├── team_tasks.json
    ├── content_history.json
    ├── event_calls.json
    └── sponsor_log.json
```

## 🔗 API Endpoints

### Core Operations
- `GET /health` - Health check
- `POST /outreach` - Global outreach & recruitment
- `POST /assign_tasks` - Team & volunteer management
- `GET /invite_jury_speakers` - Speaker & jury orchestration

### Content Generation
- `POST /generate_agenda` - Generate event agenda
- `POST /generate_challenge` - Generate hackathon challenges

### Event Support
- `POST /schedule_call` - Schedule and announce calls
- `POST /answer_question` - AI-powered Q&A

### Partnerships
- `POST /generate_sponsor_email` - Generate sponsorship proposals
- `POST /send_sponsor_email` - Send sponsorship emails

### Community
- `POST /onboard_member` - Onboard new community members
- `POST /post_event_followup` - Send follow-up communications

## 🔧 Configuration

### Required Environment Variables
```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_sender_email@domain.com

# Slack Configuration
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
SLACK_CHANNEL_ID=your_slack_channel_id

# Optional
DISCORD_LINK=https://discord.gg/your_invite
ENVIRONMENT=development
```

## 🧪 Testing

### Manual Testing
1. Start the server: `python start_server.py`
2. Run tests: `python test_api.py`
3. Check API docs: http://localhost:8000/docs

### Test Individual Endpoints
```bash
# Test health check
curl http://localhost:8000/health

# Test question answering
curl -X POST http://localhost:8000/answer_question \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I register for the hackathon?"}'
```

## 📝 Data Management

### Data Files (data/)
- `outreach.json` - Outreach leads
- `jury.json` - Jury member information
- `speakers.json` - Speaker information  
- `community.json` - Community member data

### Log Files (logs/)
- `outreach_log.json` - Outreach activity logs
- `invites_log.json` - Invitation logs
- `team_tasks.json` - Task assignment logs
- `content_history.json` - Generated content history
- `event_calls.json` - Scheduled call logs
- `sponsor_log.json` - Sponsorship activity logs

## 🚨 Troubleshooting

### Common Issues

1. **ImportError**: Install dependencies with `pip install -r requirements.txt`
2. **OpenAI API Error**: Check your `OPENAI_API_KEY` in `.env`
3. **Email sending fails**: Verify `SENDGRID_API_KEY` and `FROM_EMAIL`
4. **Slack integration issues**: Check `SLACK_BOT_TOKEN` and permissions

### Debug Mode
Set `ENVIRONMENT=development` in `.env` for detailed error messages.

## 🔄 Development Workflow

1. **Make changes** to the code
2. **Server auto-reloads** (if using `--reload` flag)
3. **Test changes** using `test_api.py` or API docs
4. **Check logs** in the `logs/` directory
5. **Update documentation** as needed

## 📈 Scaling Considerations

- Replace JSON files with a proper database (PostgreSQL, MongoDB)
- Add authentication and authorization
- Implement rate limiting
- Add comprehensive error handling
- Set up monitoring and logging
- Deploy with Docker and container orchestration

## 🤝 Contributing

1. Follow the existing code structure
2. Add tests for new endpoints
3. Update documentation
4. Use type hints and proper error handling
5. Follow Python best practices
