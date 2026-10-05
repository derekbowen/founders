import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import { sports } from '../../data/sports';
import { formatHour, todayKey } from '../../utils/format';

const timeOptions = Array.from({ length: 17 }, (_, i) => i + 6);

export function HeroSearch() {
  const navigate = useNavigate();
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(todayKey());
  const [time, setTime] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (sport) params.set('sport', sport);
    if (location.trim()) params.set('location', location.trim());
    if (date) params.set('date', date);
    if (time) params.set('time', time);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Find a court"
      className="grid gap-2 rounded-2xl bg-white p-3 shadow-2xl sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr_1fr_auto] lg:items-end">
      
      <div>
        <label htmlFor="hero-sport" className="field-label">Sport</label>
        <select id="hero-sport" value={sport} onChange={(e) => setSport(e.target.value)} className="field">
          <option value="">Any sport</option>
          {sports.map((s) =>
          <option key={s.id} value={s.id}>{s.label}</option>
          )}
        </select>
      </div>
      <div>
        <label htmlFor="hero-location" className="field-label">Location</label>
        <input id="hero-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Neighborhood, club or city" className="field" />
      </div>
      <div>
        <label htmlFor="hero-date" className="field-label">Date</label>
        <input id="hero-date" type="date" value={date} min={todayKey()} onChange={(e) => setDate(e.target.value)} className="field" />
      </div>
      <div>
        <label htmlFor="hero-time" className="field-label">Time</label>
        <select id="hero-time" value={time} onChange={(e) => setTime(e.target.value)} className="field">
          <option value="">Any time</option>
          {timeOptions.map((h) =>
          <option key={h} value={h}>{formatHour(h)}</option>
          )}
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-lg sm:col-span-2 lg:col-span-1">
        <SearchIcon size={18} aria-hidden="true" /> Find courts
      </button>
    </form>);

}