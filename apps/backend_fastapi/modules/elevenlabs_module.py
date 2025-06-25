import os
import asyncio
from typing import List

from elevenlabs.client import ElevenLabs, AsyncElevenLabs

ELEVEN_LABS_API_KEY = os.getenv("ELEVEN_LABS_API_KEY")
VOICE_ID = os.getenv("ELEVEN_LABS_VOICE_ID")
MODEL_ID = os.getenv("ELEVEN_LABS_MODEL_ID", "eleven_multilingual_v2")

# Sync client for simple blocking calls (wrapped in asyncio.to_thread)
_client = ElevenLabs(api_key=ELEVEN_LABS_API_KEY)

async def convert_text_to_speech(text: str, file_name: str):
    """Generate speech MP3 and write to file_name (async-friendly)."""

    def _generate_and_save():
        audio_bytes = _client.text_to_speech.convert(
            text=text,
            voice_id=VOICE_ID,
            model_id=MODEL_ID,
            output_format="mp3_44100_128",
        )
        with open(file_name, "wb") as f:
            f.write(audio_bytes)

    # Run blocking IO in separate thread
    await asyncio.to_thread(_generate_and_save)

async def get_voices() -> List[dict]:
    """Return list of available voices (id & name)."""
    voices_response = _client.voices.search()
    return [
        {"voice_id": v.voice_id, "name": v.name, "labels": v.labels}
        for v in voices_response.voices
    ] 