import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Home() {
  const [posts, setPosts] = useState([]);
  const [startingContent, setStartingContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts || []);
        setStartingContent(data.startingContent || '');
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Banner / Hero Section */}
      <div className="relative rounded-2xl overflow-hidden min-h-[260px] flex items-center justify-center text-center p-8 bg-gradient-to-br from-indigo-950/40 to-fuchsia-950/30 border border-white/10 shadow-2xl shadow-indigo-500/5 mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0b0f19_100%)]"></div>
        <div className="relative z-10 max-w-xl">
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3 tracking-tight bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            Welcome to Wander & Wonder!
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-medium">
            Your journey of creativity and stories starts here.
          </p>
        </div>
      </div>

      <h1 className="font-display text-3xl font-bold mb-4 tracking-tight text-white border-b border-white/10 pb-2">Home</h1>
      <p className="text-slate-400 text-base leading-relaxed max-w-3xl mb-10">{startingContent}</p>

      {loading ? (
        <p className="text-slate-500">Loading blog posts...</p>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 bg-slate-900/30 border border-white/5 rounded-xl">
          <p className="text-slate-500 mb-4">No posts found. Start composing to share your first story!</p>
          <Link to="/compose" className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-indigo-600/25">
            Create a Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {posts.map(post => (
            <div className="relative bg-slate-900/40 backdrop-blur-sm border border-white/5 hover:border-indigo-500/30 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/5 group" key={post._id}>
              {/* Highlight bar on card left */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-indigo-500 to-fuchsia-500 rounded-l-xl opacity-80"></div>
              <h2 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors duration-200">{post.title}</h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
                {post.content && post.content.length > 300 
                  ? `${post.content.substring(0, 300)}...` 
                  : post.content}
              </p>
              <Link to={`/posts/${post._id}`} className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-fuchsia-400 transition-colors">
                Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
