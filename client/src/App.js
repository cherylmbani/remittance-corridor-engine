import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountriesPage from './pages/CountryPage';
import CorridorsPage from './pages/CorridorPage';
import RatesPage from './pages/RatesPage';
import TransactionsPage from './pages/TransactionsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Routes>
          <Route path='/' element={<CountriesPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/corridors" element={<CorridorsPage />} />
          <Route path="/rates" element={<RatesPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
