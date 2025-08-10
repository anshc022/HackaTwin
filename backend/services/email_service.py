import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.use_gmail = os.getenv('USE_GMAIL_SMTP', 'false').lower() == 'true'
        
        if self.use_gmail:
            # Gmail SMTP configuration
            self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
            self.smtp_port = int(os.getenv('SMTP_PORT', '587'))
            self.from_email = os.getenv('FROM_EMAIL')
            self.email_password = os.getenv('EMAIL_PASSWORD')
        else:
            # SendGrid configuration
            self.sg = SendGridAPIClient(api_key=os.getenv('SENDGRID_API_KEY'))
            self.from_email = os.getenv('FROM_EMAIL')
    
    def send_email(self, to_email: str, subject: str, content: str) -> dict:
        """
        Send email using Gmail SMTP or SendGrid
        """
        if self.use_gmail:
            return self._send_gmail(to_email, subject, content)
        else:
            return self._send_sendgrid(to_email, subject, content)
    
    def _send_gmail(self, to_email: str, subject: str, content: str) -> dict:
        """
        Send email using Gmail SMTP
        """
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = self.from_email
            msg['To'] = to_email
            
            # Create HTML and plain text parts
            html_part = MIMEText(content, 'html')
            text_part = MIMEText(content.replace('<br>', '\n').replace('<p>', '').replace('</p>', '\n'), 'plain')
            
            msg.attach(text_part)
            msg.attach(html_part)
            
            # Send email
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.from_email, self.email_password)
                server.send_message(msg)
            
            return {
                "status": "success",
                "message": "Email sent successfully via Gmail SMTP",
                "method": "gmail_smtp"
            }
            
        except Exception as e:
            print(f"Error sending email via Gmail: {e}")
            return {
                "status": "error",
                "message": str(e),
                "method": "gmail_smtp"
            }
    
    def _send_sendgrid(self, to_email: str, subject: str, content: str) -> dict:
        """
        Send email using SendGrid
        """
        try:
            message = Mail(
                from_email=self.from_email,
                to_emails=to_email,
                subject=subject,
                html_content=content
            )
            
            response = self.sg.send(message)
            
            return {
                "status": "success",
                "status_code": response.status_code,
                "message": "Email sent successfully via SendGrid",
                "method": "sendgrid"
            }
        except Exception as e:
            print(f"Error sending email via SendGrid: {e}")
            return {
                "status": "error",
                "message": str(e),
                "method": "sendgrid"
            }
    
    def send_bulk_emails(self, emails: list) -> list:
        """
        Send multiple emails
        emails: list of dicts with keys: to_email, subject, content
        """
        results = []
        for email_data in emails:
            result = self.send_email(
                email_data['to_email'],
                email_data['subject'],
                email_data['content']
            )
            result['recipient'] = email_data['to_email']
            results.append(result)
        return results

# Create global instance
email_service = EmailService()

def send_email(to_email: str, subject: str, content: str) -> dict:
    """
    Global helper function for sending emails
    """
    return email_service.send_email(to_email, subject, content)

def send_bulk_emails(emails: list) -> list:
    """
    Global helper function for sending bulk emails
    """
    return email_service.send_bulk_emails(emails)
