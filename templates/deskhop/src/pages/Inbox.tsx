import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircle2Icon, MessagesSquareIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { TransactionList } from '../components/inbox/TransactionList';
import { EmptyState } from '../components/ui/EmptyState';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../contexts/TransactionsContext';

export function Inbox() {
  const { txId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const { transactions } = useTransactions();
  if (!user) return null;

  const bookings = transactions.filter((t) => t.customerId === user.id);
  const hosting = transactions.filter((t) => t.providerId === user.id);
  const selected = transactions.find((t) => t.id === txId);
  const pending = hosting.filter((t) => t.status === 'requested').length;
  const defaultTab = selected && selected.providerId === user.id ? 'hosting' : 'bookings';
  const justBooked = (location.state as {justBooked?: boolean;} | null)?.justBooked;

  return (
    <div className="container-page py-8 lg:py-10">
      <div className={`${txId ? 'hidden lg:block' : ''}`}>
        <h1 className="text-3xl font-semibold">Inbox</h1>
        <p className="mt-1 text-sm text-ink-muted">Your bookings, hosting requests and messages in one place.</p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
        <div className={txId ? 'hidden lg:block' : ''}>
          <Tabs key={defaultTab} defaultTab={defaultTab} variant="underlined">
            <TabList>
              <Tab id="bookings">Bookings ({bookings.length})</Tab>
              <Tab id="hosting">
                Hosting{pending > 0 ? ` · ${pending} new` : ` (${hosting.length})`}
              </Tab>
            </TabList>
            <TabPanel id="bookings" className="pt-4">
              <TransactionList transactions={bookings} role="customer" activeId={txId} />
            </TabPanel>
            <TabPanel id="hosting" className="pt-4">
              <TransactionList transactions={hosting} role="provider" activeId={txId} />
            </TabPanel>
          </Tabs>
        </div>

        <div className={txId ? '' : 'hidden lg:block'}>
          {txId &&
          <Link to="/inbox" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-ink lg:hidden">
              <ArrowLeftIcon size={15} aria-hidden="true" /> All conversations
            </Link>
          }
          {justBooked && selected &&
          <div role="status" className="mb-6 flex items-start gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4">
              <CheckCircle2Icon size={20} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-brand-900">
                  {selected.status === 'confirmed' ? 'Booking confirmed!' : 'Request sent!'}
                </p>
                <p className="text-sm text-brand-800">
                  {selected.status === 'confirmed' ?
                'Your door code and wifi details are below. A receipt is on its way to your inbox.' :
                'The host usually replies within 2 hours. You won’t be charged until they accept.'}
                </p>
              </div>
            </div>
          }
          {selected ?
          <TransactionDetail tx={selected} currentUserId={user.id} /> :

          <EmptyState
            icon={MessagesSquareIcon}
            title={txId ? 'Conversation not found' : 'Select a conversation'}
            description={
            txId ?
            'This booking may have been removed.' :
            'Choose a booking on the left to see details, door access and messages.'
            } />

          }
        </div>
      </div>
    </div>);

}