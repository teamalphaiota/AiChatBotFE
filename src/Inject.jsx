import React from "react";
import ReactDOM from "react-dom/client";
import ChatWidget from "./ChatWidget";
import "./index.css"

// Create a container div that will hold the chat widget
const widgetContainer = document.createElement("div");
widgetContainer.id = "ai-chat-widget-root";
document.body.appendChild(widgetContainer);

// Mount React app to that container
const root = ReactDOM.createRoot(widgetContainer);
root.render(<ChatWidget />);