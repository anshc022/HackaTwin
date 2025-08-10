from sqlalchemy.orm import Session
from database.database import engine, Base, get_db
from database.models import *
from typing import List, Optional
import json
from datetime import datetime

def create_tables():
    """Create all database tables"""
    Base.metadata.create_all(bind=engine)

def migrate_json_to_db():
    """Migrate existing JSON log files to database"""
    db = next(get_db())
    
    try:
        # Create default event
        default_event = db.query(Event).filter(Event.name == "HackaTwin 2025").first()
        if not default_event:
            default_event = Event(
                name="HackaTwin 2025",
                description="AI-powered hackathon automation platform",
                venue="Virtual/Hybrid Event",
                status="planning"
            )
            db.add(default_event)
            db.commit()
            db.refresh(default_event)
        
        # Migrate outreach logs
        try:
            with open("logs/outreach_log.json", "r") as f:
                outreach_data = json.load(f)
                for entry in outreach_data:
                    existing = db.query(OutreachLog).filter(
                        OutreachLog.email == entry["email"],
                        OutreachLog.sent_at == datetime.fromisoformat(entry["timestamp"])
                    ).first()
                    
                    if not existing:
                        log_entry = OutreachLog(
                            name=entry["name"],
                            email=entry["email"],
                            status=entry["status"],
                            message_type="outreach",
                            event_id=default_event.id,
                            sent_at=datetime.fromisoformat(entry["timestamp"])
                        )
                        db.add(log_entry)
        except FileNotFoundError:
            pass
        
        # Migrate team tasks
        try:
            with open("logs/team_tasks.json", "r") as f:
                team_data = json.load(f)
                for entry in team_data:
                    # Add team member if not exists
                    team_member = db.query(TeamMember).filter(
                        TeamMember.email == entry["email"]
                    ).first()
                    
                    if not team_member:
                        team_member = TeamMember(
                            name=entry["assigned_to"],
                            email=entry["email"],
                            event_id=default_event.id,
                            role="Developer"
                        )
                        db.add(team_member)
                        db.commit()
                        db.refresh(team_member)
                    
                    # Add task
                    existing_task = db.query(Task).filter(
                        Task.title == entry["task"],
                        Task.assigned_to == team_member.id
                    ).first()
                    
                    if not existing_task:
                        task = Task(
                            title=entry["task"],
                            assigned_to=team_member.id,
                            status=entry["status"],
                            created_at=datetime.fromisoformat(entry["timestamp"])
                        )
                        db.add(task)
        except FileNotFoundError:
            pass
        
        # Migrate jury invites
        try:
            with open("logs/jury_invites_log.json", "r") as f:
                jury_data = json.load(f)
                for entry in jury_data:
                    if entry["role"] == "judge":
                        existing = db.query(JuryMember).filter(
                            JuryMember.email == entry["email"]
                        ).first()
                        
                        if not existing:
                            jury_member = JuryMember(
                                name=entry["name"],
                                email=entry["email"],
                                expertise=entry.get("expertise", ""),
                                event_id=default_event.id,
                                status=entry["status"],
                                created_at=datetime.fromisoformat(entry["timestamp"])
                            )
                            db.add(jury_member)
                    
                    elif entry["role"] == "speaker":
                        existing = db.query(Speaker).filter(
                            Speaker.email == entry["email"]
                        ).first()
                        
                        if not existing:
                            speaker = Speaker(
                                name=entry["name"],
                                email=entry["email"],
                                topic=entry.get("topic", ""),
                                event_id=default_event.id,
                                status=entry["status"],
                                created_at=datetime.fromisoformat(entry["timestamp"])
                            )
                            db.add(speaker)
        except FileNotFoundError:
            pass
        
        # Migrate agenda
        try:
            with open("logs/agenda_log.json", "r") as f:
                agenda_data = json.load(f)
                for entry in agenda_data:
                    existing = db.query(Agenda).filter(
                        Agenda.title == entry["event_name"]
                    ).first()
                    
                    if not existing:
                        agenda = Agenda(
                            event_id=default_event.id,
                            title=entry["event_name"],
                            content=entry["generated_agenda"],
                            created_at=datetime.fromisoformat(entry["timestamp"])
                        )
                        db.add(agenda)
        except FileNotFoundError:
            pass
        
        # Migrate fundraising
        try:
            with open("logs/fundraising_log.json", "r") as f:
                fundraising_data = json.load(f)
                for entry in fundraising_data:
                    existing = db.query(Sponsor).filter(
                        Sponsor.contact_email == entry["contact_email"]
                    ).first()
                    
                    if not existing:
                        sponsor = Sponsor(
                            company_name=entry["company"],
                            contact_email=entry["contact_email"],
                            sponsorship_level=entry["proposal_type"],
                            amount=entry["amount_requested"],
                            event_id=default_event.id,
                            status=entry["status"],
                            created_at=datetime.fromisoformat(entry["timestamp"])
                        )
                        db.add(sponsor)
        except FileNotFoundError:
            pass
        
        # Migrate community
        try:
            with open("logs/community_log.json", "r") as f:
                community_data = json.load(f)
                for entry in community_data:
                    existing = db.query(CommunityMember).filter(
                        CommunityMember.email == entry["email"]
                    ).first()
                    
                    if not existing:
                        member = CommunityMember(
                            name=entry["member_name"],
                            email=entry["email"],
                            engagement_level=entry["message_type"],
                            join_date=datetime.fromisoformat(entry["timestamp"])
                        )
                        db.add(member)
        except FileNotFoundError:
            pass
        
        db.commit()
        print("✅ Successfully migrated JSON data to database!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error during migration: {e}")
    finally:
        db.close()

def get_dashboard_stats(db: Session):
    """Get dashboard statistics from database"""
    try:
        total_events = db.query(Event).count()
        team_members = db.query(TeamMember).count()
        emails_sent = db.query(OutreachLog).count()
        funds_raised = db.query(Sponsor).filter(Sponsor.status == "confirmed").count() * 2500  # Estimate
        
        # Recent activities
        recent_activities = []
        
        # Recent outreach
        recent_outreach = db.query(OutreachLog).order_by(OutreachLog.sent_at.desc()).limit(3).all()
        for log in recent_outreach:
            recent_activities.append({
                "title": f"Email sent to {log.name}",
                "description": f"Outreach email sent successfully",
                "time": log.sent_at.strftime("%H:%M"),
                "type": "outreach"
            })
        
        # Recent tasks
        recent_tasks = db.query(Task).order_by(Task.created_at.desc()).limit(2).all()
        for task in recent_tasks:
            recent_activities.append({
                "title": f"Task assigned: {task.title}",
                "description": f"Assigned to {task.assigned_to_member.name if task.assigned_to_member else 'Unknown'}",
                "time": task.created_at.strftime("%H:%M"),
                "type": "team"
            })
        
        return {
            "total_events": total_events,
            "active_projects": total_events,
            "team_members": team_members,
            "emails_sent": emails_sent,
            "funds_raised": funds_raised,
            "community_growth": db.query(CommunityMember).count(),
            "recent_activities": sorted(recent_activities, key=lambda x: x["time"], reverse=True)[:5]
        }
    except Exception as e:
        print(f"Error getting dashboard stats: {e}")
        return {
            "total_events": 0,
            "active_projects": 0,
            "team_members": 0,
            "emails_sent": 0,
            "funds_raised": 0,
            "community_growth": 0,
            "recent_activities": []
        }
