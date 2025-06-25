import json
from subprocess import CalledProcessError, run
from typing import Any
from pathlib import Path
import base64

async def exec_command(command: str):
    try:
        result = run(command, shell=True, check=True, capture_output=True, text=True)
        return result.stdout
    except CalledProcessError as e:
        raise RuntimeError(e.stderr)

aSYNC_READ_JSON_BLOCK_SIZE = 65536

async def read_json_transcript(file_path: str | Path) -> Any:
    path = Path(file_path)
    data = path.read_text()
    return json.loads(data)

async def audio_file_to_base64(file_path: str | Path) -> str:
    path = Path(file_path)
    data = path.read_bytes()
    return base64.b64encode(data).decode() 