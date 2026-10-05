import React from 'react';
import { Link } from 'react-router-dom';
import { buttonClass } from '../utils/styles';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="grid h-20 w-20 place-items-center rounded-2xl bg-navy text-4xl font-bold text-accent">P?</span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight">This spot doesn’t exist</h1>
      <p className="mt-2 text-muted">The page you’re looking for has moved or never existed.</p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className={buttonClass('primary')}>
          Go home
        </Link>
        <Link to="/s" className={buttonClass('secondary')}>
          Find parking
        </Link>
      </div>
    </div>);

}