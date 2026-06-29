import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, AlertCircle, Calendar, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Greetings, traveler. I am **Brown tree**, your dedicated Luxe Sanctuary concierge. Which exquisite location do you prefer to explore?\n\n- **OOTY**\n- **KOTHAGIRI**\n- **KODAIKANAL**",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState<"OOTY" | "KOTHAGIRI" | "KODAIKANAL" | null>(null);

  // Booking Flow States
  const [bookingProperty, setBookingProperty] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, bookingProperty]);

  // Handle unread counts
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].sender === "bot") {
      setUnreadCount((prev) => prev + 1);
    }
  }, [messages, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setError(null);
    const newMessages = [...messages, { sender: "user", text: trimmed } as Message];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred while calling the concierge.");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.text || "I apologize, but I could not formulate a response at this moment." }]);
    } catch (err: any) {
      console.error("ChatBot error:", err);
      let errMsg = err.message || "An error occurred.";
      if (errMsg.includes("GEMINI_API_KEY")) {
        errMsg = "I require a Gemini API Key to function. Please add your GEMINI_API_KEY in the Settings > Secrets panel of your AI Studio workspace to begin chatting.";
      }
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: "OOTY" | "KOTHAGIRI" | "KODAIKANAL") => {
    setSelectedLocation(location);
    const userMsg: Message = { sender: "user", text: location };
    
    let botText = "";
    if (location === "OOTY") {
      botText = "Excellent choice. Here are our premier properties in **OOTY**:\n\n1. **THE ABODE BY BROWN TREE**\n2. **The Earthy Nest by Brown Tree**\n3. **Tea Leaf Stays by Brown Tree Resorts**\n\nClick on any property below to explore its luxurious details!";
    } else if (location === "KOTHAGIRI") {
      botText = "Excellent choice. Here is our retreat in **KOTHAGIRI**:\n\n- **Humming Bird by Brown Tree Resorts**\n\nClick below to explore its details!";
    } else if (location === "KODAIKANAL") {
      botText = "Excellent choice. Here is our resort in **KODAIKANAL**:\n\n- **Hotel Vetrivel International by Brown Tree Resorts**\n\nClick below to explore details!";
    }

    const botMsg: Message = { sender: "bot", text: botText };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleSelectProperty = (propertyName: string) => {
    setSelectedLocation(null);
    setBookingProperty(propertyName);
    const userMsg: Message = { sender: "user", text: `I prefer ${propertyName}` };
    const botMsg: Message = { 
      sender: "bot", 
      text: `Splendid! Let's arrange your reservation at **${propertyName}**.\n\nPlease select your preferred dates and guest count in the form below:` 
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleBookNowSubmit = () => {
    if (!checkIn || !checkOut) {
      setError("Please select both Check-In and Check-Out dates.");
      return;
    }
    setError(null);

    const userMsgText = `Confirm booking for ${bookingProperty} from ${checkIn} to ${checkOut} (${adults} Adults, ${children} Children)`;
    const userMsg: Message = { sender: "user", text: userMsgText };
    
    const confirmationId = `BT-${Math.floor(100000 + Math.random() * 900000)}`;
    const botMsgText = `🎉 **Reservation Confirmed!**\n\nYour stay at **${bookingProperty}** has been successfully booked.\n\n**Booking Summary:**\n- **Property:** ${bookingProperty}\n- **Check-in:** ${checkIn}\n- **Check-out:** ${checkOut}\n- **Guests:** ${adults} Adult(s), ${children} Child(ren)\n- **Confirmation ID:** \`${confirmationId}\`\n\nOur hospitality host will contact you shortly to coordinate luxury transfers and personalized check-in privileges. We look forward to welcoming you! 🌿`;
    
    const botMsg: Message = { sender: "bot", text: botMsgText };
    
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setBookingProperty(null);
    setCheckIn("");
    setCheckOut("");
    setAdults(2);
    setChildren(0);
  };

  // Simple formatter to support basic Markdown like bolding (**) and lists
  const formatMessage = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      // Check for bullet lists
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const cleanLine = isBullet ? line.trim().substring(2) : line;

      // Handle Bold formatting (**text**)
      const parts = cleanLine.split(/\*\*([\s\S]*?)\*\*/g);
      const content = parts.map((part, index) => {
        if (index % 2 === 1) {
          return <strong key={index} className="font-semibold text-brand-dark">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc text-sm leading-relaxed mb-1 text-gray-700">
            {content}
          </li>
        );
      }

      return (
        <p key={lineIdx} className="text-sm leading-relaxed mb-2 text-gray-700 last:mb-0">
          {content}
        </p>
      );
    });
  };

  return (
    <div id="chatbot-container" className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-drawer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-[380px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-850 px-5 py-4 flex items-center justify-between border-b border-stone-800 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/30">
                  <Sparkles className="w-4 h-4 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-white">Brown tree</h3>
                  <p className="text-[10px] text-stone-400 font-medium tracking-wider uppercase">Luxe Sanctuary Concierge</p>
                </div>
              </div>
              <button
                id="chatbot-close-btn"
                onClick={handleOpenToggle}
                className="p-1.5 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
                title="Minimize chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 bg-stone-50 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      msg.sender === "user"
                        ? "bg-stone-800 text-white rounded-br-none"
                        : "bg-white text-stone-800 border border-stone-100 rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    ) : (
                      formatMessage(msg.text)
                    )}
                  </div>
                </div>
              ))}

              {/* Interactive Location Preference Selector */}
              {messages.length === 1 && !selectedLocation && !isLoading && (
                <div className="space-y-2 animate-fade-in pl-1">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Select a Preferred Destination:</p>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectLocation("OOTY")}
                      className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🌲</span>
                        <div>
                          <p className="text-xs font-semibold text-stone-850">OOTY</p>
                          <p className="text-[10px] text-stone-500">The Abode, Earthy Nest & Tea Leaf Stays</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">SELECT →</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectLocation("KOTHAGIRI")}
                      className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">⛰️</span>
                        <div>
                          <p className="text-xs font-semibold text-stone-850">KOTHAGIRI</p>
                          <p className="text-[10px] text-stone-500">Humming Bird Resorts</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">SELECT →</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectLocation("KODAIKANAL")}
                      className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">🌊</span>
                        <div>
                          <p className="text-xs font-semibold text-stone-850">KODAIKANAL</p>
                          <p className="text-[10px] text-stone-500">Hotel Vetrivel International</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">SELECT →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-options for Selected Location */}
              {selectedLocation && !isLoading && (
                <div className="space-y-2 animate-fade-in pl-1">
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2">Select a stay to reserve:</p>
                  <div className="flex flex-col gap-2">
                    {selectedLocation === "OOTY" && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSelectProperty("THE ABODE BY BROWN TREE")}
                          className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">🏡</span>
                            <div>
                              <p className="text-xs font-semibold text-stone-850">THE ABODE BY BROWN TREE</p>
                              <p className="text-[10px] text-stone-500">Luxury colonial heritage stay</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">BOOK →</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectProperty("The Earthy Nest by Brown Tree")}
                          className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">🍃</span>
                            <div>
                              <p className="text-xs font-semibold text-stone-850">The Earthy Nest by Brown Tree</p>
                              <p className="text-[10px] text-stone-500">Eco-luxury mountain view cabins</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">BOOK →</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectProperty("Tea Leaf Stays by Brown Tree Resorts")}
                          className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">🌱</span>
                            <div>
                              <p className="text-xs font-semibold text-stone-850">Tea Leaf Stays by Brown Tree Resorts</p>
                              <p className="text-[10px] text-stone-500">High-altitude luxury tea estate stays</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">BOOK →</span>
                        </button>
                      </>
                    )}

                    {selectedLocation === "KOTHAGIRI" && (
                      <button
                        type="button"
                        onClick={() => handleSelectProperty("Humming Bird by Brown Tree Resorts")}
                        className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">🐦</span>
                          <div>
                            <p className="text-xs font-semibold text-stone-850">Humming Bird by Brown Tree Resorts</p>
                            <p className="text-[10px] text-stone-500">Scenic valley-view suites & trails</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">BOOK →</span>
                      </button>
                    )}

                    {selectedLocation === "KODAIKANAL" && (
                      <button
                        type="button"
                        onClick={() => handleSelectProperty("Hotel Vetrivel International by Brown Tree Resorts")}
                        className="w-full text-left bg-white hover:bg-stone-100 border border-stone-150 hover:border-stone-300 p-3 rounded-xl transition-all duration-300 flex items-center justify-between shadow-sm cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">🏨</span>
                          <div>
                            <p className="text-xs font-semibold text-stone-850">Hotel Vetrivel International by Brown Tree Resorts</p>
                            <p className="text-[10px] text-stone-500">Premium luxury stays near the lake</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-stone-600 group-hover:translate-x-1 transition-transform">BOOK →</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedLocation(null)}
                      className="w-full text-center hover:bg-stone-100 border border-dashed border-stone-200 p-2 rounded-xl transition-all text-[11px] font-medium text-stone-500 cursor-pointer"
                    >
                      ← Back to Locations
                    </button>
                  </div>
                </div>
              )}

              {/* Interactive Booking details & Guest count form */}
              {bookingProperty && !isLoading && (
                <div className="bg-white border border-stone-200/85 rounded-2xl p-4 shadow-md space-y-3.5 animate-fade-in pl-1">
                  <div className="flex items-center space-x-2 text-stone-850 border-b border-stone-100 pb-2">
                    <Calendar className="w-4 h-4 text-stone-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-700">Reservation Form</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Check-In</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-stone-400 focus:bg-white transition-all text-stone-800"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Check-Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full text-xs bg-stone-50 border border-stone-200 rounded-lg p-2 outline-none focus:border-stone-400 focus:bg-white transition-all text-stone-800"
                        min={checkIn || new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Adults</label>
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                          className="px-2.5 py-1 text-stone-500 hover:bg-stone-200 text-sm font-bold transition-all cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-semibold text-stone-850">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(prev => Math.min(10, prev + 1))}
                          className="px-2.5 py-1 text-stone-500 hover:bg-stone-200 text-sm font-bold transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Children</label>
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setChildren(prev => Math.max(0, prev - 1))}
                          className="px-2.5 py-1 text-stone-500 hover:bg-stone-200 text-sm font-bold transition-all cursor-pointer"
                        >
                          -
                        </button>
                        <span className="flex-1 text-center text-xs font-semibold text-stone-850">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(prev => Math.min(10, prev + 1))}
                          className="px-2.5 py-1 text-stone-500 hover:bg-stone-200 text-sm font-bold transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setBookingProperty(null)}
                      className="flex-1 border border-stone-200 hover:bg-stone-100 text-stone-600 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleBookNowSubmit}
                      className="flex-[2] bg-stone-800 hover:bg-stone-900 text-white py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer text-center"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              )}

              {/* Server/API Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-start space-x-2.5 text-red-800">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-semibold">Concierge Connection Error</p>
                    <p className="leading-relaxed">{error}</p>
                  </div>
                </div>
              )}

              {/* Typing/Loading State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-stone-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              id="chatbot-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-4 bg-white border-t border-gray-100 flex items-center space-x-2"
            >
              <input
                id="chatbot-input-field"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Brown tree a question..."
                disabled={isLoading}
                className="flex-1 text-sm bg-stone-50 hover:bg-stone-100/50 focus:bg-white text-stone-800 border border-stone-200 focus:border-stone-400 focus:ring-1 focus:ring-stone-400 rounded-xl px-4 py-2.5 outline-none transition-all disabled:opacity-50"
              />
              <button
                id="chatbot-submit-btn"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-stone-800 hover:bg-stone-900 text-white p-2.5 rounded-xl disabled:opacity-40 disabled:hover:bg-stone-800 transition-all flex items-center justify-center shrink-0"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        id="chatbot-trigger-btn"
        onClick={handleOpenToggle}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 relative select-none cursor-pointer ${
          isOpen
            ? "bg-stone-850 rotate-90 scale-95"
            : "bg-gradient-to-tr from-stone-900 to-stone-850 hover:shadow-2xl hover:scale-105"
        }`}
        title="Chat with Brown tree"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            {/* Unread dot */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border border-white">
                {unreadCount}
              </span>
            )}
            {/* Soft pulsing halo */}
            {!isOpen && messages.length === 1 && (
              <span className="absolute inset-0 rounded-full border border-stone-900/40 animate-ping opacity-75"></span>
            )}
          </>
        )}
      </button>
    </div>
  );
}
