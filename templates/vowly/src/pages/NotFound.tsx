import React from "react";
import { HeartCrackIcon } from "lucide-react";
import { EmptyState } from "../components/ui/EmptyState";
import { ButtonLink } from "../components/ui/ButtonLink";

export function NotFound() {
  return (
    <div className="mx-auto max-w-content px-4 py-24 sm:px-6 lg:px-8">
      <EmptyState
        icon={HeartCrackIcon}
        title="This page left the party"
        description="The page you're looking for doesn't exist or has moved."
        action={
        <div className="flex gap-3">
            <ButtonLink to="/">Back home</ButtonLink>
            <ButtonLink to="/search" variant="secondary">Browse vendors</ButtonLink>
          </div>
        } />
      
    </div>);

}