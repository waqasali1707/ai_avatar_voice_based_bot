# 🤖 Digital Human - AI Talking Avatar

A stunning AI-powered talking avatar application featuring **Jack**, a world traveler who can engage in natural conversations with realistic speech, facial expressions, and lip synchronization.

![Digital Human Preview](https://github.com/asanchezyali/talking-avatar-with-ai/assets/29262782/da316db9-6dd1-4475-9fe5-39dafbeb3cc4)

## ✨ Features

### 🎭 **Realistic 3D Avatar**
- **3D Character**: Fully rigged 3D avatar with facial expressions and animations
- **Facial Expressions**: Dynamic emotions (smile, sad, angry, surprised, funnyFace)
- **Lip Synchronization**: Precise mouth movements with Rhubarb Lip-Sync
- **Natural Animations**: Idle, talking, gestures, and emotional states
- **Floating Animation**: Subtle movement for liveliness

### 🎙️ **Voice & Speech**
- **Male Voice**: Professional Deepgram Aura Orion voice by default
- **Multiple Voice Options**: Orion, Arcas, Perseus, Angus (male) + female options
- **Speech-to-Text**: OpenAI Whisper for voice input
- **Text-to-Speech**: Deepgram Aura for natural voice output
- **Bi-directional Communication**: Text and voice input support

### 🎨 **Modern UI Design**
- **Glass Morphism**: Beautiful translucent panels with backdrop blur
- **Dark Theme**: Elegant gradient backgrounds with floating particles
- **Animated Interface**: Smooth transitions and hover effects
- **Responsive Design**: Works on desktop and mobile devices
- **Status Indicators**: Real-time feedback for recording/thinking/speaking

### 💬 **Enhanced Chat Experience**
- **Fancy Sidebar**: Collapsible chat history with WhatsApp-style bubbles
- **Message Types**: Distinguished You vs Jack messages with colors
- **Auto-scroll**: Automatically shows latest messages
- **Timestamps**: Message timing for each conversation
- **Live Status**: Online indicators and message counters

### 🧠 **AI Intelligence**
- **OpenAI GPT-4**: Powered by advanced language model
- **Personality**: Jack as a world traveler with rich backstory
- **Structured Responses**: JSON-formatted responses with expressions and animations
- **Context Awareness**: Maintains conversation context

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js       │    │   FastAPI       │    │   External      │
│   Frontend      │    │   Backend       │    │   APIs          │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React 3D      │◄──►│ • OpenAI GPT    │◄──►│ • OpenAI        │
│ • Three.js      │    │ • Deepgram TTS  │    │ • Deepgram      │
│ • Tailwind CSS  │    │ • Whisper STT   │    │ • Rhubarb       │
│ • Glass UI      │    │ • Lip Sync      │    │ • FFmpeg        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### **Frontend (Next.js)**
- **Next.js 13.4.19** - React framework
- **React Three Fiber** - 3D rendering
- **Three.js** - 3D graphics
- **Tailwind CSS** - Styling with custom animations
- **Leva** - Debug controls

### **Backend (FastAPI)**
- **FastAPI** - Modern Python API framework
- **OpenAI** - GPT-4 and Whisper
- **Deepgram** - Text-to-speech
- **Pydantic** - Data validation
- **Asyncio** - Asynchronous processing

### **3D & Animation**
- **GLB/GLTF Models** - 3D avatar assets
- **Morph Targets** - Facial expressions
- **Bone Rigging** - Character animations
- **Rhubarb Lip-Sync** - Precise mouth movements

## 🚀 Getting Started

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Python** (v3.8 or higher)
3. **OpenAI API Key** - [Get one here](https://openai.com/)
4. **Deepgram API Key** - [Get one here](https://deepgram.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/asanchezyali/talking-avatar-with-ai.git
   cd talking-avatar-with-ai
   ```

2. **Install dependencies:**
   ```bash
   # Install root dependencies
   npm install

   # Install frontend dependencies
   cd apps/frontend_next
   npm install
   cd ..

   # Install backend dependencies
   cd backend_fastapi
   pip install -r requirements.txt
   cd ..
   ```

3. **Set up environment variables:**
   ```bash
   # Create .env file in apps/backend_fastapi/
   cd apps/backend_fastapi
   touch .env
   ```

   **Add to `.env` file:**
   ```env
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o

   # Deepgram Configuration  
   DEEPGRAM_API_KEY=your_deepgram_api_key_here
   DEEPGRAM_TTS_MODEL=aura-orion-en

   # Server Configuration
   PORT=3000
   ```

4. **Install Optional Tools (for enhanced lip sync):**

   **Rhubarb Lip-Sync:**
   ```bash
   # Download from: https://github.com/DanielSWolf/rhubarb-lip-sync/releases
   # Extract and place in apps/backend_fastapi/bin/
   ```

   **FFmpeg:**
   ```bash
   # Windows (using Chocolatey)
   choco install ffmpeg

   # Or download from: https://ffmpeg.org/download.html
   ```

### Running the Application

1. **Start the backend:**
   ```bash
   cd apps/backend_fastapi
   python main.py
   ```

2. **Start the frontend:**
   ```bash
   cd apps/frontend_next
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 🎮 Usage

### **Text Chat**
1. Type your message in the input field
2. Press Enter or click Send
3. Watch Jack respond with voice and animations

### **Voice Chat**
1. Click the microphone button
2. Speak your message
3. Click the microphone again to stop recording
4. Jack will process and respond

### **Chat History**
- **Sidebar**: View conversation history with Jack
- **Toggle**: Click the arrow to expand/collapse
- **Auto-scroll**: Latest messages appear automatically
- **Message Types**: Your messages (purple) vs Jack's (blue)

## 🎨 UI Features

### **Glass Morphism Design**
- Translucent panels with backdrop blur
- Gradient borders and subtle shadows
- Modern dark theme with floating particles

### **Interactive Elements**
- Hover effects with scale transforms
- Loading animations with spinning indicators
- Status indicators for all interaction states
- Smooth transitions between UI states

### **Responsive Layout**
- Collapsible sidebar for space management
- Adaptive input area positioning
- Mobile-friendly responsive design

## 🔧 Configuration

### **Voice Options**

**Available Deepgram Voices:**
- `aura-orion-en` - Orion (Male) - Default
- `aura-arcas-en` - Arcas (Male)
- `aura-perseus-en` - Perseus (Male)
- `aura-angus-en` - Angus (Male)
- `aura-asteria-en` - Asteria (Female)
- `aura-athena-en` - Athena (Female)

**Change voice in `.env`:**
```env
DEEPGRAM_TTS_MODEL=aura-perseus-en
```

### **Avatar Customization**

**Replace 3D Model:**
1. Place your GLB file in `apps/frontend_next/public/models/`
2. Name it `avatar.glb`
3. Ensure it has compatible morph targets for facial animation

**Compatible Model Requirements:**
- GLB/GLTF format
- Rigged with bones for animation
- Morph targets for expressions (mouthOpen, eyeBlink, etc.)
- Viseme targets for lip sync (viseme_AA, viseme_PP, etc.)

## 📁 Project Structure

```
talking-avatar-with-ai/
├── apps/
│   ├── backend_fastapi/           # FastAPI Backend
│   │   ├── modules/               # Core modules
│   │   │   ├── openai_module.py   # GPT-4 integration
│   │   │   ├── deepgram_tts.py    # Text-to-speech
│   │   │   ├── whisper_module.py  # Speech-to-text
│   │   │   ├── lip_sync.py        # Lip synchronization
│   │   │   └── default_messages.py # Fallback responses
│   │   ├── utils/                 # Utility functions
│   │   ├── bin/                   # External tools (Rhubarb)
│   │   ├── main.py               # FastAPI app
│   │   └── requirements.txt      # Python dependencies
│   └── frontend_next/            # Next.js Frontend
│       ├── components/           # React components
│       │   ├── Avatar.jsx        # 3D avatar component
│       │   ├── ChatInterface.jsx # Chat UI
│       │   └── Scenario.jsx      # 3D scene setup
│       ├── constants/            # Configuration
│       │   ├── facialExpressions.js
│       │   ├── morphTargets.js
│       │   └── visemesMapping.js
│       ├── hooks/               # React hooks
│       │   └── useSpeech.jsx    # Speech management
│       ├── pages/               # Next.js pages
│       ├── public/models/       # 3D assets
│       └── styles/              # CSS styles
├── package.json                 # Root package config
└── README.md                   # This file
```

## 🐛 Troubleshooting

### **Common Issues**

**"Rhubarb not recognized" warning:**
- Install Rhubarb Lip-Sync in `apps/backend_fastapi/bin/`
- Install FFmpeg and ensure it's in PATH
- Basic mouth animation will work without Rhubarb

**Avatar not loading:**
- Check that GLB files exist in `apps/frontend_next/public/models/`
- Ensure model has compatible node structure
- Check browser console for specific errors

**API Key errors:**
- Verify OpenAI and Deepgram API keys in `.env`
- Check API key permissions and billing status
- Ensure `.env` file is in `apps/backend_fastapi/` directory

**Connection issues:**
- Backend running on port 3000
- Frontend running on port 3000 (Next.js default)
- Check CORS configuration if accessing from different domain

## 🎯 Performance Tips

1. **Optimize 3D Models**: Keep GLB files under 10MB
2. **Use Efficient Images**: Compress textures and assets
3. **Enable Caching**: Configure proper caching headers
4. **Monitor API Usage**: Track OpenAI and Deepgram usage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Ready Player Me** - For 3D avatar creation tools
- **Deepgram** - For high-quality text-to-speech
- **OpenAI** - For GPT-4 and Whisper APIs
- **Rhubarb Lip-Sync** - For realistic lip synchronization
- **Three.js Community** - For 3D web graphics

## 📞 Support

- **Discord**: [Math & Code Community](https://discord.gg/gJ3vCgSWeh)
- **Issues**: [GitHub Issues](https://github.com/asanchezyali/talking-avatar-with-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/asanchezyali/talking-avatar-with-ai/discussions)

---

**Made with ❤️ by the Digital Human team**
