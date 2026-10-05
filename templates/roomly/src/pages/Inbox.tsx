import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, InboxIcon, SearchIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { Button } from '../components/Button';
import { EmptyState } from '../components/EmptyState';
import { LoginRequired } from '../components/LoginRequired';
import { InquiryList } from '../components/inbox/InquiryList';
import { useApp } from '../contexts/AppContext';
import { buttonStyles } from '../utils/styles';

export function Inbox() {
  const { currentUser, inquiries } = useApp();
  const navigate = useNavigate();

  if (!currentUser) {
    return <LoginRequired title="Log in to see your inbox" text="Your inquiries and room leads live here." />;
  }

  const mine = inquiries.filter((i) => i.renterId === currentUser.id);
  const leads = inquiries.filter((i) => i.landlordId === currentUser.id);
  const defaultTab = currentUser.type === 'landlord' ? 'leads' : 'mine';

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
      <h1 className="text-3xl font-bold tracking-tight text-navy-900">Inbox</h1>
      <p className="mt-1 text-navy-600">Track every conversation from first message to move-in.</p>

      <div className="mt-8">
        <Tabs key={currentUser.id} defaultTab={defaultTab} variant="underlined">
          <TabList>
            <Tab id="mine" icon={<SearchIcon size={16} />}>
              My inquiries ({mine.length})
            </Tab>
            <Tab id="leads" icon={<HomeIcon size={16} />}>
              Room leads ({leads.length})
            </Tab>
          </TabList>
          <TabPanel id="mine" className="pt-6">
            <InquiryList
              inquiries={mine}
              perspective="renter"
              empty={
              <EmptyState
                icon={<InboxIcon size={26} />}
                title="No inquiries yet"
                text="When you message a landlord about a room, the conversation will appear here."
                action={
                <Button className={buttonStyles.primary} onClick={() => navigate('/s')}>
                      Find a room
                    </Button>
                } />

              } />
            
          </TabPanel>
          <TabPanel id="leads" className="pt-6">
            <InquiryList
              inquiries={leads}
              perspective="landlord"
              empty={
              <EmptyState
                icon={<HomeIcon size={26} />}
                title="No room leads yet"
                text="List a room and inquiries from renters will show up here."
                action={
                <Button className={buttonStyles.primary} onClick={() => navigate('/listings/new')}>
                      List a room
                    </Button>
                } />

              } />
            
          </TabPanel>
        </Tabs>
      </div>
    </div>);

}