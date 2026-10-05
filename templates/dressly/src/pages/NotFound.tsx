import React from 'react';
import { Link } from 'react-router-dom';
import { btn } from '../utils/styles';

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="font-display text-8xl italic text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl">This page went to the ball without us.</h1>
      <p className="mt-3 text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className={btn('primary', 'md')}>Go home</Link>
        <Link to="/s" className={btn('outline', 'md')}>Browse dresses</Link>
      </div>
    </div>);

}