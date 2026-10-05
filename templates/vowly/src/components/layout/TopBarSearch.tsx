import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon } from "lucide-react";

interface TopBarSearchProps {
  className?: string;
  onSubmitted?: () => void;
}

export function TopBarSearch({ className = "", onSubmitted }: TopBarSearchProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (query.trim()) next.set("q", query.trim());else
    next.delete("q");
    navigate(`/search?${next.toString()}`);
    onSubmitted?.();
  };

  return (
    <form role="search" onSubmit={handleSubmit} className={`relative items-center ${className}`}>
      <label htmlFor="topbar-search" className="sr-only">
        Search vendors
      </label>
      <SearchIcon aria-hidden="true" className="pointer-events-none absolute left-4 h-4 w-4 text-muted" />
      <input
        id="topbar-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search vendors, styles or cities"
        className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm text-ink placeholder:text-muted/80 transition-colors hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
      
    </form>);

}