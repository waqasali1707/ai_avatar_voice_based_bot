import asyncio
import os
from pathlib import Path
from utils.files import exec_command, read_json_transcript, audio_file_to_base64
from .deepgram_tts import convert_text_to_speech

MAX_RETRIES = 10
RETRY_DELAY = 0  # in seconds

audio_dir = Path(os.path.dirname(__file__)) / "../.." / "backend" / "audios"

audio_dir.mkdir(parents=True, exist_ok=True)

async def lip_sync(messages):
    # TTS conversion
    async def process_message(index, message):
        file_name = audio_dir / f"message_{index}.mp3"
        for attempt in range(MAX_RETRIES):
            try:
                await convert_text_to_speech(message["text"], str(file_name))
                break
            except Exception as e:
                if attempt < MAX_RETRIES - 1:
                    await asyncio.sleep(RETRY_DELAY)
                else:
                    raise e

    await asyncio.gather(*(process_message(i, m) for i, m in enumerate(messages)))

    # Phoneme extraction & base64 encode
    async def process_phonemes(index, message):
        """Attach base64 audio; attempt phoneme extraction if tools available."""

        file_name_mp3 = audio_dir / f"message_{index}.mp3"
        file_name_wav = audio_dir / f"message_{index}.wav"
        json_path = audio_dir / f"message_{index}.json"

        # Audio is always attached so front-end can play even if lipsync fails
        message["audio"] = await audio_file_to_base64(file_name_mp3)

        # Attempt phoneme extraction only if ffmpeg & rhubarb exist on PATH or given path
        try:
            await exec_command(f"ffmpeg -y -i {file_name_mp3} {file_name_wav}")

            rhubarb_cmd = "bin/rhubarb" if (Path(__file__).parent.parent / "bin" / "rhubarb").exists() else "rhubarb"
            await exec_command(f"{rhubarb_cmd} -f json -o {json_path} {file_name_wav} -r phonetic")

            message["lipsync"] = await read_json_transcript(json_path)
        except Exception as e:
            # Log and continue without lipsync
            print(f"Lip-sync generation skipped for message {index}: {e}")

    await asyncio.gather(*(process_phonemes(i, m) for i, m in enumerate(messages)))

    return messages 