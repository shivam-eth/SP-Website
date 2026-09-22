import React, { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import SmoothScroll from './components/SmoothScroll';
import Cursor from './components/Cursor';
import HomePage from './pages/HomePage';

// The resume is a separate route and does not need to parse on first paint.
const ResumePage = lazy(() => import('./pages/ResumePage'));

function App() {
  return (
    <Router>
      <SmoothScroll />
      <Cursor />
      <div className="min-h-screen bg-background text-foreground relative">
        <AnimatePresence mode="wait">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
