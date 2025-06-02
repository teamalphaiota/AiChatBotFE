import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css'
import ChatWidget from './Components/ChatWidget.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ChatWidget />
  </StrictMode>,
)
