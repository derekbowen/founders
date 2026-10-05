import React from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../../types/marketplace';
import { brand } from '../../data/brand';
import { formatMoneyExact } from '../../utils/format';

export function SalesStats({ sales }: {sales: Order[];}) {
  const settled = sales.filter((o) => o.status !== 'refunded');
  const gross = settled.reduce((sum, o) => sum + o.amount, 0);
  const net = gross * (1 - brand.commissionRate);
  const downloaded = settled.filter((o) => o.status === 'downloaded').length;

  const stats = [
  { label: 'Net earnings', value: formatMoneyExact(net), highlight: true },
  { label: 'Sales', value: String(settled.length) },
  { label: 'Download rate', value: settled.length ? `${Math.round(downloaded / settled.length * 100)}%` : '—' },
  { label: 'Refunds', value: String(sales.length - settled.length) }];


  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) =>
        <div key={s.label} className={`rounded-xl border border-ink p-4 ${s.highlight ? 'bg-brand' : 'bg-white'}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${s.highlight ? 'text-ink' : 'text-muted'}`}>{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold">{s.value}</p>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-muted">
        Next payout Monday ·{' '}
        <Link to="/account/payouts" className="link">
          Manage payouts
        </Link>
      </p>
    </div>);

}