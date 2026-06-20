import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

function Contact() {
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });

  useEffect(() => {
    fetch(`${API_BASE_URL}/contact`)
      .then(res => res.json())
      .then(data => setContent(data.contactContent || ''))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, message })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to send message");
        return res.json();
      })
      .then(() => {
        setStatus({ type: 'success', text: 'Message sent successfully! Thank you for writing to us.' });
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch(err => {
        console.error(err);
        setStatus({ type: 'error', text: 'Failed to send message. Please try again later.' });
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center max-w-xl mx-auto mb-10 mt-6">
        <h1 className="font-display text-3xl font-bold mb-3 text-white">Contact Us</h1>
        <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
      </div>

      <div className="max-w-lg mx-auto bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 sm:p-10 shadow-lg">
        {status.text && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-semibold border ${
            status.type === 'success' 
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400' 
              : 'bg-red-950/40 border-red-500/30 text-red-400'
          }`}>
            {status.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200" 
              placeholder="Enter your name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200" 
              placeholder="Enter your email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">Message</label>
            <textarea 
              id="message" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200" 
              rows="5" 
              placeholder="Write your message here..." 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 focus:outline-none transition-all duration-200">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
