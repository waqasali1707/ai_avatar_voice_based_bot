from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

from modules.openai_module import get_openai_messages, parser
from modules.lip_sync import lip_sync
from modules.default_messages import send_default_messages, default_response
from modules.whisper_module import convert_audio_to_text
from modules.deepgram_tts import get_voices

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TTSRequest(BaseModel):
    message: Optional[str]

class STSRequest(BaseModel):
    audio: str  # base64-encoded string

class Message(BaseModel):
    text: str
    facialExpression: str
    animation: str
    audio: Optional[str] = None
    lipsync: Optional[dict] = None

class TTSResponse(BaseModel):
    messages: List[Message]

@app.get("/voices")
async def voices():
    try:
        return await get_voices()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/tts", response_model=TTSResponse)
async def tts(req: TTSRequest):
    user_message = req.message
    default_messages = await send_default_messages(user_message)
    if default_messages:
        return {"messages": default_messages}

    try:
        openai_messages = await get_openai_messages(user_message)
    except Exception:
        # ensure we always have a dict with a "messages" key
        openai_messages = {"messages": default_response}

    openai_messages["messages"] = await lip_sync(openai_messages["messages"])
    return {"messages": openai_messages["messages"]}

@app.post("/sts", response_model=TTSResponse)
async def sts(req: STSRequest):
    base64_audio = req.audio
    user_message = await convert_audio_to_text(base64_audio)

    try:
        openai_messages = await get_openai_messages(user_message)
    except Exception:
        openai_messages = {"messages": default_response}

    openai_messages["messages"] = await lip_sync(openai_messages["messages"])
    return {"messages": openai_messages["messages"]}

if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True) 