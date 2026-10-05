import React, { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { BriefcaseIcon, ClipboardListIcon, InboxIcon, MessagesSquareIcon } from 'lucide-react';
import { InboxList } from '../components/inbox/InboxList';
import { TransactionDetail } from '../components/inbox/TransactionDetail';
import { AuthPrompt } from '../components/ui/AuthPrompt';
import { Button } from '../components/ui/Button';
import { ButtonLink } from '../components/ui/ButtonLink';
import { EmptyState } from '../components/ui/EmptyState';
import { useApp } from '../hooks/useApp';
import { cn } from '../utils/styles';
import { needsAction } from '../utils/transactions';

type Tab = 'jobs' | 'offers';

export function Inbox() {
  const { txId } = useParams();
  const [params] = useSearchParams();
  const { user, transactions, getTransaction, enableRole } = useApp();

  const selected = txId ? getTransaction(txId) : undefined;
  const paramTab = params.get('tab');
  const tab: Tab =
  paramTab === 'jobs' || paramTab === 'offers' ?
  paramTab :
  selected && user && selected.proId === user.id ?
  'offers' :
  'jobs';

  const lists = useMemo(() => {
    if (!user) return { jobs: [], offers: [] };
    const sorted = [...transactions].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    return {
      jobs: sorted.filter((t) => t.customerId === user.id),
      offers: sorted.filter((t) => t.proId === user.id)
    };
  }, [transactions, user]);

  if (!user) {
    return <AuthPrompt title="Log in to see your inbox" description="Your jobs, offers and conversations live here." />;
  }

  const isPro = user.roles.includes('pro');
  const isCustomer = user.roles.includes('customer');
  const items = lists[tab];
  const counts = {
    jobs: lists.jobs.filter((t) => needsAction(t, user.id)).length,
    offers: lists.offers.filter((t) => needsAction(t, user.id)).length
  };

  let listBody: React.ReactNode;
  if (tab === 'offers' && !isPro) {
    listBody =
    <EmptyState
      className="m-4"
      icon={<BriefcaseIcon className="h-5 w-5" />}
      title="You’re not a pro yet"
      description="Add a pro profile to browse jobs and send offers."
      action={<Button onClick={() => enableRole('pro')}>Add pro profile</Button>} />;


  } else if (tab === 'jobs' && !isCustomer) {
    listBody =
    <EmptyState
      className="m-4"
      icon={<ClipboardListIcon className="h-5 w-5" />}
      title="Need something done?"
      description="Post a job and offers from local pros will show up here."
      action={<Button onClick={() => enableRole('customer')}>Enable posting jobs</Button>} />;


  } else if (items.length === 0) {
    listBody =
    <EmptyState
      className="m-4"
      icon={<InboxIcon className="h-5 w-5" />}
      title={tab === 'jobs' ? 'No offers yet' : 'No offers sent'}
      description={tab === 'jobs' ? 'Post a job and pros will start sending you offers.' : 'Browse open jobs and send your first offer.'}
      action={
      tab === 'jobs' ? <ButtonLink to="/post-job">Post a job</ButtonLink> : <ButtonLink to="/search">Find work</ButtonLink>
      } />;


  } else {
    listBody = <InboxList items={items} selectedId={selected?.id} tab={tab} />;
  }

  return (
    <div className="mx-auto max-w-[1440px] lg:px-8 lg:py-6">
      <div className="grid min-h-[calc(100vh-4rem)] overflow-hidden border-ink-200 bg-white lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[380px_minmax(0,1fr)] lg:rounded-2xl lg:border lg:shadow-card">
        <div className={cn('flex flex-col border-ink-200 lg:border-r', selected && 'hidden lg:flex')}>
          <div className="border-b border-ink-200 px-4 pb-0 pt-5">
            <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">Inbox</h1>
            <nav className="mt-4 flex gap-1" aria-label="Inbox sections">
              {(['jobs', 'offers'] as Tab[]).map((t) =>
              <Link
                key={t}
                to={`/inbox?tab=${t}`}
                aria-current={tab === t ? 'page' : undefined}
                className={cn(
                  'relative flex items-center gap-2 px-3 pb-3 pt-1 text-sm font-bold transition-colors',
                  tab === t ? 'text-ink-900' : 'text-ink-500 hover:text-ink-800'
                )}>
                
                  {t === 'jobs' ? 'My jobs' : 'My offers'}
                  {counts[t] > 0 &&
                <span className="rounded-full bg-primary-600 px-1.5 py-0.5 text-[11px] leading-none text-white">{counts[t]}</span>
                }
                  {tab === t && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary-600" aria-hidden="true" />}
                </Link>
              )}
            </nav>
          </div>
          <p className="border-b border-ink-100 bg-ink-50 px-4 py-2 text-xs text-ink-600">
            {tab === 'jobs' ? 'Offers pros have sent on jobs you posted.' : 'Offers you’ve sent on other customers’ jobs.'}
          </p>
          <div className="flex-1 overflow-y-auto">{listBody}</div>
        </div>

        <div className={cn('bg-ink-50/60', !selected && 'hidden lg:block')}>
          {selected && (selected.customerId === user.id || selected.proId === user.id) ?
          <TransactionDetail key={selected.id} tx={selected} tab={tab} /> :

          <div className="flex h-full items-center justify-center p-8">
              <EmptyState
              className="max-w-md"
              icon={<MessagesSquareIcon className="h-5 w-5" />}
              title={txId ? 'Conversation not found' : 'Select a conversation'}
              description="Pick a job or offer on the left to see the offer history, chat and next steps." />
            
            </div>
          }
        </div>
      </div>
    </div>);

}