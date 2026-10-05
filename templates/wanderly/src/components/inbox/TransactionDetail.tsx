import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeftIcon, BackpackIcon, CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ChatThread } from './ChatThread';
import { Timeline } from './Timeline';
import { MapView } from '../map/MapView';
import { Button } from '../ui/Button';
import { useTransactions } from '../../contexts/TransactionsContext';
import type { Transaction } from '../../types/marketplace';
import { getExperience } from '../../utils/lookup';
import { formatDate, formatPrice, formatTime, pluralize } from '../../utils/format';
import { buildTimeline, statusMeta } from '../../utils/transactions';

interface TransactionDetailProps {
  tx: Transaction;
  backTo: string;
}

export function TransactionDetail({ tx, backTo }: TransactionDetailProps) {
  const { sendMessage, setStatus } = useTransactions();
  const exp = getExperience(tx.experienceId);
  if (!exp) return null;

  const closed = tx.status === 'cancelled' || tx.status === 'refunded';
  const card = 'rounded-2xl border border-slate-200 bg-white p-5';

  const actions = () => {
    if (tx.role === 'hosting' && tx.status === 'booked') {
      return (
        <>
          <Button size="sm" variant="outline" onClick={() => {setStatus(tx.id, 'cancelled');toast('Booking declined. The guest has been refunded.');}}>Decline</Button>
          <Button size="sm" variant="accent" onClick={() => {setStatus(tx.id, 'confirmed');toast.success('Booking confirmed');}}>Accept booking</Button>
        </>);

    }
    if (tx.role === 'trip' && (tx.status === 'booked' || tx.status === 'confirmed')) {
      return (
        <Button size="sm" variant="outline" onClick={() => {setStatus(tx.id, 'refunded');toast.success('Booking cancelled — full refund issued');}}>
          Cancel booking
        </Button>);

    }
    if (tx.status === 'completed' && tx.role === 'trip') {
      return <Button size="sm" onClick={() => toast.success('Thanks! Your review has been posted.')}>Leave a review</Button>;
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <Link to={backTo} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 lg:hidden" aria-label="Back to inbox">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <img src={exp.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-base font-semibold text-slate-900">
              <Link to={`/l/${exp.id}`} className="hover:text-primary-700">{exp.title}</Link>
            </h2>
            <StatusBadge status={tx.status} />
          </div>
          <p className="text-sm text-slate-600">
            {tx.role === 'trip' ? 'Hosted by' : 'Guest:'} {tx.counterpartName} · {statusMeta[tx.status].description}
          </p>
        </div>
        <div className="flex gap-2">{actions()}</div>
      </div>

      <div className="grid flex-1 gap-5 overflow-y-auto bg-sand-50 p-4 sm:p-6 xl:grid-cols-[1fr_340px]">
        <div className="min-h-[420px]">
          <ChatThread messages={tx.messages} counterpartName={tx.counterpartName} onSend={(t) => sendMessage(tx.id, t)} disabled={closed} />
        </div>
        <div className="space-y-5">
          <section className={card} aria-labelledby="tl-title">
            <h3 id="tl-title" className="mb-4 text-sm font-semibold text-slate-900">Booking timeline</h3>
            <Timeline steps={buildTimeline(tx)} />
          </section>
          <section className={card} aria-labelledby="bd-title">
            <h3 id="bd-title" className="mb-3 text-sm font-semibold text-slate-900">Booking details</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-slate-500" aria-hidden />{formatDate(tx.date, 'EEEE, MMMM d, yyyy')}</li>
              <li className="flex items-center gap-2"><ClockIcon className="h-4 w-4 text-slate-500" aria-hidden />{formatTime(tx.time)}</li>
              <li className="flex items-center gap-2"><UsersIcon className="h-4 w-4 text-slate-500" aria-hidden />{pluralize(tx.guests, 'guest')}{tx.privateGroup && ' · Private group'}</li>
            </ul>
            <p className="mt-4 flex justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-slate-900">
              <span>{tx.role === 'trip' ? 'Total paid' : 'Booking total'}</span>
              <span>{formatPrice(tx.total, true)}</span>
            </p>
          </section>
          <section className={card} aria-labelledby="mp-title">
            <h3 id="mp-title" className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPinIcon className="h-4 w-4 text-primary-600" aria-hidden />Meeting point
            </h3>
            <p className="text-sm text-slate-700">{exp.meetingPoint.name}</p>
            <p className="text-xs text-slate-500">{exp.meetingPoint.address}</p>
            <MapView
              variant="dot"
              zoom={15}
              markers={[{ id: 'mp', lat: exp.meetingPoint.lat, lng: exp.meetingPoint.lng }]}
              ariaLabel="Meeting point map"
              className="mt-3 h-40 overflow-hidden rounded-xl border border-slate-200" />
            
            <p className="mt-2 text-xs text-slate-600">{exp.meetingPoint.instructions}</p>
          </section>
          <section className={card} aria-labelledby="wtb-title">
            <h3 id="wtb-title" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <BackpackIcon className="h-4 w-4 text-primary-600" aria-hidden />What to bring
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {exp.whatToBring.map((w) => <li key={w}>{w}</li>)}
            </ul>
          </section>
        </div>
      </div>
    </div>);

}