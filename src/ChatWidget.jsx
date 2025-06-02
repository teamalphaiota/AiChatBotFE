import { useState } from "react";
import React from "react";

export default function ChatWidget() {
    const [open,setOpen] = useState(false);
    const [messages, setMessages] = useState([{
        from: "bot", text: "Hi! How can i help you today?"
    },]);
    const [input, setInput] = useState("");
    const toggleOpen = () => setOpen(!open);

    const sendMessage = async () => {
    if (!input.trim()) return;

  const userMessage = { from: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const res = await fetch("https://n8nalphaiota.zapto.org/webhook-test/2221ecfa-b01c-4f9c-97b7-39b4f6086f00", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    const aiReply = {
      from: "bot",
      text: data.text || "Something went wrong"
    };

    setMessages((prev) => [...prev, aiReply]);
  } catch (err) {
    console.error("Failed to fetch AI response:", err);
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "Error contacting AI server." }
    ]);
  }
};

   

    return(
        <>
            <button onClick={toggleOpen} className="fixed bottom-6 right-10 border-8 border-blue-200" aria-label="Toggle chat">
                 Chat
            </button>

            {open && (
        <div className="fixed bottom-20 right-6 w-80 max-w-full h-96 bg-white shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-semibold">
            AI Chat
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

        {/* Input */}
          <div className="border-t p-3 flex space-x-2">
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2 focus:outline-blue-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-black px-4 rounded hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
        </>
    )
}