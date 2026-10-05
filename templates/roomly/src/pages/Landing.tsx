import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSearch } from '../components/landing/HeroSearch';
import { PopularCities } from '../components/landing/PopularCities';
import { RoomTypes } from '../components/landing/RoomTypes';
import { HowItWorks } from '../components/landing/HowItWorks';
import { SafetyBand } from '../components/landing/SafetyBand';
import { LandlordCta } from '../components/landing/LandlordCta';
import { ListingCard } from '../components/ListingCard';
import { useApp } from '../contexts/AppContext';

export function Landing() {
  const { listings } = useApp();
  const latest = [...listings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);

  return (
    <>
      <HeroSearch />
      <PopularCities />
      <RoomTypes />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="latest-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="latest-heading" className="text-3xl font-bold tracking-tight text-navy-900">
              Just listed
            </h2>
            <p className="mt-2 text-navy-600">Fresh rooms available for the coming months.</p>
          </div>
          <Link to="/s?sort=newest" className="shrink-0 text-sm font-semibold text-primary-700 hover:text-primary-800">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((l) =>
          <ListingCard key={l.id} listing={l} />
          )}
        </div>
      </section>
      <HowItWorks />
      <SafetyBand />
      <LandlordCta />
    </>);

}