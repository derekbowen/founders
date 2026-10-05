import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarCheckIcon, CheckIcon, FileTextIcon, MessageSquareIcon, SearchXIcon, ShieldCheckIcon } from 'lucide-react';
import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { EmptyState } from '../components/EmptyState';
import { useApp } from '../contexts/AppContext';
import { buttonStyles } from '../utils/styles';
import { formatDate, formatMoney, formatMonths } from '../utils/format';

const nextSteps = [
{ icon: <MessageSquareIcon size={18} />, title: 'The landlord replies', text: 'Most landlords reply within 24 hours. We\'ll notify you by email.' },
{ icon: <CalendarCheckIcon size={18} />, title: 'Schedule a viewing', text: 'Visit in person or arrange a live video call to see the room.' },
{ icon: <FileTextIcon size={18} />, title: 'Agree offline', text: 'Sign the contract and pay the deposit directly with the landlord.' }];


export function InquirySent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inquiries, getListing, getUser } = useApp();
  const inquiry = inquiries.find((i) => i.id === id);
  const listing = inquiry ? getListing(inquiry.listingId) : undefined;
  const landlord = inquiry ? getUser(inquiry.landlordId) : undefined;

  if (!inquiry || !listing) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <EmptyState
          icon={<SearchXIcon size={26} />}
          title="We couldn't find this inquiry"
          action={<Link to="/inbox" className="font-semibold text-primary-700">Go to inbox →</Link>} />
        
      </div>);

  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-400 text-navy-900">
          
          <CheckIcon size={32} strokeWidth={3} />
        </motion.div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-navy-900">Inquiry sent!</h1>
        <p className="mx-auto mt-2 max-w-md text-navy-600">
          {landlord ? `${landlord.name.split(' ')[0]} has` : 'The landlord has'} received your message. You'll find the
          conversation in your inbox.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-navy-100 bg-white">
        <div className="flex gap-4 p-5">
          <img src={listing.images[0]} alt="" className="h-24 w-28 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-navy-500">
              {listing.neighborhood}, {listing.city}
            </p>
            <Link to={`/l/${listing.id}`} className="mt-1 line-clamp-2 font-semibold text-navy-900 hover:text-primary-700">
              {listing.title}
            </Link>
            {landlord &&
            <div className="mt-2 flex items-center gap-2 text-sm text-navy-600">
                <Avatar name={landlord.name} alt={landlord.name} size="xs" />
                {landlord.name} · replies {landlord.responseTime}
              </div>
            }
          </div>
        </div>
        <dl className="grid grid-cols-2 border-t border-navy-100 sm:grid-cols-4">
          {[
          { label: 'Move-in', value: formatDate(inquiry.moveIn) },
          { label: 'Stay', value: formatMonths(inquiry.stayMonths) },
          { label: 'Monthly rent', value: formatMoney(listing.rent) },
          { label: 'Bills', value: listing.billsIncluded ? 'Included' : `~${formatMoney(listing.billsEstimate)}` }].
          map((d, i) =>
          <div key={d.label} className={`p-4 ${i > 0 ? 'sm:border-l' : ''} ${i % 2 === 1 ? 'border-l' : ''} border-navy-100`}>
              <dt className="text-xs text-navy-500">{d.label}</dt>
              <dd className="mt-0.5 font-semibold text-navy-900">{d.value}</dd>
            </div>
          )}
        </dl>
        <div className="border-t border-navy-100 bg-navy-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">Your message</p>
          <p className="mt-1.5 text-sm text-navy-800">“{inquiry.messages[0]?.text}”</p>
        </div>
      </div>

      <section className="mt-10" aria-labelledby="next-heading">
        <h2 id="next-heading" className="text-lg font-semibold text-navy-900">
          What happens next
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {nextSteps.map((s, i) =>
          <li key={s.title} className="rounded-2xl border border-navy-100 bg-white p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-100 text-primary-800">{s.icon}</span>
                <span className="text-xs font-bold text-navy-400">STEP {i + 1}</span>
              </div>
              <h3 className="mt-3 font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-1 text-sm text-navy-600">{s.text}</p>
            </li>
          )}
        </ol>
      </section>

      <p className="mt-6 flex items-start gap-3 rounded-2xl bg-coral-50 p-4 text-sm text-coral-900">
        <ShieldCheckIcon size={18} className="mt-0.5 shrink-0 text-coral-600" aria-hidden />
        Never transfer money before you've seen the room and received a written contract.
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="large" className={buttonStyles.primary} onClick={() => navigate(`/inbox/${inquiry.id}`)}>
          View conversation
        </Button>
        <Button size="large" className={buttonStyles.outline} onClick={() => navigate('/s')}>
          Keep browsing
        </Button>
      </div>
    </div>);

}