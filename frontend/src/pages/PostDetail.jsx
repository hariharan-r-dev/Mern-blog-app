import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching post detail:", err);
        setError("Unable to find the specified blog post.");
        setLoading(false);
      });
  }, [postId]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-slate-400 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading post...</p>
      ) : error ? (
        <div className="bg-red-950/40 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg font-medium">{error}</div>
      ) : post ? (
        <article className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-2xl p-8 sm:p-12 shadow-xl">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold mb-6 text-white leading-tight">{post.title}</h1>
          <div className="text-slate-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </article>
      ) : null}
    </div>
  );
}

export default PostDetail;
