
import React, { useState } from "react";
import "./Chatbot.scss";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 Welcome to SkyScanner. How can I help you with your travel plans?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://skyscanner-chatbot-api.onrender.com/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply || "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Sorry, I couldn't connect to the assistant. Please check that the backend is running and try again.",
        },
      ]);
      console.error("Chatbot request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <h3>SkyScanner Assistant</h3>
              <span>Your travel helper</span>
            </div>

            <button
              type="button"
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`chatbot-message ${item.sender}`}
              >
                {item.text}
              </div>
            ))}

            {loading && (
              <div className="chatbot-message bot">
                Thinking...
              </div>
            )}
          </div>

          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about your trip..."
              aria-label="Your message"
              maxLength={2000}
              disabled={loading}
            />

            <button type="submit" disabled={loading || !message.trim()}>
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        {isOpen ? "×" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;