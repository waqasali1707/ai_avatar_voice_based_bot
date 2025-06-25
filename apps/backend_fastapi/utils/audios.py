from pathlib import Path
from tempfile import TemporaryDirectory
from subprocess import run, CalledProcessError

async def convert_audio_to_mp3(audio_data: bytes) -> bytes:
    """Receives audio data in webm (default from MediaRecorder) and converts it to mp3 using ffmpeg."""
    with TemporaryDirectory() as dir_path:
        input_path = Path(dir_path) / "input.webm"
        output_path = Path(dir_path) / "output.mp3"
        input_path.write_bytes(audio_data)
        try:
            run(["ffmpeg", "-i", str(input_path), str(output_path)], check=True, capture_output=True)
        except CalledProcessError as e:
            raise RuntimeError(e.stderr.decode())
        mp3_bytes = output_path.read_bytes()
    return mp3_bytes 