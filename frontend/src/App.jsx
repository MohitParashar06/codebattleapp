// src/App.jsx
import React from 'react'
import { Routes, Route } from "react-router-dom";
import HomePage_M from './Pages/HomePage_M'
import CodeEditor_K from './Pages/CodeEditor_K';
import Login_Page_K from './Pages/Login_Page_K';
import Signup_Page_K from './Pages/Signup_Page_K';
import RoomPage from './Pages/RoomPage';
import ListPage from './Pages/Practice_Page';
// import PrivateRoute from './components/PrivateRoute';
import PrivateRoute from './components/privateRoute';
import PublicRoute from './components/PublicRoute';
import Contact_Page from './Pages/Contact_page';
import About_Page from './Pages/About_page';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute>
          <HomePage_M />
        </PrivateRoute>
      } />

      <Route path="/room/:roomId" element={
        <PrivateRoute>
          <RoomPage />
        </PrivateRoute>
      } />

      <Route path="/practice" element={
        <PrivateRoute>
          <ListPage />
        </PrivateRoute>
      } />

      <Route path="/codeEditor" element={
        <PrivateRoute>
          <CodeEditor_K />
        </PrivateRoute>
      } />

      <Route path="/login" element={
        <PublicRoute>
          <Login_Page_K />
        </PublicRoute>
      } />

      <Route path="/signup" element={
        <PublicRoute>
          <Signup_Page_K />
        </PublicRoute>
      } />
      <Route path="/contact" element={<Contact_Page />} />
      <Route path="/about" element={<About_Page />} />
    </Routes>
  )
}

export default App
