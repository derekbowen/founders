import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckIcon, MailIcon } from 'lucide-react';
import type { Listing, Order } from '../../types/marketplace';
import { DownloadList } from '../library/DownloadList';
import { formatMoneyExact } from '../../utils/format';

export function DownloadSuccess({ order, listing }: {order: Order;listing: Listing;}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mx-auto max-w-2xl">
      
      <div className="card overflow-hidden shadow-pop">
        <div className="border-b border-ink bg-brand px-6 py-8 text-center sm:px-10">
          <motion.span
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 18 }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-white">
            
            <CheckIcon className="h-8 w-8" strokeWidth={3} aria-hidden="true" />
          </motion.span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Your files are ready!</h1>
          <p className="mt-2 text-ink/80">
            {order.amount === 0 ? 'Enjoy your free download.' : `Paid ${formatMoneyExact(order.amount)}`} · Order {order.id}
          </p>
        </div>
        <div className="space-y-6 p-6 sm:p-10">
          <div className="flex items-center gap-4">
            <img src={listing.cover} alt="" className="h-16 w-20 rounded-lg border border-ink object-cover" />
            <div>
              <p className="font-display text-lg font-semibold leading-snug">{listing.title}</p>
              <p className="text-sm text-muted">
                {listing.files.length} file{listing.files.length > 1 ? 's' : ''} · {listing.fileSize}
              </p>
            </div>
          </div>
          <DownloadList orderId={order.id} files={listing.files} />
          <p className="flex items-center gap-2 rounded-lg bg-paper p-3 text-sm text-muted">
            <MailIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            Receipt and download links sent to <strong className="text-ink">{order.email}</strong>
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to={`/inbox/${order.id}`} className="btn btn-ink flex-1">
              View in library
            </Link>
            <Link to="/s" className="btn btn-outline flex-1">
              Keep browsing
            </Link>
          </div>
        </div>
      </div>
    </motion.div>);

}