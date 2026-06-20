import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Compose from './pages/Compose';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
        <Navbar />
        <main className="flex-1 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
          </Routes>
        </main>
        <footer className="bg-slate-950/60 border-t border-white/10 py-6 text-center text-slate-500 text-xs sm:text-sm">
          <div className="max-w-6xl mx-auto px-6">
            <p>&copy; {new Date().getFullYear()} Hariharan R.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
