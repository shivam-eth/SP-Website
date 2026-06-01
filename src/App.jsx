import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import HomePage from './pages/HomePage';
import ResumePage from './pages/ResumePage';

function App() {
  return (
    <Router>
      <SmoothScroll />
      <Cursor />
      <div className="min-h-screen bg-background text-foreground relative">
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
