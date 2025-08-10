Build a FastAPI project for HackaTwin – an AI co-organizer for hackathons.

Tech stack:
- FastAPI
- python-dotenv
- openai
- sendgrid
- slack_sdk
- requests
- json
- pathlib for file handling

General rules:
- Store all data in `/data` folder as `.json` files.
- Store all logs in `/logs` folder as `.json` files.
- If a file doesn’t exist, create it with an empty list `[]`.
- Load env variables from `.env` for API keys and config.
- All OpenAI API calls should use a helper function `generate_text(prompt)` in `services/ai_service.py`.
- All SendGrid calls should use a helper function in `services/email_service.py`.
- All Slack calls should use a helper function in `services/slack_service.py`.

Create the following endpoints:

1. **Global Outreach & Recruitment**
   - POST `/outreach`
   - Reads leads from `data/outreach.json` (fields: name, email, country, source).
   - Generates personalized outreach emails using OpenAI API (add referral line if source is "alumni").
   - Sends via SendGrid.
   - Logs results to `logs/outreach_log.json` (name, email, status, timestamp).

2. **Team & Volunteer Management**
   - POST `/assign_tasks`
   - Accepts JSON {team: [ {name, role, contact} ], tasks: [string]}.
   - Uses AI to match tasks to roles.
   - Saves assignments to `logs/team_tasks.json`.
   - Optional: send Slack DMs to volunteers.

3. **Speaker & Jury Orchestration**
   - GET `/invite_jury_speakers`
   - Reads `data/jury.json` and `data/speakers.json`.
   - Generates personalized invites via AI.
   - Sends via SendGrid.
   - Logs to `logs/invites_log.json` with name, role, type (jury/speaker), status.

4. **Content, Agenda & Challenge Creation**
   - POST `/generate_agenda`
     - Accepts {event_name, days, tracks}.
     - Generates a structured JSON agenda with sessions, times, and topics.
     - Saves to `logs/content_history.json`.
   - POST `/generate_challenge`
     - Accepts {theme, difficulty, audience}.
     - Generates challenge statement + judging criteria.
     - Saves to same log.

5. **Live Event Moderation & Support**
   - POST `/schedule_call`
     - Accepts {title, datetime, link}.
     - Posts to Slack channel.
     - Logs to `logs/event_calls.json`.
   - POST `/answer_question`
     - Accepts {question}.
     - Generates a helpful answer via AI in Hackathon’s tone.
     - Returns answer.

6. **Fundraising & Partnerships**
   - POST `/generate_sponsor_email`
     - Accepts {company_name, industry, benefits}.
     - Generates sponsorship proposal text via AI.
   - POST `/send_sponsor_email`
     - Accepts {company_name, email, industry, benefits}.
     - Generates and sends email via SendGrid.
     - Logs to `logs/sponsor_log.json`.

7. **Community Growth Layer**
   - POST `/onboard_member`
     - Accepts {name, email, country}.
     - Saves to `data/community.json`.
     - Sends Slack DM + follow-up email with events.
   - POST `/post_event_followup`
     - Reads from `data/community.json`.
     - Sends thank-you + invite to new challenge via SendGrid.

Include:
- `/health` endpoint returning {"status": "ok"}.
- Directory structure:
  - backend/
    - main.py
    - services/
      - ai_service.py
      - email_service.py
      - slack_service.py
    - data/
      - outreach.json
      - jury.json
      - speakers.json
      - community.json
    - logs/
      - outreach_log.json
      - invites_log.json
      - team_tasks.json
      - content_history.json
      - event_calls.json
      - sponsor_log.json
- `requirements.txt` listing all dependencies.
- `.env.example` with placeholders for OPENAI_API_KEY, SENDGRID_API_KEY, SLACK_BOT_TOKEN, SLACK_CHANNEL_ID, DISCORD_LINK.
