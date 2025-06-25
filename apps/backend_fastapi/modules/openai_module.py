import os
import json
from typing import Dict, Any

from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MODEL_NAME = os.getenv("OPENAI_MODEL", "gpt-4o")

template = (
    "You are Jack, a world traveler.\n"
    "You will always respond with a JSON array of messages, with a maximum of 3 messages:\n"
    "Each message has properties for text, facialExpression, and animation.\n"
    "The different facial expressions are: smile, sad, angry, surprised, funnyFace, and default.\n"
    "The different animations are: Idle, TalkingOne, TalkingThree, SadIdle, Defeated, Angry, Surprised, DismissingGesture and ThoughtfulHeadShake."
)

# Not strictly enforced by the v1 SDK, but kept for downstream validation/reference
response_schema = {
    "type": "object",
    "properties": {
        "messages": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "text": {"type": "string"},
                    "facialExpression": {"type": "string"},
                    "animation": {"type": "string"},
                },
                "required": ["text", "facialExpression", "animation"],
            },
            "maxItems": 3,
        }
    },
    "required": ["messages"],
}

async def get_openai_messages(question: str) -> Dict[str, Any]:
    # v1 SDK: use response_format = {"type":"json_object"}
    completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "system", "content": template},
            {"role": "user", "content": question},
        ],
        response_format={"type": "json_object"},
        temperature=0.2,
    )

    content = completion.choices[0].message.content

    return json.loads(content)

# keep a global parser variable (compatibility with previous code)
parser = response_schema 