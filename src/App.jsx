import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <h1>This is my project</h1>
    </>
  )
}

export default App
