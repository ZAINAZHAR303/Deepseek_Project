import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebcamFeed from './components/WebcamFeed'
import { UploadFile } from './components/UploadFile'

function App() {
  const [count, setCount] = useState(0)

  
  return (
    <>
      <div>
        <WebcamFeed />

        <UploadFile />
     
      </div>
    </>
  )
}

export default App
