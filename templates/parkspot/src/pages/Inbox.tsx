import React from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon, MessagesSquareIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { TransactionList } from '../components/inbox/TransactionList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { RequireAuth } from '../components/common/RequireAuth';
import { EmptyState } from '../components/common/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionsContext';
import type { InboxTab } from '../types/transaction';

export function Inbox() {
  return (
    <RequireAuth title="Log in to see your inbox">
      <InboxContent />
    </RequireAuth>);

}

function InboxContent() {
  const { txId } = useParams();
  const [params] = useSearchParams();
  const location = useLocation();
  const { currentUser } = useAuth();
  const { transactions } = useTransactions();
  const me = currentUser?.id ?? '';

  const parking = transactions.filter((t) => t.customerId === me);
  const hosting = transactions.filter((t) => t.providerId === me);
  const selected = transactions.find((t) => t.id === txId);
  const tab: InboxTab =
  params.get('tab') as InboxTab | null ?? (selected && selected.providerId === me ? 'hosting' : 'parking');
  const pendingHosting = hosting.filter((t) => t.status === 'Requested').length;
  const justBooked = (location.state as {justBooked?: boolean;} | null)?.justBooked;

  return (
    <div className="w-full bg-canvas">
      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid min-h-[calc(100vh-4rem)] lg:min-h-0 lg:grid-cols-[380px_minmax(0,1fr)] lg:gap-6">
          <aside className={`border-line bg-surface lg:self-start lg:rounded-2xl lg:border ${selected ? 'hidden lg:block' : 'block'}`}>
            <div className="px-4 pb-2 pt-5">
              <h1 className="text-2xl font-bold tracking-tight">Inbox</h1>
            </div>
            <Tabs key={tab} defaultTab={tab} variant="underlined">
              <TabList className="px-4">
                <Tab id="parking" badge={<CountPill n={parking.length} />}>
                  Parking
                </Tab>
                <Tab id="hosting" badge={<CountPill n={pendingHosting} highlight />}>
                  Hosting
                </Tab>
              </TabList>
              <TabPanel id="parking">
                <TransactionList items={parking} tab="parking" selectedId={txId} />
              </TabPanel>
              <TabPanel id="hosting">
                <TransactionList items={hosting} tab="hosting" selectedId={txId} />
              </TabPanel>
            </Tabs>
          </aside>

          <section className={`px-4 py-5 sm:px-0 lg:py-0 ${selected ? 'block' : 'hidden lg:block'}`} aria-label="Conversation">
            {selected ?
            <>
                <Link to={`/inbox?tab=${tab}`} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink lg:hidden">
                  <ArrowLeftIcon size={16} aria-hidden /> All messages
                </Link>
                <TransactionDetail key={selected.id} tx={selected} currentUserId={me} justBooked={justBooked} />
              </> :

            <div className="grid h-full min-h-[420px] place-items-center rounded-2xl border border-dashed border-line bg-surface">
                <EmptyState
                icon={<MessagesSquareIcon size={24} aria-hidden />}
                title="Select a reservation"
                text="Choose a booking on the left to view messages, timeline and access details." />
              
              </div>
            }
          </section>
        </div>
      </div>
    </div>);

}

function CountPill({ n, highlight }: {n: number;highlight?: boolean;}) {
  if (!n) return null;
  return (
    <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${highlight ? 'bg-accent text-ink' : 'bg-ink/10 text-ink'}`}>
      {n}
    </span>);

}