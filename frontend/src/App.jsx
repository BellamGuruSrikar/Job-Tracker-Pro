import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from "axios"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import EditJob from './pages/EditJob';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProtectedRoute>
                                  <Dashboard />
                                </ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute>
                                        <Jobs />
                                      </ProtectedRoute>} />
        <Route path="/add-job" element={<ProtectedRoute>
                                          <AddJob />
                                        </ProtectedRoute>} />
        <Route path="/edit-job/:id" element={<ProtectedRoute>
                                                <EditJob/>
                                              </ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;