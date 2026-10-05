import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { Avatar } from "../ui/Avatar";
import { formatDate } from "../../utils/format";
import type { Owner } from "../../types/marketplace";

export function OwnerCard({ owner, businessName }: {owner: Owner;businessName: string;}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-start">
      <Avatar name={owner.name} size="lg" />
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">Meet the team</p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{owner.name}</h3>
        <p className="text-sm text-muted">
          {owner.role}, {businessName} · Member since {formatDate(owner.memberSince, "yyyy")}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink/85">{owner.bio}</p>
        <Link
          to={`/profile/${owner.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline">
          
          View full profile
          <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </div>);

}