import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function About() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then(res => res.json())
      .then(data => setContent(data.aboutContent || ''))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <section className="mt-8">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center mb-12">
          <div>
            <h1 className="font-display text-3xl font-bold mb-4 text-white">About Us</h1>
            <h2 className="font-display text-xl font-semibold mb-3 text-indigo-400">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed mb-4">{content}</p>
          </div>
          <div className="rounded-xl aspect-square border border-white/10 bg-gradient-to-br from-indigo-950/20 to-fuchsia-950/20 flex items-center justify-center shadow-lg">
            <span className="text-7xl select-none filter drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">🌍</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-950/30 to-fuchsia-950/25 border border-white/10 rounded-xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-2 text-white">Ready to Explore?</h2>
          <p className="text-slate-400 text-sm sm:text-base mb-6">Join us on this incredible journey. We have a lot to share with you!</p>
          <Link to="/contact" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/20">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
