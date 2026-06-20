import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-white/10 py-4">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="font-display text-2xl font-extrabold bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity">
          Wander & Wonder
        </Link>
        <ul className="flex gap-6 items-center">
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/contact', label: 'Contact' },
            { path: '/compose', label: 'Compose' }
          ].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide uppercase px-2 py-1 relative transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
