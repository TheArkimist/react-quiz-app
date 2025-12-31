import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <main className='w-full min-h-screen flex justify-center items-center bg-linear-150 from-purple-600 to-pink-500 relative'>
          <Home />
          
        </main>
      </Router>
    </>
  )
}

export default App
