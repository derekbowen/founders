import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { CalendarIcon, StoreIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { InboxPane } from '../components/inbox/InboxPane';
import { useBookings } from '../contexts/BookingContext';

export function Inbox() {
  const [params] = useSearchParams();
  const { transactions } = useBookings();
  const txId = params.get('tx');
  const txRole = transactions.find((t) => t.id === txId)?.role;
  const defaultTab = params.get('tab') === 'hosting' || txRole === 'provider' ? 'hosting' : 'games';
  const upcoming = transactions.filter((t) => t.role === 'customer' && t.dayOffset >= 0 && (t.status === 'booked' || t.status === 'confirmed')).length;
  const pending = transactions.filter((t) => t.role === 'provider' && t.status === 'booked').length;

  return (
    <div className="container-page py-8 lg:py-10">
      <h1 className="heading-lg">Inbox</h1>
      <p className="mt-1 text-slate-600">Your games, hosting requests and conversations in one place.</p>
      <div className="mt-6">
        <Tabs key={`${defaultTab}-${txId ?? ''}`} defaultTab={defaultTab} variant="underlined">
          <TabList>
            <Tab id="games" icon={<CalendarIcon size={16} />} badge={upcoming ? <span className="rounded-full bg-brand px-1.5 text-[11px] font-bold text-white">{upcoming}</span> : undefined}>
              My games
            </Tab>
            <Tab id="hosting" icon={<StoreIcon size={16} />} badge={pending ? <span className="rounded-full bg-accent px-1.5 text-[11px] font-bold text-ink">{pending}</span> : undefined}>
              Hosting
            </Tab>
          </TabList>
          <TabPanel id="games">
            <InboxPane role="customer" initialTxId={txId} />
          </TabPanel>
          <TabPanel id="hosting">
            <InboxPane role="provider" initialTxId={txId} />
          </TabPanel>
        </Tabs>
      </div>
    </div>);

}