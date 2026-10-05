import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchXIcon } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { ListingDetail } from '../components/listing/ListingDetail';
import { listings } from '../data/listings';

export function ListingPage() {
  const { listingId } = useParams();
  const listing = listings.find((l) => l.id === listingId);

  if (!listing) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={<SearchXIcon size={26} />}
          title="Court not found"
          description="This listing may have been removed or the link is incorrect."
          action={<Link to="/search" className="btn btn-primary btn-md">Browse courts</Link>} />
        
      </div>);

  }
  return <ListingDetail key={listing.id} listing={listing} />;
}