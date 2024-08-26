import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import Home from './pages/Home'

const App = () => {
  return (
    <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
    </div>
  )
}

export default App