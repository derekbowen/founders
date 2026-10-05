import React from 'react';
import { Link } from 'react-router-dom';
import { MoonStarIcon } from 'lucide-react';
import { buttonLinkClass } from '../components/ui/BrandButton';

export function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700">
        <MoonStarIcon className="h-8 w-8" aria-hidden />
      </span>
      <h1 className="mt-6 font-heading text-3xl font-bold text-ink-900">This page is taking a nap</h1>
      <p className="mt-3 text-ink-600">We couldn’t find what you were looking for. It may have moved or no longer exists.</p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className={buttonLinkClass('primary')}>Go home</Link>
        <Link to="/s" className={buttonLinkClass('outline')}>Find a sitter</Link>
      </div>
    </div>);

}