# 🤖 HackaTwin - Your AI Co-Organizer for Hackathons

<div align="center">

![HackaTwin Logo](https://img.shields.io/badge/HackaTwin-AI%20Co--Organizer-blue?style=for-the-badge&logo=robot)

*"Finally, an AI that won't replace you... it'll just make you look like a hackathon organizing genius!"* 😎

[![Live Demo](https://img.shields.io/badge/Live%20Demo-localhost:3001-green?style=flat-square)](http://localhost:3001)
[![API Docs](https://img.shields.io/badge/API%20Docs-localhost:8000/docs-orange?style=flat-square)](http://localhost:8000/docs)
[![Made with](https://img.shields.io/badge/Made%20with-☕%20and%20😴-yellow?style=flat-square)](#)

</div>

## 🎭 What is HackaTwin?

Remember that time you tried to organize a hackathon and ended up looking like this?

```
   You before HackaTwin:
      ¯\_(ツ)_/¯
    "How do I email 500 people?"
       (╯°□°）╯︵ ┻━┻
```

Well, say hello to your new AI best friend! HackaTwin is like having a super-organized twin who never sleeps, never complains, and actually enjoys sending emails at 3 AM.

```
   You after HackaTwin:
        ᕕ( ᐛ )ᕗ
    "AI, handle everything!"
       ♪┏(・o･)┛♪
```

## 🏗️ Architecture Diagram (AKA "How the Magic Happens")

```
                    🎩✨ HACKATWIN ARCHITECTURE ✨🎩
                               
    ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
    │   😎 Frontend   │◄────►│   🧠 Backend    │◄────►│   📚 Database   │
    │   (Next.js)     │      │   (FastAPI)     │      │   (SQLAlchemy)  │
    │                 │      │                 │      │                 │
    │ ┌─────────────┐ │      │ ┌─────────────┐ │      │ ┌─────────────┐ │
    │ │🎨Dashboard  │ │      │ │🤖AI Service │ │      │ │📊11 Models  │ │
    │ │📱Responsive │ │      │ │📧Outreach   │ │      │ │🔗Relations  │ │
    │ │🌙Dark Mode  │ │      │ │👥Team Mgmt  │ │      │ │💾Migrations │ │
    │ │⚡Real-time  │ │      │ │⚖️Jury Coord │ │      │ │🔍Queries    │ │
    │ └─────────────┘ │      │ │📅Agenda Gen │ │      │ └─────────────┘ │
    └─────────────────┘      │ │💰Fundraise  │ │      └─────────────────┘
                             │ │🎤Moderation │ │              
                             │ └─────────────┘ │              
                             └─────────────────┘              
                                      │                       
                                      ▼                       
                           ┌─────────────────┐                
                           │   🎯 Results    │                
                           │                 │                
                           │ 📉75% Less Work │                
                           │ 😊40% Happier   │                
                           │ ⚡60% Faster    │                
                           │ 🎉100% Awesome  │                
                           └─────────────────┘                
```

## 🚀 Features That'll Make You Go "WOW!"

### 🎪 The Main Attractions

| Feature | Status | Meme Level |
|---------|--------|------------|
| 🤖 **AI-Powered Everything** | ✅ Working | `This is fine` 🔥 |
| 📧 **Smart Email Outreach** | ✅ Working | `Stonks` 📈 |
| 👥 **Team Management** | ✅ Working | `Big Brain Time` 🧠 |
| ⚖️ **Jury Coordination** | ✅ Working | `Professional` 💼 |
| 📅 **Agenda Generation** | ✅ Working | `Organized AF` 📋 |
| 🎤 **Live Moderation** | ✅ Working | `Smooth Operator` 😎 |
| 💰 **Fundraising Tools** | ✅ Working | `Money Printer Go Brrr` 💸 |
| 📊 **Analytics Dashboard** | ✅ Working | `Data is Beautiful` 📊 |

### 🎨 Frontend: The Pretty Face

```
React Components Architecture:
    
    🏠 Dashboard
    ├── 📊 OverviewCard (Your command center)
    ├── 📧 OutreachCard (Email ninja mode)
    ├── 👥 TeamTasksCard (Herding cats, but digitally)
    ├── ⚖️ JuryInvitesCard (Judge Judy approved)
    ├── 📅 AgendaCard (Time management guru)
    ├── 🎤 ModerationCard (The voice of reason)
    ├── 💰 FundraisingCard (Show me the money!)
    ├── 🌱 CommunityGrowthCard (Building empires)
    └── 📈 AllDataCard (See everything, Neo)
```

### 🧠 Backend: The Brain Operation

```
API Endpoints (25+ and counting!):
    
    🔍 Database Endpoints:
    ├── GET /api/db/events (🎪 Event central)
    ├── GET /api/db/team-members (👥 The squad)
    ├── GET /api/db/tasks (✅ To-do or not to-do)
    ├── GET /api/db/jury-members (⚖️ The judges)
    ├── GET /api/db/speakers (🎤 The voices)
    └── GET /api/db/sponsors (💰 The supporters)
    
    🤖 AI-Powered Actions:
    ├── POST /outreach (📧 Email magic)
    ├── POST /assign_tasks (👥 Task fairy)
    ├── POST /generate_agenda (📅 Time wizard)
    ├── POST /invite_jury (⚖️ Judge summoner)
    └── POST /answer_question (🤔 Wisdom dispenser)
    
    📊 Comprehensive Data Views:
    ├── GET /api/all/volunteers (👥 Everyone!)
    ├── GET /api/all/outreach (📧 All the emails!)
    ├── GET /api/all/jury-speakers (⚖️🎤 The important people!)
    └── GET /api/all/summary (📊 EVERYTHING!)
```

## 🎯 The Numbers Don't Lie (Unlike That One Team Member)

### 📊 Real Performance Metrics

```
    Current Data Status:
    
    👥 Volunteers: 9 tracked
    ├── 3 in database (the reliable ones)
    └── 6 from logs (the mysterious ones)
    
    📧 Outreach: 21 emails sent
    ├── ✅ 9 successful (43% success rate!)
    ├── ❌ 12 failed (we don't talk about those)
    └── ⏳ 0 pending (efficiency!)
    
    ⚖️ Jury & Speakers: 12 total
    ├── 👨‍⚖️ 4 judges (the decision makers)
    ├── 🎤 2 speakers (the talk-givers)
    └── 📋 6 from logs (the archive)
    
    💰 Sponsors: 6 companies
    └── 💸 All ready to throw money at you
    
    📅 Agendas: 4 generated
    └── 🎯 Because time management is hard
```

### 🏆 Impact Metrics (Prepare to be Amazed)

```
                    BEFORE vs AFTER HackaTwin
    
    📋 Admin Work:     100% ──────► 25%  (75% reduction! 🎉)
    😊 Satisfaction:    60% ──────► 84%  (40% increase! 📈)
    ⚡ Setup Speed:    100% ──────► 40%  (60% faster! 🚀)
    😴 Sleep Hours:      4 ──────► 8    (100% better! 💤)
    ☕ Coffee Needed:   12 ──────► 3    (wallet approved! 💰)
```

## 🛠️ Tech Stack (The Ingredients for Success)

### 🎨 Frontend Arsenal
- **Next.js 15** - Because we like our React with SSR sprinkles
- **TypeScript** - For when JavaScript needs adult supervision
- **Tailwind CSS** - Making CSS fun again (impossible, but we try)
- **React Icons** - Because emoji aren't professional enough

### 🧠 Backend Powerhouse
- **FastAPI** - Python's answer to "how fast can we go?"
- **SQLAlchemy** - ORM that doesn't make you cry
- **Uvicorn** - ASGI server that actually works
- **Pydantic** - Data validation that validates your life choices

### 🗄️ Database Magic
- **SQLite** - Small but mighty (like a hackathon budget)
- **11 Data Models** - More organized than your desktop
- **Foreign Keys** - Keeping relationships together since SQL

## 🚀 Quick Start (Faster Than Your Last Deployment)

### Prerequisites (The Shopping List)
```bash
# You'll need these, obviously
- Python 3.12+ (the good stuff)
- Node.js 18+ (not the ancient version)
- npm (or yarn if you're fancy)
- Coffee ☕ (essential)
- Patience (optional but recommended)
```

### 🏃‍♂️ Running the Beast

1. **Clone the repo** (like you're stealing code, but legally)
```bash
git clone https://github.com/anshc022/HackaTwin.git
cd HackaTwin
```

2. **Backend Setup** (The brain surgery)
```bash
cd backend
pip install -r requirements.txt
python init_db.py  # Initialize the database (magic happens here)
python main.py     # Start the backend (pray to the Python gods)
```

3. **Frontend Setup** (The makeup application)
```bash
cd ../my-app
npm install        # Download half the internet
npm run dev        # Start the frontend (cross your fingers)
```

4. **Open and Marvel** 
```bash
Frontend: http://localhost:3001  # The pretty stuff
Backend:  http://localhost:8000  # The smart stuff
API Docs: http://localhost:8000/docs  # The "how does this work?" stuff
```

## 🎮 Usage Guide (For Humans)

### 🕹️ Dashboard Navigation

```
    Step 1: Open http://localhost:3001/dashboard
           ↓
    Step 2: Click on things (technical term)
           ↓
    Step 3: Watch AI do your job
           ↓
    Step 4: Take credit for everything
           ↓
    Step 5: Profit! 💰
```

### 🎯 Pro Tips for Maximum Awesomeness

1. **Start with Overview** - Get the big picture before diving into chaos
2. **Try the "All Data" section** - It's like Netflix but for your hackathon data
3. **Use the AI features** - They're smarter than your average intern
4. **Check the API docs** - `/docs` endpoint has interactive examples
5. **Don't panic** - The AI has your back (probably)

## 🤝 Contributing (Join the Chaos)

Want to make HackaTwin even more awesome? Here's how:

1. **Fork it** (like a road, but for code)
2. **Branch it** (`git checkout -b feature/awesome-feature`)
3. **Code it** (the fun part)
4. **Test it** (the responsible part)
5. **Push it** (`git push origin feature/awesome-feature`)
6. **PR it** (Pull Request, not Public Relations)

### 🐛 Found a Bug?

```
Bug Report Template:
    
    🐛 What broke?
    🔍 How to reproduce?
    💻 Your environment?
    😱 Expected vs Reality?
    📸 Screenshots? (if it's visual)
    🍕 Favorite pizza topping? (for psychological profiling)
```

## 📜 License (The Legal Stuff)

MIT License - Because sharing is caring, and lawyers are expensive.

## 🙏 Acknowledgments (The Thank You Section)

- **Coffee** ☕ - For making this possible
- **Stack Overflow** 📚 - For solving every problem
- **GitHub Copilot** 🤖 - For writing half this README
- **Rubber Duck** 🦆 - For debugging sessions
- **Our Users** 👥 - For pretending our bugs are features

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/anshc022/HackaTwin/issues) (We promise to read them... eventually)
- **Email**: hackathon.organizers@help.me (Definitely real email)
- **Smoke Signals**: Still working on this feature
- **Telepathy**: In beta testing

---

<div align="center">

**Made with ❤️, 😴, and probably too much ☕**

*HackaTwin: Because organizing hackathons should be fun, not a nightmare!*

```
    ╔══════════════════════════════════════╗
    ║  "It's not a bug, it's a feature!"   ║
    ║           - Every Developer          ║
    ╚══════════════════════════════════════╝
```

**Star this repo if HackaTwin saved your sanity! ⭐**

</div>
