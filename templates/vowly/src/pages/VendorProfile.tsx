import React from "react";
import { useParams } from "react-router-dom";
import { CalendarIcon, LanguagesIcon, MapPinIcon, PencilIcon, PlusIcon, StarIcon, UserXIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { reviews as allReviews } from "../data/reviews";
import { getOwner, getVendorById, getVendorsByOwner } from "../utils/vendors";
import { formatDate } from "../utils/format";
import { Avatar } from "../components/ui/Avatar";
import { ButtonLink } from "../components/ui/ButtonLink";
import { EmptyState } from "../components/ui/EmptyState";
import { VendorCard } from "../components/vendor/VendorCard";
import { ReviewsList } from "../components/listing/ReviewsList";

export function VendorProfile() {
  const { ownerId = "" } = useParams();
  const { user } = useAuth();
  const owner = getOwner(ownerId);

  if (!owner) {
    return (
      <div className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-8">
        <EmptyState icon={UserXIcon} title="Profile not found" description="This vendor profile doesn't exist or is no longer public." action={<ButtonLink to="/search">Browse vendors</ButtonLink>} />
      </div>);

  }

  const listings = getVendorsByOwner(owner.id);
  const listingIds = listings.map((l) => l.id);
  const reviews = allReviews.filter((r) => listingIds.includes(r.vendorId));
  const totalReviews = listings.reduce((sum, l) => sum + l.reviewCount, 0);
  const avgRating = listings.length ? listings.reduce((sum, l) => sum + l.rating * l.reviewCount, 0) / Math.max(totalReviews, 1) : 0;
  const isSelf = user?.ownerId === owner.id;
  const firstName = owner.name.split(" ")[0];

  const stats = [
  { label: "Listings", value: `${listings.length}` },
  { label: "Reviews", value: `${totalReviews}` },
  { label: "Avg. rating", value: avgRating ? avgRating.toFixed(2) : "—" },
  { label: "Responds", value: listings[0]?.responseTime.replace("within ", "< ") ?? "—" }];


  return (
    <div>
      <section className="border-b border-line bg-blush/40">
        <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-end lg:px-8 lg:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Avatar name={owner.name} size="xl" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">{owner.role}</p>
              <h1 className="mt-1 font-display text-5xl font-semibold leading-tight text-ink sm:text-6xl">{owner.name}</h1>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <li className="flex items-center gap-1.5"><MapPinIcon aria-hidden="true" className="h-4 w-4" />{owner.city}, CA</li>
                <li className="flex items-center gap-1.5"><CalendarIcon aria-hidden="true" className="h-4 w-4" />Member since {formatDate(owner.memberSince, "MMMM yyyy")}</li>
                <li className="flex items-center gap-1.5"><LanguagesIcon aria-hidden="true" className="h-4 w-4" />{owner.languages.join(", ")}</li>
              </ul>
            </div>
          </div>
          {isSelf &&
          <div className="flex flex-wrap gap-3">
              <ButtonLink to="/account/contact" variant="secondary"><PencilIcon aria-hidden="true" className="h-4 w-4" />Edit account</ButtonLink>
              <ButtonLink to="/listings/new"><PlusIcon aria-hidden="true" className="h-4 w-4" />New listing</ButtonLink>
            </div>
          }
        </div>
      </section>

      <div className="mx-auto grid max-w-content gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-line bg-surface p-6">
            <h2 className="font-display text-2xl font-semibold text-ink">About {firstName}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/85">{owner.bio}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            {stats.map((s) =>
            <div key={s.label} className="rounded-2xl border border-line bg-surface p-4">
                <dt className="text-xs text-muted">{s.label}</dt>
                <dd className="mt-1 flex items-center gap-1 font-display text-2xl font-semibold text-ink">
                  {s.label === "Avg. rating" && <StarIcon aria-hidden="true" className="h-4 w-4 fill-gold text-gold" />}
                  {s.value}
                </dd>
              </div>
            )}
          </dl>
        </aside>

        <div>
          <section aria-labelledby="listings-title">
            <h2 id="listings-title" className="mb-6 font-display text-3xl font-semibold text-ink">
              {isSelf ? "Your listings" : `Listings by ${firstName}`}
            </h2>
            {listings.length === 0 ?
            <EmptyState icon={PlusIcon} title="No listings yet" description="Listings will appear here once they're published." action={isSelf ? <ButtonLink to="/listings/new">Create a listing</ButtonLink> : undefined} /> :

            <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                {listings.map((v) =>
              <li key={v.id}><VendorCard vendor={v} /></li>
              )}
              </ul>
            }
          </section>

          <section aria-labelledby="profile-reviews-title" className="mt-14 border-t border-line pt-10">
            <h2 id="profile-reviews-title" className="mb-6 font-display text-3xl font-semibold text-ink">Reviews from couples</h2>
            <ReviewsList reviews={reviews} showVendorName={listings.length > 1 ? (id) => getVendorById(id)?.name : undefined} />
          </section>
        </div>
      </div>
    </div>);

}