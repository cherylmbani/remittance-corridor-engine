import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CountriesPage from './pages/CountryPage';
import CorridorsPage from './pages/CorridorPage';
import RatesPage from './pages/RatesPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup'; // Fixed import name
import LogoutPage from './pages/Logout';

function App() {
  const [user, setUser] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar user={user} setUser={setUser} />

        <Routes>
          {/* Public routes (accessible without login) */}
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage setUser={setUser} />} />
          <Route path="/logout" element={<LogoutPage setUser={setUser} />} />

          {/* Protected routes (require login) */}
          <Route path="/" element={
            user ? <CountriesPage /> : <Navigate to="/login" />
          } />
          <Route path="/countries" element={
            user ? <CountriesPage /> : <Navigate to="/login" />
          } />
          <Route path="/corridors" element={
            user ? <CorridorsPage /> : <Navigate to="/login" />
          } />
          <Route path="/rates" element={
            user ? <RatesPage /> : <Navigate to="/login" />
          } />
          <Route path="/transactions" element={
            user ? <TransactionsPage /> : <Navigate to="/login" />
          } />

          {/* Catch all - redirect to login if not authenticated */}
          <Route path="*" element={
            user ? <Navigate to="/countries" /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;