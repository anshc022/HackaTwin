# 🎯 HackaTwin: AI Co-Organizer for Hackathons

<div align="center">
  <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" width="400" alt="Hackathon Energy"/>
  <br>
  <h3>🤖 Your AI-Powered Hackathon Sidekick That Never Sleeps! 🚀</h3>
</div>

[![Python](https://img.shields.io/badge/Python-3.12+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-15.4+-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)
[![AI-Powered](https://img.shields.io/badge/AI--Powered-🤖-orange.svg)](#)
[![Coffee-Fueled](https://img.shields.io/badge/Coffee--Fueled-☕-brown.svg)](#)

> **🎪 Meet your new hackathon co-organizer that works 24/7, never complains, and makes organizing events as easy as eating pizza! 🍕**

## 🌟 Project Overview

<div align="center">
  <img src="https://media.giphy.com/media/3o7qE1YN7aBOFPRw8E/giphy.gif" width="300" alt="Mind Blown"/>
  <br>
  <em>When you realize you can automate EVERYTHING! 🤯</em>
</div>

HackaTwin is like having a super-smart, caffeine-addicted intern who never sleeps and somehow makes organizing hackathons feel like playing a video game! 🎮 This AI co-organizer is designed to handle all the boring stuff so you can focus on the fun parts - like watching amazing projects come to life and eating way too much pizza! 🍕

### 🎯 Key Features (AKA The Magic Tricks)

- **🤖 AI-Powered Automation**: Our AI writes better emails than your English teacher (and faster too!)
- **👥 Comprehensive Management**: Handles more people than a professional cat herder 🐱
- **📊 Real-time Dashboard**: Updates faster than your social media feed during drama season
- **📧 Smart Communication**: 43% success rate (which is basically wizardry in email land ✨)
- **🗄️ Robust Data Layer**: More organized than Marie Kondo's closet
- **⚡ High Performance**: Faster than your morning coffee kicks in ☕

## 🏗️ System Architecture (The Beautiful Monster)

<div align="center">
  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="250" alt="Architecture"/>
  <br>
  <em>Our system architecture in all its glory! 🏗️</em>
</div>

```mermaid
graph TB
    subgraph "🌐 Frontend Kingdom (Where Magic Happens)"
        UI["📱 Next.js 15 Dashboard<br/>Prettier than a unicorn"]
        COMP["🧩 React Components<br/>Building blocks of awesomeness"]
        STATE["🔄 State Management<br/>Keeping track of chaos"]
    end
    
    subgraph "🔄 API Gateway (The Bouncer)"
        CORS["🛡️ CORS Middleware<br/>Keeping browsers happy"]
        VALID["✅ Request Validation<br/>No nonsense allowed"]
        AUTH["🔐 Authentication<br/>Who goes there?"]
    end
    
    subgraph "🧠 Backend Empire (The Brain Center)"
        API["⚡ FastAPI Application<br/>Speed of light responses"]
        AI["🤖 AI Service<br/>The smart cookie"]
        EMAIL["📧 Email Service<br/>Charming message sender"]
        SLACK["💬 Slack Integration<br/>Office gossip central"]
        FILE["📁 File Utilities<br/>Digital janitor"]
    end
    
    subgraph "💾 Data Fortress (Where Everything Lives)"
        DB["🏛️ SQLite Database<br/>The memory palace"]
        LOGS["📋 JSON Log Files<br/>The diary keeper"]
        MODELS["🏗️ SQLAlchemy Models<br/>The architects"]
    end
    
    subgraph "🤖 AI Wonderland (The Genius Corner)"
        LLM["🧙‍♂️ Local LLM<br/>The word wizard"]
        NLP["📝 Text Generation<br/>Shakespeare 2.0"]
        SMART["💡 Smart Assignment<br/>The matchmaker"]
    end
    
    UI --> CORS
    COMP --> CORS
    STATE --> CORS
    
    CORS --> VALID
    VALID --> AUTH
    AUTH --> API
    
    API --> AI
    API --> EMAIL
    API --> SLACK
    API --> FILE
    
    AI --> LLM
    AI --> NLP
    AI --> SMART
    
    API --> MODELS
    MODELS --> DB
    API --> LOGS
    
    style UI fill:#e1f5fe,stroke:#01579b,stroke-width:3px
    style API fill:#f3e5f5,stroke:#4a148c,stroke-width:3px
    style DB fill:#e8f5e8,stroke:#1b5e20,stroke-width:3px
    style AI fill:#fff3e0,stroke:#e65100,stroke-width:3px
```

<div align="center">
  <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="200" alt="It works"/>
  <br>
  <em>When everything works perfectly together! 🎉</em>
</div>

## 📊 Database Schema (The Data Mansion)

<div align="center">
  <img src="https://media.giphy.com/media/26tn8zKqZbNXjLHCo/giphy.gif" width="300" alt="Database"/>
  <br>
  <em>Our database relationships are stronger than coffee addiction! ☕</em>
</div>

```mermaid
erDiagram
    Event ||--o{ TeamMember : "has awesome"
    Event ||--o{ JuryMember : "judges with"
    Event ||--o{ Speaker : "features amazing"
    Event ||--o{ Sponsor : "funded by"
    Event ||--o{ Agenda : "scheduled for"
    Event ||--o{ OutreachLog : "reaches out via"
    
    TeamMember ||--o{ Task : "conquers daily"
    
    Event {
        int id "🆔 The Main Character"
        string name "🎪 Event Name"
        text description "📝 The Epic Story"
        datetime start_date "🚀 Launch Time"
        datetime end_date "🏁 Finish Line"
        string venue "📍 The Chosen Place"
        string status "📊 Current Mood"
        datetime created_at "⏰ Birth Certificate"
        datetime updated_at "🔄 Last Seen"
    }
    
    TeamMember {
        int id "🆔 Unique Superhero ID"
        string name "👤 Hero Name"
        string email "📧 Digital Address"
        string role "🎭 Superpower Category"
        text skills "💪 Arsenal of Abilities"
        int event_id "🔗 Team Assignment"
        string status "💫 Current State"
        datetime created_at "🎂 Join Date"
    }
    
    Task {
        int id "🆔 Mission Number"
        string title "🎯 Mission Name"
        text description "📋 Mission Brief"
        int assigned_to "👤 The Chosen One"
        string status "🚦 Mission Status"
        string priority "🔥 Urgency Level"
        datetime due_date "⏰ Deadline Drama"
        datetime created_at "📅 Task Birthday"
        datetime completed_at "🎉 Victory Moment"
    }
    
    JuryMember {
        int id "🆔 Judge Number"
        string name "⚖️ Justice Name"
        string email "📧 Court Address"
        string expertise "🧠 Wisdom Area"
        string company "🏢 Home Base"
        text bio "📖 Life Story"
        int event_id "🎪 Event Assignment"
        string status "📊 Judge Mode"
        datetime created_at "⚖️ Sworn In Date"
    }
    
    Speaker {
        int id "🆔 Speaker ID"
        string name "🎤 Stage Name"
        string email "📧 Backstage Pass"
        string topic "💭 Wisdom Topic"
        string company "🏢 Day Job"
        text bio "📚 Speaker Story"
        int event_id "🎪 Stage Assignment"
        string status "🎭 Speaker Mode"
        int talk_duration "⏱️ Talk Time"
        datetime created_at "🎤 Mic Check Date"
    }
    
    Sponsor {
        int id "🆔 Sponsor Badge"
        string company_name "💰 Money Source"
        string contact_email "📧 Business Line"
        string contact_person "👤 Money Manager"
        string sponsorship_level "🏆 VIP Status"
        float amount "💵 Generosity Level"
        int event_id "🎪 Investment Target"
        string status "📊 Partnership State"
        datetime created_at "🤝 Deal Closed Date"
    }
    
    Agenda {
        int id "🆔 Schedule Item"
        string title "📅 Event Name"
        text content "📝 The Plan"
        datetime scheduled_time "⏰ Show Time"
        int duration "⏱️ Time Slot"
        string agenda_type "🎭 Event Category"
        int event_id "🎪 Main Event"
        datetime created_at "📋 Planning Date"
    }
```

<div align="center">
  <img src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif" width="200" alt="Database connections"/>
  <br>
  <em>When all your foreign keys just click! 🔗</em>
</div>

## 🚀 Quick Start (Let's Get This Party Started!)

<div align="center">
  <img src="https://media.giphy.com/media/3o7qE2VAxuXWeyvJIY/giphy.gif" width="300" alt="Let's do this"/>
  <br>
  <em>Time to bring your hackathon to life! 🎉</em>
</div>

### Prerequisites

- **Python 3.12+**
- **Node.js 18+**
- **npm or yarn**

### 🔧 Backend Setup (The Engine Room)

<div align="center">
  <img src="https://media.giphy.com/media/l41lGvinEgARjB2HC/giphy.gif" width="200" alt="Backend setup"/>
</div>

1. **🏃‍♂️ Navigate to backend directory** (Let's go!)
   ```bash
   cd backend
   ```

2. **🏠 Create your Python palace**
   ```bash
   python -m venv venv
   # Windows (because we love Windows... sometimes 😅)
   venv\Scripts\activate
   # macOS/Linux (for the cool kids 😎)
   source venv/bin/activate
   ```

3. **📦 Install the magic ingredients**
   ```bash
   pip install -r requirements.txt
   ```

4. **🗃️ Wake up the database** (Rise and shine, data!)
   ```bash
   python init_db.py
   ```

5. **🚀 Launch the rocket** (Houston, we have liftoff!)
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### 🎨 Frontend Setup (The Pretty Face)

<div align="center">
  <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="200" alt="Frontend magic"/>
</div>

1. **🏃‍♀️ Navigate to the frontend kingdom**
   ```bash
   cd my-app
   ```

2. **📦 Gather the frontend army**
   ```bash
   npm install
   ```

3. **🎭 Start the show**
   ```bash
   npm run dev
   ```

### 🌐 Access Your Digital Empire

<div align="center">
  <img src="https://media.giphy.com/media/26ufcVAp3AiinOkCY/giphy.gif" width="200" alt="Success"/>
  <br>
  <em>When everything works on the first try! 🎊</em>
</div>

- **🎨 Frontend Dashboard**: http://localhost:3000/dashboard (Where the magic happens!)
- **⚡ Backend API**: http://localhost:8000 (The powerhouse!)
- **📚 API Documentation**: http://localhost:8000/docs (Your new best friend!)
- **🔍 Interactive API**: http://localhost:8000/redoc (For the curious minds!)

## 🔗 API Endpoints

### 📊 Core Data Endpoints

<div align="center">
  <img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="200" alt="Coding Magic"/>
  <br>
  <em>Our APIs working their magic ✨</em>
</div>

```mermaid
graph TB
    subgraph "🗄️ Database APIs (The Classics)"
        DB1["🎪 /api/db/events<br/>Events that make you go WOW!"]
        DB2["👥 /api/db/team-members<br/>The Dream Team"]
        DB3["📋 /api/db/tasks<br/>TODOs that actually get DONE"]
        DB4["⚖️ /api/db/jury-members<br/>The Judges who Judge"]
        DB5["🎤 /api/db/speakers<br/>Talk the Talk"]
        DB6["💰 /api/db/sponsors<br/>Show me the Money!"]
        DB7["📅 /api/db/agendas<br/>Time is Everything"]
    end
    
    subgraph "🚀 Aggregated APIs (The Superheroes)"
        AGG1["🦸‍♂️ /api/all/volunteers<br/>Assemble the Squad!"]
        AGG2["📢 /api/all/outreach<br/>Spreading the Word"]
        AGG3["🎯 /api/all/jury-speakers<br/>The Power Duo"]
        AGG4["💎 /api/all/sponsors<br/>Cha-Ching Tracker"]
        AGG5["📊 /api/all/agendas<br/>Master Plan Central"]
        AGG6["🌟 /api/all/summary<br/>The Ultimate Overview"]
    end
    
    subgraph "🤖 AI-Powered Features (The Wizards)"
        AI1["🧙‍♂️ /outreach<br/>Charming Emails That Work"]
        AI2["🎪 /assign_tasks<br/>Perfect Match Maker"]
        AI3["💌 /invite_jury_speakers<br/>VIP Invitation Machine"]
        AI4["🎨 /generate_agenda<br/>Schedule Picasso"]
        AI5["💸 /send_sponsor_email<br/>Money Magnet Messages"]
    end
    
    style DB1 fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style AGG1 fill:#f1f8e9,stroke:#4caf50,stroke-width:3px
    style AI1 fill:#fff3e0,stroke:#ff9800,stroke-width:3px
```

### 🤖 AI-Powered Endpoints (The Wizardry Section)

<div align="center">
  <img src="https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif" width="250" alt="AI Magic"/>
  <br>
  <em>When AI does the heavy lifting! 🧙‍♂️</em>
</div>

| Endpoint | Method | Description | Magic Level |
|----------|--------|-------------|-------------|
| `/outreach` | POST | 📧 Generate and send emails that people actually read! | 🪄🪄🪄 |
| `/assign_tasks` | POST | 🎯 AI matchmaker for tasks and humans | 🪄🪄🪄🪄 |
| `/invite_jury_speakers` | GET | 💌 VIP invitations that make people feel special | 🪄🪄🪄🪄🪄 |
| `/generate_agenda` | POST | 📅 Create schedules that actually make sense | 🪄🪄🪄 |
| `/send_sponsor_email` | POST | 💰 Money-magnet messages that sponsors love | 🪄🪄🪄🪄 |

### 📊 Data Management (The Organized Chaos)

<div align="center">
  <img src="https://media.giphy.com/media/3o6Mb6ZWoD8ZrKzVv2/giphy.gif" width="200" alt="Data organization"/>
</div>

| Endpoint | Method | Description | Coolness Factor |
|----------|--------|-------------|-----------------|
| `/api/all/volunteers` | GET | 👥 Your dream team in one place | 🔥🔥🔥 |
| `/api/all/outreach` | GET | 📈 Email campaign analytics that'll blow your mind | 🔥🔥🔥🔥 |
| `/api/all/jury-speakers` | GET | 🏆 Complete VIP guest list | 🔥🔥🔥🔥🔥 |
| `/api/all/sponsors` | GET | 💎 Money tracker extraordinaire | 🔥🔥🔥🔥 |
| `/api/all/summary` | GET | 🌟 The ultimate "everything at a glance" dashboard | 🔥🔥🔥🔥🔥 |

## 🛠️ Technology Stack (Our Arsenal of Awesomeness)

<div align="center">
  <img src="https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif" width="300" alt="Tech stack"/>
  <br>
  <em>When your tech stack is more stacked than pancakes! 🥞</em>
</div>

### 🔧 Backend Technologies (The Power Rangers)

```mermaid
graph TD
    subgraph "⚡ Core Framework (The Heart)"
        FAST["🚀 FastAPI 0.104+<br/>Faster than your morning coffee"]
        PYTHON["🐍 Python 3.12<br/>The snake that codes"]
        UVICORN["🦄 Uvicorn ASGI Server<br/>Unicorn-powered speed"]
    end
    
    subgraph "💾 Data Layer (The Memory Palace)"
        SQL["🏗️ SQLAlchemy ORM<br/>Database whisperer"]
        SQLITE["🗄️ SQLite Database<br/>Small but mighty"]
        PYDANTIC["✅ Pydantic Validation<br/>The data police"]
    end
    
    subgraph "🤖 AI & Services (The Smart Squad)"
        AI["🧙‍♂️ Local LLM Integration<br/>The word wizard"]
        EMAIL["📧 SendGrid Email Service<br/>Message delivery hero"]
        SLACK["💬 Slack SDK<br/>Office gossip carrier"]
        HTTP["🌐 HTTPX Async Client<br/>Speed demon"]
    end
    
    subgraph "🔧 Development (The Helper Gang)"
        DOTENV["⚙️ Python-dotenv<br/>Secret keeper"]
        ALEMBIC["🔄 Database Migrations<br/>Time traveler"]
        MULTI["📎 Multipart Form Support<br/>File juggler"]
    end
    
    FAST --> SQL
    FAST --> PYDANTIC
    FAST --> AI
    FAST --> EMAIL
    FAST --> SLACK
    
    SQL --> SQLITE
    
    style FAST fill:#00c851,stroke:#2e7d32,stroke-width:3px
    style AI fill:#ff8a00,stroke:#e65100,stroke-width:3px
    style SQL fill:#007bff,stroke:#0d47a1,stroke-width:3px
```

### 🎨 Frontend Technologies (The Pretty Squad)

<div align="center">
  <img src="https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif" width="200" alt="Frontend magic"/>
</div>

- **⚛️ Next.js 15**: React framework that's faster than gossip spreading
- **🔷 TypeScript**: Making JavaScript less scary since forever
- **🎨 Tailwind CSS**: CSS that doesn't make you cry
- **🔧 React Icons**: Icons prettier than your profile picture
- **🏗️ Component Architecture**: Building blocks more fun than LEGOs

## 📈 Performance Metrics (The Bragging Rights Section)

<div align="center">
  <img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="300" alt="Success metrics"/>
  <br>
  <em>When your numbers look this good! 📊✨</em>
</div>

### 🎯 Current Statistics (Real Live Data, No Kidding!)

<div align="center">
  <img src="https://media.giphy.com/media/26ufcVAp3AiinOkCY/giphy.gif" width="200" alt="Live data"/>
</div>

| Metric | Count | Success Rate | Awesome Level |
|--------|-------|--------------|---------------|
| **👥 Active Volunteers** | 9 | 100% tracked | 🌟🌟🌟🌟🌟 |
| **📧 Outreach Campaigns** | 21 | 43% success rate | 🔥🔥🔥🔥 |
| **⚖️ Jury Members** | 4 | 100% invited | 🎯🎯🎯🎯🎯 |
| **🎤 Speakers** | 2 | 100% confirmed | 🎪🎪🎪🎪🎪 |
| **💰 Sponsors** | 6 | Active tracking | 💎💎💎💎 |
| **📅 Generated Agendas** | 4 | AI-powered magic | 🪄🪄🪄🪄🪄 |

### ⚡ Technical Performance (Speed Demon Stats)

<div align="center">
  <img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="200" alt="Fast performance"/>
</div>

- **🚀 API Response Time**: < 200ms (Faster than you can say "hackathon"!)
- **🗄️ Database Query Performance**: < 50ms (Lightning in a bottle!)
- **📊 Dashboard Load Time**: < 2 seconds (Blink and you'll miss it!)
- **📦 Frontend Bundle Size**: Optimized with Next.js 15 (Lean and mean!)
- **🧠 Memory Usage**: < 100MB Python backend (Efficient like a hybrid car!)
- **👥 Concurrent Users**: Tested up to 50 (Party-ready! 🎉)

## 🎯 Key Features Breakdown

### 🤖 AI-Powered Automation

```mermaid
graph LR
    subgraph "AI Capabilities"
        GEN[Content Generation]
        PERS[Personalization]
        ASSIGN[Smart Assignment]
        OPT[Optimization]
    end
    
    subgraph "Applications"
        EMAIL[Email Campaigns]
        AGENDA[Agenda Creation]
        TASK[Task Distribution]
        ANALYSIS[Data Analysis]
    end
    
    GEN --> EMAIL
    PERS --> EMAIL
    ASSIGN --> TASK
    OPT --> ANALYSIS
    GEN --> AGENDA
    
    style GEN fill:#ff9800
    style EMAIL fill:#4caf50
```

### 📊 Data Management System

- **🔄 Dual Data Sources**: SQLite database + JSON log files
- **📈 Real-time Aggregation**: Live statistics and metrics
- **🔍 Comprehensive Tracking**: Full audit trail of all activities
- **💾 Data Integrity**: Foreign key constraints and validation
- **🚀 Performance Optimization**: Indexed queries and efficient joins

### 🎨 User Interface

- **📱 Responsive Design**: Mobile-first approach with desktop optimization
- **🌙 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **📊 Interactive Dashboard**: Real-time data visualization
- **🎯 Component-Based**: Modular architecture for easy maintenance
- **⚡ Fast Loading**: Optimized with Next.js performance features

## 🔄 Development Workflow

```mermaid
graph TD
    START[Start Development] --> BACKEND[Backend Setup]
    BACKEND --> DB[Initialize Database]
    DB --> API[Start API Server]
    API --> FRONTEND[Frontend Setup]
    FRONTEND --> DEV[Development Mode]
    DEV --> TEST[Testing & Validation]
    TEST --> DEPLOY[Production Deployment]
    
    style START fill:#e8f5e8
    style DEV fill:#fff3e0
    style DEPLOY fill:#f3e5f5
```

## 🧪 Testing & Quality

### 🔍 Available Test Scripts

```bash
# API Integration Tests
python test_api.py

# Complete System Integration
python test_complete_integration.py

# Email Service Testing
python test_email.py

# AI Service Validation
python test_local_ai.py

# Team API Testing
python test_team_api.py
```

### 📋 Quality Assurance

- **✅ Type Safety**: Full TypeScript integration
- **🔒 Data Validation**: Pydantic models for request/response
- **🛡️ Error Handling**: Comprehensive exception management
- **📊 Logging**: Detailed activity logs and audit trails
- **🔄 CORS Configuration**: Secure cross-origin request handling

## 📁 Project Structure

```
HackaTwin/
├── 📁 backend/                 # FastAPI Backend
│   ├── 📁 app/                 # Application modules
│   │   ├── 📁 api/             # API routes
│   │   └── 📁 core/            # Core configuration
│   ├── 📁 database/            # Database models & utilities
│   ├── 📁 services/            # Business logic services
│   ├── 📁 data/                # Sample data files
│   ├── 📁 logs/                # Activity logs
│   ├── 📄 main.py              # FastAPI application
│   ├── 📄 requirements.txt     # Python dependencies
│   └── 📄 init_db.py          # Database initialization
├── 📁 my-app/                  # Next.js Frontend
│   ├── 📁 src/                 # Source code
│   │   ├── 📁 app/             # App router pages
│   │   └── 📁 components/      # React components
│   ├── 📁 public/              # Static assets
│   ├── 📄 package.json         # Node dependencies
│   └── 📄 next.config.ts       # Next.js configuration
├── 📁 submission/              # Project documentation
└── 📄 README.md               # This file
```

## 🚀 Deployment

### 🐳 Docker Deployment (Recommended)

```dockerfile
# Backend Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### ☁️ Production Environment

1. **Backend**: Deploy on platforms like Railway, Heroku, or AWS
2. **Frontend**: Deploy on Vercel, Netlify, or AWS Amplify
3. **Database**: PostgreSQL for production (SQLite for development)
4. **Monitoring**: Implement logging and health checks

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with proper testing
4. **Commit changes**: `git commit -m 'Add amazing feature'`
5. **Push to branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### 📋 Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript for all frontend code
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📞 Support & Contact

- **📧 Issues**: Open a GitHub issue for bug reports
- **💡 Feature Requests**: Discuss in GitHub Discussions
- **📚 Documentation**: Check our comprehensive docs
- **🛠️ Development**: Join our development discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FastAPI**: For the excellent async web framework
- **Next.js**: For the powerful React framework
- **SQLAlchemy**: For robust database ORM
- **OpenAI/Local LLMs**: For AI integration capabilities
- **Tailwind CSS**: For the utility-first styling approach

---

<div align="center">

**🎯 Built with ❤️ and way too much caffeine for the hackathon community! ☕**

<img src="https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif" width="200" alt="Built with love"/>

[🌟 Star this repo](https://github.com/anshc022/HackaTwin) • [🐛 Report Bug](https://github.com/anshc022/HackaTwin/issues) • [💡 Request Feature](https://github.com/anshc022/HackaTwin/discussions)

<img src="https://media.giphy.com/media/26ufcVAp3AiinOkCY/giphy.gif" width="150" alt="Thank you"/>
<br>
<em>Thanks for checking out HackaTwin! Now go build something amazing! 🚀</em>

</div>