import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
     <div className="text-3xl bg-blue-500 text-white p-4 rounded">
      Hello Tailwind!
    </div>
  )
}

export default App
