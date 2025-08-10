from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime
import os
from sqlalchemy.orm import Session

# Import our services
from services.ai_service import generate_text
from services.email_service import send_email, send_bulk_emails
from services.slack_service import send_slack_message, send_slack_dm
from services.file_utils import load_json_file, save_json_file, append_to_json_file, get_current_timestamp

# Import database components
from database.database import get_db
from database.utils import get_dashboard_stats
from database.models import *

app = FastAPI(
    title="HackaTwin API",
    description="AI Co-organizer for Hackathons",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===== DATABASE-POWERED ENDPOINTS =====

@app.get("/api/db/events")
async def get_events(db: Session = Depends(get_db)):
    """Get all events from database"""
    try:
        events = db.query(Event).all()
        return {"events": [{"id": e.id, "name": e.name, "description": e.description, 
                           "start_date": e.start_date, "venue": e.venue, "status": e.status} for e in events]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/team-members")
async def get_team_members(db: Session = Depends(get_db)):
    """Get all team members from database"""
    try:
        members = db.query(TeamMember).all()
        return {"team_members": [{"id": m.id, "name": m.name, "email": m.email, 
                                 "role": m.role, "skills": m.skills, "status": m.status} for m in members]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/tasks")
async def get_tasks(db: Session = Depends(get_db)):
    """Get all tasks from database"""
    try:
        tasks = db.query(Task).join(TeamMember).all()
        return {"tasks": [{"id": t.id, "title": t.title, "description": t.description,
                          "assigned_to": t.assigned_to_member.name if t.assigned_to_member else "Unassigned",
                          "status": t.status, "priority": t.priority, "due_date": t.due_date} for t in tasks]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/jury-members")
async def get_jury_members(db: Session = Depends(get_db)):
    """Get all jury members from database"""
    try:
        jury = db.query(JuryMember).all()
        return {"jury_members": [{"id": j.id, "name": j.name, "email": j.email,
                                 "expertise": j.expertise, "company": j.company, "status": j.status} for j in jury]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/speakers")
async def get_speakers(db: Session = Depends(get_db)):
    """Get all speakers from database"""
    try:
        speakers = db.query(Speaker).all()
        return {"speakers": [{"id": s.id, "name": s.name, "email": s.email,
                             "topic": s.topic, "company": s.company, "status": s.status} for s in speakers]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/sponsors")
async def get_sponsors(db: Session = Depends(get_db)):
    """Get all sponsors from database"""
    try:
        sponsors = db.query(Sponsor).all()
        return {"sponsors": [{"id": s.id, "company_name": s.company_name, "contact_email": s.contact_email,
                             "sponsorship_level": s.sponsorship_level, "amount": s.amount, "status": s.status} for s in sponsors]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/agendas")
async def get_agendas(db: Session = Depends(get_db)):
    """Get all agendas from database"""
    try:
        agendas = db.query(Agenda).all()
        return {"agendas": [{"id": a.id, "title": a.title, "content": a.content,
                            "day_number": a.day_number, "version": a.version, "created_at": a.created_at} for a in agendas]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/db/community-members")
async def get_community_members(db: Session = Depends(get_db)):
    """Get all community members from database"""
    try:
        members = db.query(CommunityMember).all()
        return {"community_members": [{"id": m.id, "name": m.name, "email": m.email,
                                      "country": m.country, "skills": m.skills, "engagement_level": m.engagement_level} for m in members]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Pydantic models for request/response
class OutreachRequest(BaseModel):
    custom_message: Optional[str] = None

class TaskAssignment(BaseModel):
    team: List[Dict[str, str]]
    tasks: List[str]

class AgendaRequest(BaseModel):
    event_name: str
    days: int
    tracks: List[str]

class ChallengeRequest(BaseModel):
    theme: str
    difficulty: str
    audience: str

class ScheduleCallRequest(BaseModel):
    title: str
    datetime: str
    link: str

class QuestionRequest(BaseModel):
    question: str

class SponsorEmailRequest(BaseModel):
    company_name: str
    industry: str
    benefits: List[str]

class SendSponsorEmailRequest(BaseModel):
    company_name: str
    email: str
    industry: str
    benefits: List[str]

class OnboardMemberRequest(BaseModel):
    name: str
    email: str
    country: str

class JuryInviteRequest(BaseModel):
    judges: List[Dict[str, str]]
    speakers: List[Dict[str, str]]
    event_info: str

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# 1. Global Outreach & Recruitment
@app.post("/outreach")
async def global_outreach(request: OutreachRequest):
    """
    Generate and send personalized outreach emails
    """
    try:
        # Load outreach leads
        leads = load_json_file("data/outreach.json")
        
        if not leads:
            raise HTTPException(status_code=404, detail="No outreach leads found")
        
        results = []
        
        for lead in leads:
            # Generate personalized email content
            referral_line = ""
            if lead.get("source") == "alumni":
                referral_line = "As a valued alumni of our hackathon community, "
            
            prompt = f"""
            Write a personalized outreach email for {lead['name']} from {lead['country']}.
            {referral_line}
            
            The email should:
            - Invite them to participate in our upcoming hackathon
            - Highlight the benefits of joining our global hackathon community
            - Be professional yet friendly and enthusiastic
            - Include a call to action to register
            
            Custom message to include: {request.custom_message or "Join us for an amazing innovation experience!"}
            """
            
            email_content = generate_text(prompt)
            subject = f"🚀 Join HackaTwin - Global Hackathon Community"
            
            # Send email
            email_result = send_email(lead['email'], subject, email_content)
            
            # Log the result
            log_entry = {
                "name": lead['name'],
                "email": lead['email'],
                "status": email_result['status'],
                "timestamp": get_current_timestamp()
            }
            append_to_json_file("logs/outreach_log.json", log_entry)
            
            results.append({
                "name": lead['name'],
                "email": lead['email'],
                "status": email_result['status']
            })
        
        return {
            "message": f"Outreach completed for {len(results)} leads",
            "results": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2. Team & Volunteer Management
@app.post("/assign_tasks")
async def assign_tasks(request: TaskAssignment):
    """
    Use AI to match tasks to team roles and assign them
    """
    try:
        # Generate task assignments using AI
        team_info = "\n".join([f"- {member['name']}: {member['role']} (Contact: {member['contact']})" for member in request.team])
        tasks_info = "\n".join([f"- {task}" for task in request.tasks])
        
        prompt = f"""
        You are assigning tasks to team members based on their roles. 
        
        Team Members:
        {team_info}
        
        Tasks to assign:
        {tasks_info}
        
        Please create optimal task assignments matching each task to the most suitable team member based on their role.
        Return the assignments in a clear format showing which team member should handle which task(s).
        """
        
        assignments = generate_text(prompt, max_tokens=800)
        
        # Save assignments
        assignment_log = {
            "team": request.team,
            "tasks": request.tasks,
            "assignments": assignments,
            "timestamp": get_current_timestamp()
        }
        append_to_json_file("logs/team_tasks.json", assignment_log)
        
        # Optional: Send Slack DMs to volunteers (if Slack user IDs are provided)
        slack_notifications = []
        for member in request.team:
            if "slack_id" in member:
                message = f"Hi {member['name']}! You have new task assignments:\n\n{assignments}"
                slack_result = send_slack_dm(member['slack_id'], message)
                slack_notifications.append({
                    "name": member['name'],
                    "slack_status": slack_result['status']
                })
        
        return {
            "message": "Tasks assigned successfully",
            "assignments": assignments,
            "slack_notifications": slack_notifications
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 3. Speaker & Jury Orchestration
@app.get("/invite_jury_speakers")
async def invite_jury_speakers():
    """
    Generate and send personalized invites to jury and speakers
    """
    try:
        # Load jury and speakers data
        jury_members = load_json_file("data/jury.json")
        speakers = load_json_file("data/speakers.json")
        
        results = []
        
        # Process jury invitations
        for jury in jury_members:
            prompt = f"""
            Write a professional invitation email for {jury['name']} from {jury['company']} to be a jury member.
            
            Details:
            - Expert in: {jury['expertise']}
            - Experience: {jury['experience']}
            
            The email should:
            - Acknowledge their expertise in {jury['expertise']}
            - Invite them to judge our hackathon
            - Highlight the importance of their role
            - Be respectful and professional
            """
            
            content = generate_text(prompt)
            subject = f"🏆 Invitation to Judge HackaTwin - {jury['expertise']} Expert"
            
            email_result = send_email(jury['email'], subject, content)
            
            # Log the invite
            log_entry = {
                "name": jury['name'],
                "role": "jury",
                "type": "jury",
                "status": email_result['status'],
                "timestamp": get_current_timestamp()
            }
            append_to_json_file("logs/invites_log.json", log_entry)
            results.append(log_entry)
        
        # Process speaker invitations
        for speaker in speakers:
            prompt = f"""
            Write a professional invitation email for {speaker['name']} from {speaker['company']} to be a speaker.
            
            Details:
            - Topic: {speaker['topic']}
            - Bio: {speaker['bio']}
            
            The email should:
            - Invite them to speak about {speaker['topic']}
            - Acknowledge their expertise
            - Highlight the impact they can make
            - Be enthusiastic and professional
            """
            
            content = generate_text(prompt)
            subject = f"🎤 Speaking Invitation - HackaTwin: {speaker['topic']}"
            
            email_result = send_email(speaker['email'], subject, content)
            
            # Log the invite
            log_entry = {
                "name": speaker['name'],
                "role": "speaker",
                "type": "speaker",
                "status": email_result['status'],
                "timestamp": get_current_timestamp()
            }
            append_to_json_file("logs/invites_log.json", log_entry)
            results.append(log_entry)
        
        return {
            "message": f"Invitations sent to {len(jury_members)} jury members and {len(speakers)} speakers",
            "results": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/invite_jury")
async def invite_jury_custom(request: JuryInviteRequest):
    """
    Send personalized invites to selected jury members and speakers
    """
    try:
        results = []
        
        # Process judge invitations
        for judge in request.judges:
            if not judge.get('name') or not judge.get('email'):
                continue
                
            prompt = f"""
            Write a professional invitation email for {judge['name']} to be a jury member for {request.event_info}.
            
            The email should:
            - Be personalized and professional
            - Acknowledge their expertise in {judge.get('expertise', 'technology')}
            - Invite them to judge our hackathon
            - Mention the event details: {request.event_info}
            - Express the importance of their role
            - Be respectful and enthusiastic
            """
            
            content = generate_text(prompt)
            subject = f"🏆 Invitation to Judge HackaTwin - {judge.get('expertise', 'Expert')}"
            
            email_result = send_email(judge['email'], subject, content)
            
            # Log the invite
            log_entry = {
                "name": judge['name'],
                "email": judge['email'],
                "role": "judge",
                "expertise": judge.get('expertise', 'N/A'),
                "status": email_result['status'],
                "timestamp": get_current_timestamp()
            }
            append_to_json_file("logs/jury_invites_log.json", log_entry)
            results.append(log_entry)
        
        # Process speaker invitations
        for speaker in request.speakers:
            if not speaker.get('name') or not speaker.get('email'):
                continue
                
            prompt = f"""
            Write a professional speaking invitation email for {speaker['name']} for {request.event_info}.
            
            The email should:
            - Be personalized and engaging
            - Invite them to speak at our hackathon
            - Mention their expertise in {speaker.get('topic', 'technology')}
            - Include event details: {request.event_info}
            - Highlight the impact they can make
            - Be enthusiastic and professional
            """
            
            content = generate_text(prompt)
            subject = f"🎤 Speaking Invitation - HackaTwin: {speaker.get('topic', 'Innovation')}"
            
            email_result = send_email(speaker['email'], subject, content)
            
            # Log the invite
            log_entry = {
                "name": speaker['name'],
                "email": speaker['email'],
                "role": "speaker", 
                "topic": speaker.get('topic', 'N/A'),
                "status": email_result['status'],
                "timestamp": get_current_timestamp()
            }
            append_to_json_file("logs/jury_invites_log.json", log_entry)
            results.append(log_entry)
        
        return {
            "message": f"Invitations sent to {len(request.judges)} judges and {len(request.speakers)} speakers",
            "results": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. Content, Agenda & Challenge Creation
@app.post("/generate_agenda")
async def generate_agenda(request: AgendaRequest):
    """
    Generate a structured agenda for the hackathon
    """
    try:
        prompt = f"""
        Create a detailed {request.days}-day hackathon agenda for "{request.event_name}".
        
        Tracks: {', '.join(request.tracks)}
        
        Include:
        - Opening ceremony and team formation
        - Track-specific sessions and workshops
        - Mentor sessions and check-ins
        - Presentation and judging
        - Closing ceremony and awards
        
        Format as a structured JSON with days, sessions, times, and topics.
        """
        
        agenda_content = generate_text(prompt, max_tokens=1000)
        
        # Save to content history
        content_entry = {
            "type": "agenda",
            "event_name": request.event_name,
            "days": request.days,
            "tracks": request.tracks,
            "content": agenda_content,
            "timestamp": get_current_timestamp()
        }
        append_to_json_file("logs/content_history.json", content_entry)
        
        return {
            "message": "Agenda generated successfully",
            "agenda": agenda_content
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_challenge")
async def generate_challenge(request: ChallengeRequest):
    """
    Generate a hackathon challenge with judging criteria
    """
    try:
        prompt = f"""
        Create a hackathon challenge with the following specifications:
        
        Theme: {request.theme}
        Difficulty: {request.difficulty}
        Target Audience: {request.audience}
        
        Include:
        1. Challenge statement
        2. Background and context
        3. Requirements and constraints
        4. Judging criteria with weightings
        5. Expected deliverables
        6. Success metrics
        
        Make it engaging and clear for participants.
        """
        
        challenge_content = generate_text(prompt, max_tokens=1000)
        
        # Save to content history
        content_entry = {
            "type": "challenge",
            "theme": request.theme,
            "difficulty": request.difficulty,
            "audience": request.audience,
            "content": challenge_content,
            "timestamp": get_current_timestamp()
        }
        append_to_json_file("logs/content_history.json", content_entry)
        
        return {
            "message": "Challenge generated successfully",
            "challenge": challenge_content
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. Live Event Moderation & Support
@app.post("/schedule_call")
async def schedule_call(request: ScheduleCallRequest):
    """
    Schedule a call and post to Slack channel
    """
    try:
        message = f"""
🎯 **{request.title}**

📅 **Date & Time:** {request.datetime}
🔗 **Join Link:** {request.link}

See you there! 👥
        """
        
        # Send to Slack
        slack_result = send_slack_message(os.getenv('SLACK_CHANNEL_ID'), message)
        
        # Log the call
        call_entry = {
            "title": request.title,
            "datetime": request.datetime,
            "link": request.link,
            "slack_status": slack_result['status'],
            "timestamp": get_current_timestamp()
        }
        append_to_json_file("logs/event_calls.json", call_entry)
        
        return {
            "message": "Call scheduled and posted to Slack",
            "slack_status": slack_result['status']
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/answer_question")
async def answer_question(request: QuestionRequest):
    """
    Generate a helpful answer to participant questions
    """
    try:
        prompt = f"""
        You are HackaTwin, an AI co-organizer for hackathons. A participant has asked:
        
        "{request.question}"
        
        Provide a helpful, friendly, and informative answer that:
        - Addresses their question directly
        - Is encouraging and supportive
        - Maintains the enthusiastic hackathon spirit
        - Offers practical guidance when applicable
        """
        
        answer = generate_text(prompt)
        
        return {
            "question": request.question,
            "answer": answer,
            "timestamp": get_current_timestamp()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. Fundraising & Partnerships
@app.post("/generate_sponsor_email")
async def generate_sponsor_email(request: SponsorEmailRequest):
    """
    Generate sponsorship proposal email content
    """
    try:
        benefits_text = "\n".join([f"- {benefit}" for benefit in request.benefits])
        
        prompt = f"""
        Write a professional sponsorship proposal email for {request.company_name} in the {request.industry} industry.
        
        Benefits we can offer:
        {benefits_text}
        
        The email should:
        - Be professional and compelling
        - Highlight mutual benefits
        - Show understanding of their industry
        - Include clear value proposition
        - Have a strong call to action
        """
        
        email_content = generate_text(prompt, max_tokens=800)
        
        return {
            "company": request.company_name,
            "industry": request.industry,
            "email_content": email_content
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/send_sponsor_email")
async def send_sponsor_email(request: SendSponsorEmailRequest):
    """
    Generate and send sponsorship proposal email
    """
    try:
        benefits_text = "\n".join([f"- {benefit}" for benefit in request.benefits])
        
        prompt = f"""
        Write a professional sponsorship proposal email for {request.company_name} in the {request.industry} industry.
        
        Benefits we can offer:
        {benefits_text}
        
        The email should:
        - Be professional and compelling
        - Highlight mutual benefits
        - Show understanding of their industry
        - Include clear value proposition
        - Have a strong call to action
        """
        
        email_content = generate_text(prompt, max_tokens=800)
        subject = f"Partnership Opportunity - HackaTwin Sponsorship"
        
        # Send email
        email_result = send_email(request.email, subject, email_content)
        
        # Log the interaction
        log_entry = {
            "company_name": request.company_name,
            "email": request.email,
            "industry": request.industry,
            "benefits": request.benefits,
            "status": email_result['status'],
            "timestamp": get_current_timestamp()
        }
        append_to_json_file("logs/sponsor_log.json", log_entry)
        
        return {
            "message": f"Sponsorship email sent to {request.company_name}",
            "status": email_result['status'],
            "email_content": email_content
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. Community Growth Layer
@app.post("/onboard_member")
async def onboard_member(request: OnboardMemberRequest):
    """
    Onboard new community member
    """
    try:
        # Add to community
        member_data = {
            "name": request.name,
            "email": request.email,
            "country": request.country,
            "joined_date": get_current_timestamp()
        }
        
        # Load current community
        community = load_json_file("data/community.json")
        community.append(member_data)
        save_json_file("data/community.json", community)
        
        # Generate welcome email
        prompt = f"""
        Write a warm welcome email for {request.name} from {request.country} who just joined our hackathon community.
        
        The email should:
        - Welcome them enthusiastically
        - Introduce them to the community
        - Mention upcoming events and opportunities
        - Include links to our Discord and resources
        - Encourage them to participate actively
        """
        
        welcome_email = generate_text(prompt)
        subject = f"🎉 Welcome to HackaTwin Community, {request.name}!"
        
        # Send welcome email
        email_result = send_email(request.email, subject, welcome_email)
        
        # Send Slack DM if possible (would need Slack user mapping)
        slack_message = f"🎉 Welcome {request.name} from {request.country} to our HackaTwin community! Check your email for onboarding info."
        slack_result = send_slack_message(os.getenv('SLACK_CHANNEL_ID'), slack_message)
        
        return {
            "message": f"Successfully onboarded {request.name}",
            "email_status": email_result['status'],
            "slack_status": slack_result['status']
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/post_event_followup")
async def post_event_followup():
    """
    Send follow-up emails to all community members
    """
    try:
        # Load community members
        community = load_json_file("data/community.json")
        
        if not community:
            return {"message": "No community members found"}
        
        results = []
        
        for member in community:
            prompt = f"""
            Write a post-event follow-up email for {member['name']} from {member['country']}.
            
            The email should:
            - Thank them for being part of our community
            - Share highlights from recent events
            - Invite them to upcoming challenges
            - Encourage continued participation
            - Include links to new opportunities
            """
            
            followup_content = generate_text(prompt)
            subject = "🚀 Thank You & What's Next - HackaTwin Community"
            
            # Send email
            email_result = send_email(member['email'], subject, followup_content)
            
            results.append({
                "name": member['name'],
                "email": member['email'],
                "status": email_result['status']
            })
        
        return {
            "message": f"Follow-up emails sent to {len(results)} community members",
            "results": results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# API endpoints to fetch logs and statistics
@app.get("/api/logs/outreach")
async def get_outreach_logs():
    """Get outreach email logs"""
    try:
        logs = load_json_file("logs/outreach_log.json")
        return {"logs": logs if logs else []}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/team-tasks")
async def get_team_tasks_logs():
    """Get team task assignment logs"""
    try:
        logs = load_json_file("logs/team_tasks.json")
        return {"logs": logs if logs else []}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/jury-invites")
async def get_jury_invites_logs():
    """Get jury and speaker invitation logs"""
    try:
        logs = load_json_file("logs/invites_log.json")
        return {"logs": logs if logs else []}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/agenda")
async def get_agenda_logs():
    """Get agenda generation logs"""
    try:
        logs = load_json_file("logs/content_history.json")
        # Filter for agenda entries only
        agenda_logs = [log for log in (logs or []) if log.get("type") == "agenda"]
        return {"logs": agenda_logs}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/moderation")
async def get_moderation_logs():
    """Get moderation session logs"""
    try:
        logs = load_json_file("logs/event_calls.json")
        return {"logs": logs if logs else []}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/fundraising")
async def get_fundraising_logs():
    """Get sponsorship outreach logs"""
    try:
        logs = load_json_file("logs/sponsor_log.json")
        return {"logs": logs if logs else []}
    except Exception:
        return {"logs": []}

@app.get("/api/logs/community")
async def get_community_logs():
    """Get community growth logs"""
    try:
        community = load_json_file("data/community.json")
        return {"logs": community if community else []}
    except Exception:
        return {"logs": []}

@app.get("/api/stats/dashboard/db")
async def get_dashboard_stats_db(db: Session = Depends(get_db)):
    """
    Get real-time dashboard statistics from database
    """
    try:
        stats = get_dashboard_stats(db)
        return {
            "status": "success",
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/stats/dashboard")
async def get_dashboard_stats():
    """Get dashboard overview statistics"""
    try:
        stats = {
            "total_events": 0,
            "active_projects": 0,
            "team_members": 0,
            "emails_sent": 0,
            "funds_raised": 0,
            "community_growth": 0,
            "recent_activities": []
        }
        
        # Count emails sent from outreach logs
        outreach_logs = load_json_file("logs/outreach_log.json") or []
        stats["emails_sent"] = len(outreach_logs)
        
        # Count team members from team task logs
        team_logs = load_json_file("logs/team_tasks.json") or []
        unique_members = set()
        for log in team_logs:
            if "team" in log:
                for member in log["team"]:
                    unique_members.add(member.get("email", ""))
        stats["team_members"] = len(unique_members)
        
        # Count community members
        community = load_json_file("data/community.json") or []
        stats["community_growth"] = len(community)
        
        # Count agenda/events generated
        content_logs = load_json_file("logs/content_history.json") or []
        agenda_count = len([log for log in content_logs if log.get("type") == "agenda"])
        stats["total_events"] = agenda_count
        
        # Count active projects (from sponsor logs + team tasks)
        sponsor_logs = load_json_file("logs/sponsor_log.json") or []
        stats["active_projects"] = len(team_logs) + len(sponsor_logs)
        
        # Calculate estimated funds raised (mock calculation based on sponsors)
        stats["funds_raised"] = len(sponsor_logs) * 15000  # Estimate $15k per sponsor
        
        # Get recent activities from all logs
        recent_activities = []
        
        # Add recent outreach activities
        for log in outreach_logs[-3:]:
            recent_activities.append({
                "title": "Email outreach completed",
                "description": f"Sent email to {log.get('name', 'contact')}",
                "time": log.get("timestamp", "Unknown"),
                "type": "outreach"
            })
        
        # Add recent team activities
        for log in team_logs[-2:]:
            recent_activities.append({
                "title": "Team tasks assigned",
                "description": f"AI assigned {len(log.get('tasks', []))} tasks to team",
                "time": log.get("timestamp", "Unknown"),
                "type": "team"
            })
        
        # Add recent agenda activities
        for log in content_logs[-2:]:
            if log.get("type") == "agenda":
                recent_activities.append({
                    "title": "Event agenda generated",
                    "description": f"Created agenda for {log.get('event_name', 'event')}",
                    "time": log.get("timestamp", "Unknown"),
                    "type": "agenda"
                })
        
        # Sort activities by timestamp (most recent first)
        recent_activities.sort(key=lambda x: x["time"], reverse=True)
        stats["recent_activities"] = recent_activities[:6]
        
        return {"stats": stats}
        
    except Exception as e:
        return {"stats": {
            "total_events": 0,
            "active_projects": 0,
            "team_members": 0,
            "emails_sent": 0,
            "funds_raised": 0,
            "community_growth": 0,
            "recent_activities": []
        }}

# ===== COMPREHENSIVE DATA RETRIEVAL ENDPOINTS =====

@app.get("/api/all/volunteers")
async def get_all_volunteers(db: Session = Depends(get_db)):
    """Get all volunteers/team members from database and JSON files"""
    try:
        result = {
            "database_data": [],
            "json_data": [],
            "total_count": 0
        }
        
        # Get from database
        try:
            db_members = db.query(TeamMember).all()
            result["database_data"] = [
                {
                    "id": m.id,
                    "name": m.name,
                    "email": m.email,
                    "role": m.role,
                    "skills": m.skills,
                    "status": m.status,
                    "created_at": m.created_at.isoformat() if m.created_at else None,
                    "source": "database"
                } for m in db_members
            ]
        except Exception as e:
            print(f"Database query error: {e}")
        
        # Get from JSON files
        try:
            team_data = load_json_file("logs/team_tasks.json")
            for entry in team_data:
                result["json_data"].append({
                    "name": entry.get("assigned_to", "Unknown"),
                    "email": entry.get("email", ""),
                    "task": entry.get("task", ""),
                    "status": entry.get("status", ""),
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_team_tasks"
                })
        except Exception as e:
            print(f"JSON file error: {e}")
        
        # Get community members from JSON
        try:
            community_data = load_json_file("logs/community_log.json")
            for entry in community_data:
                result["json_data"].append({
                    "name": entry.get("member_name", "Unknown"),
                    "email": entry.get("email", ""),
                    "message_type": entry.get("message_type", ""),
                    "status": entry.get("status", ""),
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_community"
                })
        except Exception as e:
            print(f"Community JSON error: {e}")
        
        result["total_count"] = len(result["database_data"]) + len(result["json_data"])
        return result
        
    except Exception as e:
        return {"error": str(e), "database_data": [], "json_data": [], "total_count": 0}

@app.get("/api/all/outreach")
async def get_all_outreach(db: Session = Depends(get_db)):
    """Get all outreach data from database and JSON files"""
    try:
        result = {
            "database_data": [],
            "json_data": [],
            "total_count": 0,
            "stats": {
                "total_emails": 0,
                "successful": 0,
                "failed": 0,
                "pending": 0
            }
        }
        
        # Get from database
        try:
            db_outreach = db.query(OutreachLog).all()
            result["database_data"] = [
                {
                    "id": o.id,
                    "name": o.name,
                    "email": o.email,
                    "message_type": o.message_type,
                    "status": o.status,
                    "sent_at": o.sent_at.isoformat() if o.sent_at else None,
                    "source": "database"
                } for o in db_outreach
            ]
        except Exception as e:
            print(f"Database outreach error: {e}")
        
        # Get from JSON files
        try:
            outreach_data = load_json_file("logs/outreach_log.json")
            for entry in outreach_data:
                result["json_data"].append({
                    "name": entry.get("name", "Unknown"),
                    "email": entry.get("email", ""),
                    "status": entry.get("status", ""),
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_outreach"
                })
        except Exception as e:
            print(f"Outreach JSON error: {e}")
        
        # Calculate statistics
        all_entries = result["database_data"] + result["json_data"]
        result["stats"]["total_emails"] = len(all_entries)
        
        for entry in all_entries:
            status = entry.get("status", "").lower()
            if status in ["success", "delivered", "opened"]:
                result["stats"]["successful"] += 1
            elif status in ["error", "failed", "bounce"]:
                result["stats"]["failed"] += 1
            else:
                result["stats"]["pending"] += 1
        
        result["total_count"] = len(all_entries)
        return result
        
    except Exception as e:
        return {"error": str(e), "database_data": [], "json_data": [], "total_count": 0}

@app.get("/api/all/jury-speakers")
async def get_all_jury_speakers(db: Session = Depends(get_db)):
    """Get all jury members and speakers from database and JSON files"""
    try:
        result = {
            "database_jury": [],
            "database_speakers": [],
            "json_data": [],
            "total_count": 0
        }
        
        # Get jury from database
        try:
            db_jury = db.query(JuryMember).all()
            result["database_jury"] = [
                {
                    "id": j.id,
                    "name": j.name,
                    "email": j.email,
                    "expertise": j.expertise,
                    "company": j.company,
                    "status": j.status,
                    "created_at": j.created_at.isoformat() if j.created_at else None,
                    "role": "judge",
                    "source": "database"
                } for j in db_jury
            ]
        except Exception as e:
            print(f"Database jury error: {e}")
        
        # Get speakers from database
        try:
            db_speakers = db.query(Speaker).all()
            result["database_speakers"] = [
                {
                    "id": s.id,
                    "name": s.name,
                    "email": s.email,
                    "topic": s.topic,
                    "company": s.company,
                    "status": s.status,
                    "created_at": s.created_at.isoformat() if s.created_at else None,
                    "role": "speaker",
                    "source": "database"
                } for s in db_speakers
            ]
        except Exception as e:
            print(f"Database speakers error: {e}")
        
        # Get from JSON files
        try:
            jury_data = load_json_file("logs/jury_invites_log.json")
            for entry in jury_data:
                result["json_data"].append({
                    "name": entry.get("name", "Unknown"),
                    "email": entry.get("email", ""),
                    "role": entry.get("role", ""),
                    "expertise": entry.get("expertise", ""),
                    "topic": entry.get("topic", ""),
                    "status": entry.get("status", ""),
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_jury_invites"
                })
        except Exception as e:
            print(f"Jury JSON error: {e}")
        
        result["total_count"] = len(result["database_jury"]) + len(result["database_speakers"]) + len(result["json_data"])
        return result
        
    except Exception as e:
        return {"error": str(e), "database_jury": [], "database_speakers": [], "json_data": [], "total_count": 0}

@app.get("/api/all/sponsors")
async def get_all_sponsors(db: Session = Depends(get_db)):
    """Get all sponsors and fundraising data"""
    try:
        result = {
            "database_data": [],
            "json_data": [],
            "total_count": 0,
            "funding_stats": {
                "total_requested": 0,
                "total_confirmed": 0,
                "pending_amount": 0
            }
        }
        
        # Get from database
        try:
            db_sponsors = db.query(Sponsor).all()
            result["database_data"] = [
                {
                    "id": s.id,
                    "company_name": s.company_name,
                    "contact_email": s.contact_email,
                    "contact_person": s.contact_person,
                    "sponsorship_level": s.sponsorship_level,
                    "amount": s.amount,
                    "status": s.status,
                    "created_at": s.created_at.isoformat() if s.created_at else None,
                    "source": "database"
                } for s in db_sponsors
            ]
        except Exception as e:
            print(f"Database sponsors error: {e}")
        
        # Get from JSON files
        try:
            funding_data = load_json_file("logs/fundraising_log.json")
            for entry in funding_data:
                result["json_data"].append({
                    "company": entry.get("company", "Unknown"),
                    "contact_email": entry.get("contact_email", ""),
                    "amount_requested": entry.get("amount_requested", 0),
                    "status": entry.get("status", ""),
                    "proposal_type": entry.get("proposal_type", ""),
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_fundraising"
                })
        except Exception as e:
            print(f"Fundraising JSON error: {e}")
        
        # Calculate funding statistics
        for sponsor in result["database_data"]:
            amount = sponsor.get("amount", 0) or 0
            result["funding_stats"]["total_requested"] += amount
            if sponsor.get("status") == "confirmed":
                result["funding_stats"]["total_confirmed"] += amount
            else:
                result["funding_stats"]["pending_amount"] += amount
        
        for entry in result["json_data"]:
            amount = entry.get("amount_requested", 0) or 0
            result["funding_stats"]["total_requested"] += amount
            if entry.get("status") == "confirmed":
                result["funding_stats"]["total_confirmed"] += amount
            else:
                result["funding_stats"]["pending_amount"] += amount
        
        result["total_count"] = len(result["database_data"]) + len(result["json_data"])
        return result
        
    except Exception as e:
        return {"error": str(e), "database_data": [], "json_data": [], "total_count": 0}

@app.get("/api/all/agendas")
async def get_all_agendas(db: Session = Depends(get_db)):
    """Get all agendas with full content preview"""
    try:
        result = {
            "database_data": [],
            "json_data": [],
            "total_count": 0
        }
        
        # Get from database
        try:
            db_agendas = db.query(Agenda).all()
            result["database_data"] = [
                {
                    "id": a.id,
                    "title": a.title,
                    "content": a.content,
                    "content_preview": a.content[:500] + "..." if len(a.content) > 500 else a.content,
                    "day_number": a.day_number,
                    "version": a.version,
                    "created_at": a.created_at.isoformat() if a.created_at else None,
                    "source": "database"
                } for a in db_agendas
            ]
        except Exception as e:
            print(f"Database agendas error: {e}")
        
        # Get from JSON files
        try:
            agenda_data = load_json_file("logs/agenda_log.json")
            for entry in agenda_data:
                content = entry.get("generated_agenda", "")
                result["json_data"].append({
                    "event_name": entry.get("event_name", "Unknown"),
                    "event_date": entry.get("event_date", ""),
                    "content": content,
                    "content_preview": content[:500] + "..." if len(content) > 500 else content,
                    "timestamp": entry.get("timestamp", ""),
                    "source": "json_agenda"
                })
        except Exception as e:
            print(f"Agenda JSON error: {e}")
        
        result["total_count"] = len(result["database_data"]) + len(result["json_data"])
        return result
        
    except Exception as e:
        return {"error": str(e), "database_data": [], "json_data": [], "total_count": 0}

@app.get("/api/all/summary")
async def get_complete_summary(db: Session = Depends(get_db)):
    """Get a complete summary of all data"""
    try:
        summary = {
            "volunteers": {"count": 0, "details": []},
            "outreach": {"count": 0, "success_rate": "0%"},
            "jury_speakers": {"judges": 0, "speakers": 0},
            "sponsors": {"count": 0, "total_funding": 0},
            "agendas": {"count": 0},
            "total_records": 0
        }
        
        # Get volunteers summary
        volunteers_data = await get_all_volunteers(db)
        summary["volunteers"]["count"] = volunteers_data.get("total_count", 0)
        summary["volunteers"]["details"] = [
            {"name": v.get("name"), "email": v.get("email"), "source": v.get("source")}
            for v in (volunteers_data.get("database_data", []) + volunteers_data.get("json_data", []))
        ]
        
        # Get outreach summary
        outreach_data = await get_all_outreach(db)
        summary["outreach"]["count"] = outreach_data.get("total_count", 0)
        stats = outreach_data.get("stats", {})
        if stats.get("total_emails", 0) > 0:
            success_rate = (stats.get("successful", 0) / stats.get("total_emails", 1)) * 100
            summary["outreach"]["success_rate"] = f"{success_rate:.1f}%"
        
        # Get jury/speakers summary
        jury_data = await get_all_jury_speakers(db)
        summary["jury_speakers"]["judges"] = len(jury_data.get("database_jury", []))
        summary["jury_speakers"]["speakers"] = len(jury_data.get("database_speakers", []))
        
        # Get sponsors summary
        sponsors_data = await get_all_sponsors(db)
        summary["sponsors"]["count"] = sponsors_data.get("total_count", 0)
        summary["sponsors"]["total_funding"] = sponsors_data.get("funding_stats", {}).get("total_requested", 0)
        
        # Get agendas summary
        agendas_data = await get_all_agendas(db)
        summary["agendas"]["count"] = agendas_data.get("total_count", 0)
        
        # Calculate total records
        summary["total_records"] = (
            summary["volunteers"]["count"] +
            summary["outreach"]["count"] +
            summary["jury_speakers"]["judges"] +
            summary["jury_speakers"]["speakers"] +
            summary["sponsors"]["count"] +
            summary["agendas"]["count"]
        )
        
        return summary
        
    except Exception as e:
        return {"error": str(e), "summary": "Unable to generate summary"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
