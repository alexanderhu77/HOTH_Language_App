import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Post from './components/post.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className = 'App'> 
      <h1>Recordings</h1>
      <div className='posts'>
        <Post />
      </div>


    </div>
  )
}

export default App
