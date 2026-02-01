import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import ParticleBackground from './components/ParticleBackground';
import SwirlCursor from './components/SwirlCursor';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground relative">
        <ParticleBackground />
        <SwirlCursor />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;

