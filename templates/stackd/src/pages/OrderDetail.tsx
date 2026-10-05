import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircle2Icon, CircleDotIcon, DownloadIcon, RotateCcwIcon, SearchXIcon } from 'lucide-react';
import { ChatThread } from '../components/library/ChatThread';
import { DownloadList } from '../components/library/DownloadList';
import { Receipt } from '../components/library/Receipt';
import { StatusPill } from '../components/common/StatusPill';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../components/ToastProvider';
import { useStore } from '../contexts/StoreContext';
import { formatDateTime } from '../utils/format';

export function OrderDetail() {
  const { orderId = '' } = useParams();
  const { getOrder, getListing, getCreator, sendMessage, refund } = useStore();
  const { addToast } = useToast();
  const order = getOrder(orderId);
  const listing = order ? getListing(order.listingSlug) : undefined;

  if (!order || !listing) {
    return (
      <div className="container-page py-20">
        <EmptyState icon={SearchXIcon} title="Order not found" body="This order doesn’t exist or belongs to another account." action={<Link to="/inbox" className="btn btn-ink">Back to library</Link>} />
      </div>);

  }

  const creator = getCreator(listing.creatorId);
  const isBuyer = order.role === 'buyer';
  const refunded = order.status === 'refunded';

  const timeline = [
  { icon: CircleDotIcon, label: isBuyer ? 'You purchased this product' : `${order.counterpartyName} purchased`, at: order.createdAt, show: true },
  { icon: DownloadIcon, label: isBuyer ? 'Files downloaded' : 'Buyer downloaded the files', at: order.createdAt, show: order.status === 'downloaded' },
  { icon: RotateCcwIcon, label: 'Payment refunded', at: order.createdAt, show: refunded }].
  filter((t) => t.show);

  return (
    <div className="container-page py-8 md:py-12">
      <Link to={isBuyer ? '/inbox' : '/inbox?tab=sales'} className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold hover:text-brand-ink">
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        {isBuyer ? 'My library' : 'Sales'}
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-6">
          <header className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">{isBuyer ? 'Purchase' : 'Sale'} · {order.id}</p>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{listing.title}</h1>
              <p className="mt-1 text-sm text-muted">
                {isBuyer ? `Sold by ${order.counterpartyName}` : `Bought by ${order.counterpartyName}`} · {formatDateTime(order.createdAt)}
              </p>
            </div>
            <StatusPill status={order.status} />
          </header>

          <ol className="card divide-y divide-line">
            {timeline.map(({ icon: Icon, label, at }) =>
            <li key={label} className="flex items-center gap-3 px-5 py-3.5 text-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-ink bg-brand-soft">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="flex-1 font-medium">{label}</span>
                <span className="text-xs text-muted">{formatDateTime(at)}</span>
              </li>
            )}
          </ol>

          <ChatThread
            messages={order.messages}
            counterpartyName={order.counterpartyName}
            counterpartyAvatar={isBuyer ? creator?.avatar : undefined}
            onSend={(text) => sendMessage(order.id, text)} />
          
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card overflow-hidden">
            <Link to={`/l/${listing.slug}`}>
              <img src={listing.cover} alt={`Cover of ${listing.title}`} className="aspect-[4/3] w-full border-b border-ink object-cover" />
            </Link>
            <div className="space-y-4 p-5">
              {isBuyer ?
              <>
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-base font-bold">Your files</h2>
                    {order.status === 'downloaded' &&
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-success">
                        <CheckCircle2Icon className="h-3.5 w-3.5" aria-hidden="true" /> Downloaded
                      </span>
                  }
                  </div>
                  {refunded ?
                <p className="rounded-lg bg-paper p-3 text-sm text-muted">This order was refunded, so downloads are no longer available.</p> :

                <DownloadList orderId={order.id} files={listing.files} />
                }
                </> :

              <>
                  <h2 className="font-display text-base font-bold">Seller actions</h2>
                  <p className="text-sm text-muted">
                    {refunded ? 'You refunded this order. The buyer can no longer download the files.' : 'Refunding removes access to the files and returns the full amount to the buyer.'}
                  </p>
                  <button
                  type="button"
                  disabled={refunded}
                  onClick={() => {
                    refund(order.id);
                    addToast({ type: 'success', message: `Refund issued to ${order.counterpartyName}` });
                  }}
                  className="btn btn-outline w-full border-danger text-danger hover:bg-danger/5">
                  
                    <RotateCcwIcon className="h-4 w-4" aria-hidden="true" />
                    {refunded ? 'Refunded' : 'Issue refund'}
                  </button>
                </>
              }
            </div>
          </div>
          <Receipt order={order} listing={listing} />
        </aside>
      </div>
    </div>);

}