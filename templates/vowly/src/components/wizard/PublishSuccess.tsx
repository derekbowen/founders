import React from "react";
import { motion } from "framer-motion";
import { CheckIcon, MapPinIcon } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getCategory } from "../../utils/vendors";
import { formatPrice, priceSuffix } from "../../utils/format";
import { ButtonLink } from "../ui/ButtonLink";
import { Button } from "../ui/Button";
import type { ListingWizard } from "./useListingDraft";

export function PublishSuccess({ wizard }: {wizard: ListingWizard;}) {
  const { draft, reset } = wizard;
  const { user } = useAuth();
  const category = draft.category ? getCategory(draft.category) : undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6 lg:py-20">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 14, stiffness: 220 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success text-white">
        
        <CheckIcon aria-hidden="true" className="h-7 w-7" />
      </motion.span>
      <h1 className="mt-6 font-display text-5xl font-semibold text-ink">Your listing is submitted</h1>
      <p className="mt-3 text-base text-muted">Our team reviews new listings within one business day. You'll get an email the moment it's live.</p>

      <article className="mt-10 overflow-hidden rounded-3xl border border-line bg-surface text-left shadow-soft">
        {draft.photos[0] && <img src={draft.photos[0]} alt="" className="aspect-[16/9] w-full object-cover" />}
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-dark">{category?.singular}</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink">{draft.businessName}</h2>
          <p className="mt-1 text-sm text-ink/80">{draft.tagline}</p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-1 text-muted">
              <MapPinIcon aria-hidden="true" className="h-4 w-4" />
              {draft.baseCity}
            </span>
            <span>
              <span className="text-muted">From </span>
              <span className="font-semibold text-ink">{formatPrice(Number(draft.startingPrice))}</span>
              <span className="text-muted"> {priceSuffix(draft.priceUnit)}</span>
            </span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {draft.styles.map((s) =>
            <span key={s} className="rounded-full bg-blush/60 px-3 py-1 text-xs font-medium text-ink">{s}</span>
            )}
          </div>
        </div>
      </article>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        {user?.ownerId && <ButtonLink to={`/profile/${user.ownerId}`}>View your vendor profile</ButtonLink>}
        <ButtonLink to="/inbox/leads" variant="secondary">Go to vendor leads</ButtonLink>
        <Button variant="ghost" onClick={reset}>Create another listing</Button>
      </div>
    </div>);

}