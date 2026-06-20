import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Compose() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to save post");
        return res.json();
      })
      .then(() => {
        setStatus({ type: 'success', text: 'Post published successfully! Redirecting...' });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
      .catch(err => {
        console.error(err);
        setStatus({ type: 'error', text: 'Failed to publish post. Please check the backend connection.' });
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="text-center max-w-xl mx-auto mb-10 mt-6">
        <h1 className="font-display text-3xl font-bold mb-2 text-white">Compose a New Post</h1>
        <p className="text-slate-400 text-sm">Share your thoughts, stories, or reflections with the community.</p>
      </div>

      <div className="max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 sm:p-10 shadow-lg">
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
            <label htmlFor="title" className="block text-sm font-semibold text-slate-300 mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200" 
              placeholder="Enter post title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-slate-300 mb-2">Post Content</label>
            <textarea 
              id="content" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200" 
              rows="8" 
              placeholder="Write your post here..." 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:opacity-95 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 focus:outline-none transition-all duration-200">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Compose;
