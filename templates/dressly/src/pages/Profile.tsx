import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, ShirtIcon, StarIcon, UserXIcon } from 'lucide-react';
import { ListingCard } from '../components/ListingCard';
import { EmptyState } from '../components/EmptyState';
import { UserAvatar } from '../components/UserAvatar';
import { Stars } from '../components/Stars';
import { brand } from '../data/brand';
import { getUser, listingsByLender, reviewsForLender } from '../utils/lookup';
import { btn, cx, eyebrow } from '../utils/styles';

export function Profile() {
  const { id } = useParams();
  const user = getUser(id);
  const [tab, setTab] = useState<'closet' | 'reviews'>('closet');

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <EmptyState icon={UserXIcon} title="Closet not found" text="This member may have closed their account." action={<Link to="/s" className={btn('primary', 'md')}>Browse dresses</Link>} />
      </div>);

  }

  const isMe = user.id === 'me';
  const closet = listingsByLender(user.id);
  const reviews = reviewsForLender(user.id);

  return (
    <div>
      <section className="border-b border-line bg-cream">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-12 md:flex-row md:items-end md:justify-between md:px-8 md:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <UserAvatar user={user} size="xl" className="ring-4 ring-paper" />
            <div>
              <p className={eyebrow}>{isMe ? 'Your closet' : 'The closet of'}</p>
              <h1 className="mt-2 font-display text-4xl md:text-6xl">{user.name}</h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">
                <span className="flex items-center gap-1.5"><MapPinIcon size={14} aria-hidden="true" /> {user.city}</span>
                <span className="flex items-center gap-1.5"><CalendarIcon size={14} aria-hidden="true" /> Member since {user.joined}</span>
                <span className="flex items-center gap-1.5"><ClockIcon size={14} aria-hidden="true" /> Replies {user.responseTime}</span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            {isMe ?
            <>
                <Link to="/account/contact" className={btn('outline', 'md')}>Edit profile</Link>
                <Link to="/l/new" className={btn('primary', 'md')}>Add a dress</Link>
              </> :

            <Link to="/inbox" className={btn('primary', 'md')}>Message {user.name.split(' ')[0]}</Link>
            }
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 md:px-8 lg:grid-cols-[300px_1fr]">
        <aside className="space-y-8">
          <p className="text-sm leading-relaxed text-ink/85">{user.bio}</p>
          <dl className="grid grid-cols-3 gap-px border border-line bg-line text-center lg:grid-cols-1 lg:text-left">
            {[
            ['Dresses', closet.length],
            ['Rentals', user.rentalsCompleted],
            ['Rating', user.rating.toFixed(1)]].
            map(([k, v]) =>
            <div key={k} className="bg-paper p-4">
                <dt className="text-[11px] uppercase tracking-eyebrow text-muted">{k}</dt>
                <dd className="mt-1 font-display text-3xl">{v}</dd>
              </div>
            )}
          </dl>
          {user.usualSize !== undefined &&
          <p className="flex items-center gap-2 text-sm text-muted">
              <ShirtIcon size={14} aria-hidden="true" /> Usually wears US {user.usualSize}
            </p>
          }
        </aside>

        <section>
          <div role="tablist" className="flex gap-8 border-b border-line">
            {(['closet', 'reviews'] as const).map((t) =>
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cx('-mb-px border-b-2 pb-3 text-sm font-medium capitalize transition', tab === t ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink')}>
              
                {t === 'closet' ? `Closet (${closet.length})` : `Reviews (${reviews.length})`}
              </button>
            )}
          </div>

          <div className="pt-8">
            {tab === 'closet' && (
            closet.length === 0 ?
            <EmptyState
              icon={ShirtIcon}
              title={isMe ? 'Your closet is empty' : 'No dresses listed yet'}
              text={isMe ? 'List your first dress — it takes about 5 minutes.' : `${user.name.split(' ')[0]} rents with ${brand.name} but hasn’t listed anything yet.`}
              action={isMe ? <Link to="/l/new" className={btn('primary', 'md')}>List a dress</Link> : undefined} /> :


            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
                  {closet.map((l) => <ListingCard key={l.id} listing={l} />)}
                </div>)
            }
            {tab === 'reviews' && (
            reviews.length === 0 ?
            <EmptyState icon={StarIcon} title="No reviews yet" text="Reviews from renters will appear here after completed rentals." /> :

            <ul className="divide-y divide-line">
                  {reviews.map((r) => {
                const a = getUser(r.authorId);
                if (!a) return null;
                return (
                  <li key={r.id} className="flex gap-4 py-6">
                        <UserAvatar user={a} size="md" />
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <p className="text-sm font-medium">{a.name}</p>
                            <Stars rating={r.rating} size={12} />
                            <span className="text-xs text-muted">{r.date}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-ink/85">{r.text}</p>
                        </div>
                        {r.photo && <img src={r.photo} alt="" className="hidden h-20 w-16 object-cover object-top sm:block" />}
                      </li>);

              })}
                </ul>)
            }
          </div>
        </section>
      </div>
    </div>);

}