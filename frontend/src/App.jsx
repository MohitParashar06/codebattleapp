import React from 'react'
import HomePage_M from './Pages/HomePage_M'
import CodeEditor_K from './Pages/CodeEditor_K';
import Login_Page_K from './Pages/Login_Page_K';
import Signup_Page_K from './Pages/Signup_Page_K';
import './App.css'
import { Routes, Route} from "react-router-dom";
import ListPage from './Pages/Practice_Page';
const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage_M />} />
      <Route path="/codeEditor" element={<CodeEditor_K /> } />
      <Route path="/signup" element={<Signup_Page_K/> } />
      <Route path="/Login" element={<Login_Page_K/> } />
      <Route path='/practice' element={<ListPage/>}/>
    </Routes>
    </>
  )
}

export default App
