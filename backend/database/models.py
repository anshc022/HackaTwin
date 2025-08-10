from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database.database import Base

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    venue = Column(String(255))
    status = Column(String(50), default="planning")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # Relationships
    agendas = relationship("Agenda", back_populates="event")
    team_members = relationship("TeamMember", back_populates="event")
    jury_members = relationship("JuryMember", back_populates="event")
    speakers = relationship("Speaker", back_populates="event")
    sponsors = relationship("Sponsor", back_populates="event")
    outreach_logs = relationship("OutreachLog", back_populates="event")

class TeamMember(Base):
    __tablename__ = "team_members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    role = Column(String(100))
    skills = Column(Text)
    event_id = Column(Integer, ForeignKey("events.id"))
    status = Column(String(50), default="active")
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="team_members")
    tasks = relationship("Task", back_populates="assigned_to_member")

class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    assigned_to = Column(Integer, ForeignKey("team_members.id"))
    status = Column(String(50), default="pending")
    priority = Column(String(20), default="medium")
    due_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    completed_at = Column(DateTime)
    
    # Relationships
    assigned_to_member = relationship("TeamMember", back_populates="tasks")

class JuryMember(Base):
    __tablename__ = "jury_members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    expertise = Column(String(255))
    company = Column(String(255))
    bio = Column(Text)
    event_id = Column(Integer, ForeignKey("events.id"))
    status = Column(String(50), default="invited")
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="jury_members")

class Speaker(Base):
    __tablename__ = "speakers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    topic = Column(String(255))
    company = Column(String(255))
    bio = Column(Text)
    event_id = Column(Integer, ForeignKey("events.id"))
    status = Column(String(50), default="invited")
    talk_duration = Column(Integer)  # in minutes
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="speakers")

class Sponsor(Base):
    __tablename__ = "sponsors"
    
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String(255), nullable=False)
    contact_email = Column(String(255), nullable=False)
    contact_person = Column(String(255))
    sponsorship_level = Column(String(50))  # gold, silver, bronze
    amount = Column(Float)
    benefits = Column(Text)
    event_id = Column(Integer, ForeignKey("events.id"))
    status = Column(String(50), default="prospective")
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="sponsors")

class Agenda(Base):
    __tablename__ = "agendas"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    day_number = Column(Integer, default=1)
    version = Column(String(50), default="1.0")
    created_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="agendas")

class OutreachLog(Base):
    __tablename__ = "outreach_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    message_type = Column(String(50))  # outreach, followup, invitation
    status = Column(String(50))  # sent, delivered, opened, clicked, error
    event_id = Column(Integer, ForeignKey("events.id"))
    sent_at = Column(DateTime, server_default=func.now())
    
    # Relationships
    event = relationship("Event", back_populates="outreach_logs")

class CommunityMember(Base):
    __tablename__ = "community_members"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, unique=True)
    country = Column(String(100))
    skills = Column(Text)
    interests = Column(Text)
    engagement_level = Column(String(50), default="new")
    join_date = Column(DateTime, server_default=func.now())
    last_active = Column(DateTime)

class Fundraising(Base):
    __tablename__ = "fundraising"
    
    id = Column(Integer, primary_key=True, index=True)
    campaign_name = Column(String(255), nullable=False)
    target_amount = Column(Float)
    raised_amount = Column(Float, default=0.0)
    description = Column(Text)
    status = Column(String(50), default="active")
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())

class ModerationLog(Base):
    __tablename__ = "moderation_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    session_type = Column(String(50))  # qa, call, chat
    action = Column(String(100))  # started, ended, message_moderated
    content = Column(Text)
    moderator = Column(String(255))
    timestamp = Column(DateTime, server_default=func.now())
    severity = Column(String(20), default="low")  # low, medium, high
