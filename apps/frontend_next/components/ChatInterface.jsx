import { useRef, useState, useEffect } from "react";
import { useSpeech } from "../hooks/useSpeech";

export default function ChatInterface({ hidden, ...props }) {
  const input = useRef();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const { tts, loading, message, startRecording, stopRecording, recording, history } = useSpeech();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const sendMessage = () => {
    const text = input.current.value;
    if (!loading && !message) {
      tts(text);
      input.current.value = "";
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pointer-events-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Digital Human
              </h1>
              <p className="text-white/80 text-sm">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    Processing...
                  </span>
                ) : (
                  "Your AI companion awaits your conversation"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Conversation History Sidebar */}
      <div className={`absolute left-6 top-6 bottom-6 transition-all duration-500 ease-in-out pointer-events-auto ${
        isExpanded ? 'translate-x-0' : '-translate-x-96'
      }`}>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl w-96 h-full overflow-hidden relative flex flex-col">
          {/* Sidebar Header */}
          <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white mb-1 text-glow">Chat History</h2>
                <p className="text-white/60 text-sm">Conversation with Jack</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-white/70">Live</span>
              </div>
            </div>
            
            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-purple-500/80 hover:bg-purple-600/80 text-white p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 z-10"
            >
              {isExpanded ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-hidden p-4 flex flex-col min-h-0">
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent space-y-4 pr-2"
              style={{ scrollBehavior: 'smooth' }}
            >
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm">No conversations yet</p>
                  <p className="text-white/40 text-xs mt-1">Start chatting with Jack!</p>
                </div>
              ) : (
                <>
                  {history.map((item, idx) => (
                    <div key={idx} className={`flex ${item.sender === "You" ? "justify-end" : "justify-start"} mb-4`}>
                      <div className={`max-w-[85%] ${item.sender === "You" ? "order-2" : "order-1"}`}>
                        {/* Sender Avatar & Name */}
                        <div className={`flex items-center gap-2 mb-2 ${item.sender === "You" ? "flex-row-reverse" : "flex-row"}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                            item.sender === "You" 
                              ? "bg-purple-500/80 text-white" 
                              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                          }`}>
                            {item.sender === "You" ? "Y" : "J"}
                          </div>
                          <span className={`text-xs font-medium ${
                            item.sender === "You" ? "text-purple-300" : "text-blue-300"
                          }`}>
                            {item.sender === "You" ? "You" : "Jack"}
                          </span>
                          <span className="text-xs text-white/40">
                            {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                        
                        {/* Message Bubble */}
                        <div className={`relative p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                          item.sender === "You" 
                            ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/40 shadow-lg shadow-purple-500/10" 
                            : "bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-blue-500/40 shadow-lg shadow-blue-500/10"
                        }`}>
                          {/* Message tail */}
                          <div className={`absolute top-3 w-0 h-0 ${
                            item.sender === "You" 
                              ? "right-[-8px] border-l-8 border-l-purple-500/40 border-t-8 border-t-transparent border-b-8 border-b-transparent" 
                              : "left-[-8px] border-r-8 border-r-blue-500/40 border-t-8 border-t-transparent border-b-8 border-b-transparent"
                          }`}></div>
                          
                          <p className="text-white text-sm leading-relaxed">{item.text}</p>
                          
                          {/* Message status */}
                          {item.sender === "You" && (
                            <div className="flex justify-end mt-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-white/10 p-4 bg-white/5 flex-shrink-0">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>{history.length} messages</span>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-auto">
        <div className={`transition-all duration-500 ${isExpanded ? 'ml-[25rem]' : 'ml-0'} max-w-4xl mx-auto`}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-4">
            <div className="flex items-center gap-4">
              {/* Microphone Button */}
              <button
                onClick={recording ? stopRecording : startRecording}
                disabled={loading || message}
                className={`relative p-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  recording 
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25" 
                    : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25"
                } ${loading || message ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {recording && (
                  <div className="absolute inset-0 bg-red-500 rounded-xl animate-ping opacity-75"></div>
                )}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 relative z-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                </svg>
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  ref={input}
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Type your message here..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              {/* Send Button */}
              <button
                disabled={loading || message}
                onClick={sendMessage}
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  loading || message 
                    ? "bg-gray-500/50 text-gray-300 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg shadow-blue-500/25"
                }`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Send
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      {(loading || message || recording) && (
        <div className={`absolute top-1/2 right-6 transform -translate-y-1/2 pointer-events-auto transition-all duration-500 ${isExpanded ? 'mr-0' : 'mr-0'}`}>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-4 shadow-2xl">
            <div className="flex items-center gap-3">
              {recording && (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">Recording...</span>
                </>
              )}
              {(loading || message) && (
                <>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">
                    {message ? "Speaking..." : "Thinking..."}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 