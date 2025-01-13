import React from 'react'
import HomePage_M from './Pages/HomePage_M'
import CodeEditor_K from './Pages/CodeEditor_K';
import './App.css'
import { Routes, Route} from "react-router-dom";
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage_M />} />
      <Route path="/codeEditor" element={<CodeEditor_K /> } />
    </Routes>
    </>
  )
}

export default App
