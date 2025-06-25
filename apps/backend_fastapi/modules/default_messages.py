import os
from utils.files import read_json_transcript, audio_file_to_base64

# Only check for the OpenAI key now; ElevenLabs is no longer used.
openai_api_key = os.getenv("OPENAI_API_KEY")

audio_dir = os.path.join(os.path.dirname(__file__), "../..", "backend", "audios")

def _audio_path(filename: str) -> str:
    return os.path.join(audio_dir, filename)

async def send_default_messages(user_message: str):
    messages = None
    # Return no default messages when starting the conversation.
    if not user_message:
        return None

    # If the OpenAI API key is missing, inform the user.
    if not openai_api_key:
        messages = [
            {
                "text": "OpenAI API key is missing. Please add it to continue.",
                "facialExpression": "sad",
                "animation": "Idle",
            }
        ]
        return messages


default_response = [
    {
        "text": "I'm sorry, there seems to be an error with my brain, or I didn't understand. Could you please repeat your question?",
        "facialExpression": "sad",
        "animation": "Idle",
    },
] 