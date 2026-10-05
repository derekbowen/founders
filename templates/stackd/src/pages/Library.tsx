import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { LockIcon, PlusIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { OrderList } from '../components/library/OrderList';
import { SalesStats } from '../components/library/SalesStats';
import { EmptyState } from '../components/common/EmptyState';
import { useStore } from '../contexts/StoreContext';

export function Library() {
  const { user, orders } = useStore();
  const [params] = useSearchParams();
  const initial = params.get('tab') === 'sales' ? 'sales' : 'library';

  if (!user) {
    return (
      <div className="container-page py-20">
        <EmptyState
          icon={LockIcon}
          title="Log in to see your library"
          body="Your purchases, downloads and sales live here."
          action={
          <div className="flex gap-2">
              <Link to="/login" className="btn btn-ink">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Sign up
              </Link>
            </div>
          } />
        
      </div>);

  }

  const purchases = orders.filter((o) => o.role === 'buyer');
  const sales = orders.filter((o) => o.role === 'seller');

  return (
    <div className="container-page py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Inbox</p>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Your library</h1>
          <p className="mt-1 text-muted">Download your files again, grab receipts and chat with creators.</p>
        </div>
        <Link to="/listings/new" className="btn btn-outline btn-sm">
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          New listing
        </Link>
      </div>

      <Tabs key={initial} defaultTab={initial} variant="underlined">
        <TabList>
          <Tab id="library" badge={purchases.length}>
            My library
          </Tab>
          <Tab id="sales" badge={sales.length}>
            Sales
          </Tab>
        </TabList>
        <TabPanel id="library" className="pt-6">
          <OrderList orders={purchases} role="buyer" />
        </TabPanel>
        <TabPanel id="sales" className="pt-6">
          {sales.length > 0 && <SalesStats sales={sales} />}
          <OrderList orders={sales} role="seller" />
        </TabPanel>
      </Tabs>
    </div>);

}