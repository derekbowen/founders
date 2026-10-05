import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, ChevronDownIcon, MapPinIcon, SearchIcon, SparklesIcon } from "lucide-react";
import { categories } from "../../data/categories";
import { locationSuggestions } from "../../data/filters";
import { Button } from "../ui/Button";

const fieldWrap = "relative flex flex-col rounded-xl px-4 py-2.5 transition-colors hover:bg-blush/40 focus-within:bg-blush/40";
const fieldLabel = "text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-dark";
const fieldInput = "mt-0.5 w-full bg-transparent text-sm text-ink placeholder:text-muted/80 focus:outline-none";

export function HeroSearch() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Find wedding vendors"
      className="grid gap-1 rounded-2xl border border-line bg-surface p-2 shadow-soft sm:grid-cols-[1.1fr_1fr_1fr_auto] sm:items-center sm:divide-x sm:divide-line">
      
      <div className={fieldWrap}>
        <label htmlFor="hero-category" className={fieldLabel}>
          <SparklesIcon aria-hidden="true" className="mr-1 inline h-3 w-3" />
          Vendor type
        </label>
        <div className="relative">
          <select
            id="hero-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${fieldInput} cursor-pointer appearance-none pr-6`}>
            
            <option value="">All vendors</option>
            {categories.map((c) =>
            <option key={c.id} value={c.id}>{c.label}</option>
            )}
          </select>
          <ChevronDownIcon aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="hero-location" className={fieldLabel}>
          <MapPinIcon aria-hidden="true" className="mr-1 inline h-3 w-3" />
          Location
        </label>
        <input
          id="hero-location"
          list="hero-locations"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Napa, Sonoma, SF…"
          className={fieldInput} />
        
        <datalist id="hero-locations">
          {locationSuggestions.map((l) =>
          <option key={l} value={l} />
          )}
        </datalist>
      </div>

      <div className={fieldWrap}>
        <label htmlFor="hero-date" className={fieldLabel}>
          <CalendarIcon aria-hidden="true" className="mr-1 inline h-3 w-3" />
          Wedding date
        </label>
        <input
          id="hero-date"
          type="date"
          value={date}
          min="2026-10-01"
          onChange={(e) => setDate(e.target.value)}
          className={`${fieldInput} ${date ? "" : "text-muted/80"}`} />
        
      </div>

      <div className="p-1 sm:pl-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto sm:px-6">
          <SearchIcon aria-hidden="true" className="h-4 w-4" />
          <span>Search</span>
        </Button>
      </div>
    </form>);

}