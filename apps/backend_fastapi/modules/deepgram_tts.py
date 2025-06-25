import os
import asyncio
from typing import List

import requests

DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")

DEFAULT_MODEL = os.getenv("DEEPGRAM_TTS_MODEL", "aura-orion-en")

if not DEEPGRAM_API_KEY:
    raise RuntimeError("DEEPGRAM_API_KEY environment variable is required for TTS")


def _synthesize(text: str, model: str = DEFAULT_MODEL, encoding: str = "mp3") -> bytes:
    url = f"https://api.deepgram.com/v1/speak?model={model}&encoding={encoding}"
    headers = {
        "Authorization": f"Token {DEEPGRAM_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {"text": text}

    resp = requests.post(url, headers=headers, json=payload)
    resp.raise_for_status()
    return resp.content


async def convert_text_to_speech(text: str, file_name: str):
    """Generate speech MP3 using Deepgram Aura and save to file (async wrapper)."""

    def _blocking():
        audio_bytes = _synthesize(text)
        with open(file_name, "wb") as f:
            f.write(audio_bytes)

    await asyncio.to_thread(_blocking)


async def get_voices() -> List[dict]:
    """Deepgram voice models with male options."""
    return [
        {"voice_id": "aura-orion-en", "name": "Orion (Male)"},
        {"voice_id": "aura-arcas-en", "name": "Arcas (Male)"},
        {"voice_id": "aura-perseus-en", "name": "Perseus (Male)"},
        {"voice_id": "aura-angus-en", "name": "Angus (Male)"},
        {"voice_id": "aura-asteria-en", "name": "Asteria (Female)"},
        {"voice_id": "aura-athena-en", "name": "Athena (Female)"},
    ] 