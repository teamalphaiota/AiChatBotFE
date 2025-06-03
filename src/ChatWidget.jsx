import { useState } from "react";
import React from "react";
import "./ChatWidget.css";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const toggleOpen = () => setOpen(!open);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://n8nalphaiota.zapto.org/webhook/2221ecfa-b01c-4f9c-97b7-39b4f6086f00", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiReply = {
        from: "bot",
        text: data.text || "Something went wrong",
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("Failed to fetch AI response:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error contacting AI server." },
      ]);
    }
  };

  return (
    <>
      <button onClick={toggleOpen} className="chat-toggle" aria-label="Toggle chat">
        Chat
      </button>

      {open && (
        <div className="chat-container">
          <div className="chat-header">AI Chat</div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from}`}>
                <span className={`chat-bubble ${msg.from}`}>{msg.text}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} className="chat-send-btn">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}