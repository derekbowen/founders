import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheckIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  LanguagesIcon,
  MapPinIcon,
  MessageCircleIcon,
  PencilIcon,
  SearchXIcon,
  WalletIcon } from
'lucide-react';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { ListingCard } from '../components/ListingCard';
import { useApp } from '../contexts/AppContext';
import { buttonStyles, cardStyles } from '../utils/styles';
import { formatDate, formatMoney, formatMonths } from '../utils/format';

export function MyProfileRedirect() {
  const { currentUser } = useApp();
  return <Navigate to={currentUser ? `/u/${currentUser.id}` : '/login?redirect=%2Fprofile'} replace />;
}

export function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUser, listings, currentUser } = useApp();
  const user = id ? getUser(id) : undefined;

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState icon={<SearchXIcon size={26} />} title="Profile not found" action={<Link to="/" className="font-semibold text-primary-700">Go home →</Link>} />
      </div>);

  }

  const isMe = currentUser?.id === user.id;
  const isLandlord = user.type === 'landlord';
  const userListings = listings.filter((l) => l.landlordId === user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className={`${cardStyles} h-fit p-6 lg:sticky lg:top-24`}>
          <div className="flex flex-col items-center text-center">
            <Avatar name={user.name} alt={user.name} size="xl" src={user.avatar} />
            <h1 className="mt-4 text-2xl font-bold text-navy-900">{user.name}</h1>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isLandlord ? 'bg-navy-900 text-white' : 'bg-coral-100 text-coral-800'}`
                }>
                
                {isLandlord ? 'Landlord' : 'Renter'}
              </span>
              {user.verified ?
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-800">
                  <BadgeCheckIcon size={13} aria-hidden /> ID verified
                </span> :

              <span className="rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-semibold text-navy-500">Not verified</span>
              }
            </div>
          </div>
          <ul className="mt-6 space-y-3 border-t border-navy-100 pt-6 text-sm text-navy-700">
            {user.city &&
            <li className="flex items-center gap-3">
                <MapPinIcon size={16} className="text-navy-400" aria-hidden /> Lives in {user.city}
              </li>
            }
            {user.occupation &&
            <li className="flex items-center gap-3">
                <BriefcaseIcon size={16} className="text-navy-400" aria-hidden /> {user.occupation}
              </li>
            }
            <li className="flex items-center gap-3">
              <CalendarIcon size={16} className="text-navy-400" aria-hidden /> Joined {formatDate(user.joined, 'MMMM yyyy')}
            </li>
            <li className="flex items-center gap-3">
              <LanguagesIcon size={16} className="text-navy-400" aria-hidden /> Speaks {user.languages.join(', ')}
            </li>
            {isLandlord &&
            <>
                <li className="flex items-center gap-3">
                  <MessageCircleIcon size={16} className="text-navy-400" aria-hidden /> {user.responseRate}% response rate
                </li>
                <li className="flex items-center gap-3">
                  <ClockIcon size={16} className="text-navy-400" aria-hidden /> Replies {user.responseTime}
                </li>
              </>
            }
          </ul>
          {isMe &&
          <Button
            className={`${buttonStyles.outline} mt-6 w-full`}
            leftIcon={<PencilIcon size={15} />}
            onClick={() => navigate('/account/contact')}>
            
              Account settings
            </Button>
          }
        </aside>

        <div className="space-y-8">
          <section className={`${cardStyles} p-6`}>
            <h2 className="text-lg font-semibold text-navy-900">About {user.name.split(' ')[0]}</h2>
            <p className="mt-3 leading-relaxed text-navy-700">
              {user.bio || (isMe ? 'Add a short bio so landlords and renters get to know you.' : 'No bio yet.')}
            </p>
          </section>

          {!isLandlord &&
          <section className={`${cardStyles} p-6`}>
              <h2 className="text-lg font-semibold text-navy-900">Looking for</h2>
              {user.lookingFor ?
            <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
              { icon: <MapPinIcon size={16} />, label: 'City', value: user.lookingFor.city },
              { icon: <WalletIcon size={16} />, label: 'Budget', value: `up to ${formatMoney(user.lookingFor.budget)}` },
              { icon: <CalendarIcon size={16} />, label: 'Move-in', value: formatDate(user.lookingFor.moveIn) },
              { icon: <ClockIcon size={16} />, label: 'Stay', value: formatMonths(user.lookingFor.stayMonths) }].
              map((d) =>
              <div key={d.label} className="rounded-xl bg-navy-50 p-3">
                      <dt className="flex items-center gap-1.5 text-xs text-navy-500">
                        <span className="text-primary-700">{d.icon}</span>
                        {d.label}
                      </dt>
                      <dd className="mt-1 font-semibold text-navy-900">{d.value}</dd>
                    </div>
              )}
                </dl> :

            <p className="mt-3 text-sm text-navy-500">No search preferences shared yet.</p>
            }
            </section>
          }

          {(isLandlord || userListings.length > 0) &&
          <section>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-navy-900">
                  {isMe ? 'Your listings' : `${user.name.split(' ')[0]}'s rooms`} ({userListings.length})
                </h2>
                {isMe &&
              <Link to="/listings/new" className="text-sm font-semibold text-primary-700 hover:text-primary-800">
                    + New listing
                  </Link>
              }
              </div>
              {userListings.length ?
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {userListings.map((l) =>
              <ListingCard key={l.id} listing={l} />
              )}
                </div> :

            <EmptyState
              className="mt-5"
              icon={<HomeIcon size={26} />}
              title="No rooms listed yet"
              text={isMe ? 'Create your first listing to start receiving inquiries.' : 'Check back later.'}
              action={
              isMe &&
              <Button className={buttonStyles.primary} onClick={() => navigate('/listings/new')}>
                        List a room
                      </Button>

              } />

            }
            </section>
          }
        </div>
      </div>
    </div>);

}