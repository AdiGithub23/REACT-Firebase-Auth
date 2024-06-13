import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from './components/login.jsx'
import Register from './components/register.jsx'
import Profile from './components/profile.jsx'
import { auth } from "./lib/firebase.js";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
      
    <Router>    
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={user? <Navigate to="/profile" /> : <Login />} />
              <Route path="/login" element={user? <Navigate to="/profile" /> : <Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
    
  )
}

export default App
