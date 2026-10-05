import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { StatusBadge } from '../ui/StatusBadge';
import { NextStepPanel } from './NextStepPanel';
import { ChatThread } from './ChatThread';
import { TransactionTimeline } from './TransactionTimeline';
import { DeliverySection } from './DeliverySection';
import { ProjectBriefCard } from './ProjectBriefCard';
import { useTransactions } from '../../contexts/TransactionsContext';
import { Transaction } from '../../types/marketplace';
import { getListing, getUser } from '../../utils/lookup';
import { roleFor } from '../../utils/txStatus';

export function TransactionDetail({ tx }: {tx: Transaction;}) {
  const { sendMessage, markRead } = useTransactions();
  const role = roleFor(tx);
  const other = getUser(role === 'client' ? tx.freelancerId : tx.clientId);
  const listing = getListing(tx.listingId);

  useEffect(() => {
    markRead(tx.id);
  }, [tx.id, markRead]);

  const showDeliveries = ['accepted', 'delivered', 'completed'].includes(tx.status) || tx.deliveries.length > 0;

  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
        <Link to="/inbox" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden" aria-label="Back to inbox">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <Avatar name={other?.name ?? ''} alt="" src={other?.avatar} size="md" />
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-bold text-slate-900">
            {other && other.isFreelancer ? <Link to={`/u/${other.id}`} className="hover:text-primary-700">{other.name}</Link> : other?.name}
          </h1>
          <p className="truncate text-sm text-slate-500">
            {role === 'client' ? 'Freelancer' : 'Client'} · {listing?.title}
          </p>
        </div>
        <StatusBadge status={tx.status} />
      </header>

      <div className="grid flex-1 gap-6 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          <NextStepPanel key={`${tx.id}-${tx.status}`} tx={tx} role={role} />
          <ChatThread key={tx.id} tx={tx} role={role} onSend={(text) => sendMessage(tx.id, text)} />
        </div>
        <div className="space-y-6">
          <ProjectBriefCard tx={tx} />
          {showDeliveries && <DeliverySection tx={tx} />}
          <TransactionTimeline tx={tx} />
        </div>
      </div>
    </div>);

}