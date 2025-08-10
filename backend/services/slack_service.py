import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

load_dotenv()

class SlackService:
    def __init__(self):
        self.client = WebClient(token=os.getenv('SLACK_BOT_TOKEN'))
        self.default_channel = os.getenv('SLACK_CHANNEL_ID')
    
    def send_message(self, channel: str, text: str) -> dict:
        """
        Send message to Slack channel
        """
        try:
            response = self.client.chat_postMessage(
                channel=channel,
                text=text
            )
            return {
                "status": "success",
                "message": "Message sent successfully",
                "ts": response["ts"]
            }
        except SlackApiError as e:
            print(f"Error sending Slack message: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def send_dm(self, user_id: str, text: str) -> dict:
        """
        Send direct message to a user
        """
        try:
            # Open a conversation with the user
            conversation = self.client.conversations_open(users=[user_id])
            channel_id = conversation["channel"]["id"]
            
            # Send the message
            response = self.client.chat_postMessage(
                channel=channel_id,
                text=text
            )
            return {
                "status": "success",
                "message": "DM sent successfully",
                "ts": response["ts"]
            }
        except SlackApiError as e:
            print(f"Error sending Slack DM: {e}")
            return {
                "status": "error",
                "message": str(e)
    }
    
    def schedule_message(self, channel: str, text: str, post_at: int) -> dict:
        """
        Schedule a message for later
        """
        try:
            response = self.client.chat_scheduleMessage(
                channel=channel,
                text=text,
                post_at=post_at
            )
            return {
                "status": "success",
                "message": "Message scheduled successfully",
                "scheduled_message_id": response["scheduled_message_id"]
            }
        except SlackApiError as e:
            print(f"Error scheduling Slack message: {e}")
            return {
                "status": "error",
                "message": str(e)
            }

# Create global instance
slack_service = SlackService()

def send_slack_message(channel: str, text: str) -> dict:
    """
    Global helper function for sending Slack messages
    """
    return slack_service.send_message(channel, text)

def send_slack_dm(user_id: str, text: str) -> dict:
    """
    Global helper function for sending Slack DMs
    """
    return slack_service.send_dm(user_id, text)
