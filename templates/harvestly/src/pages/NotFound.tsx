import React from "react";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-24 text-center">
      <p className="font-display text-7xl font-semibold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">This row hasn't been planted</h1>
      <p className="mt-2 text-muted">The page you're looking for doesn't exist.</p>
      <Button to="/" className="mt-8">
        Back to the farm
      </Button>
    </div>);

}