import os
import base64
from tempfile import NamedTemporaryFile

from openai import OpenAI

from utils.audios import convert_audio_to_mp3


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def convert_audio_to_text(base64_audio: str) -> str:
    """Convert base64 audio (webm) to text via Whisper."""
    audio_bytes = base64.b64decode(base64_audio)
    mp3_audio = await convert_audio_to_mp3(audio_bytes)

    with NamedTemporaryFile(suffix=".mp3", delete=True) as tmp:
        tmp.write(mp3_audio)
        tmp.flush()

        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=open(tmp.name, "rb"),
        )

    return transcription.text 