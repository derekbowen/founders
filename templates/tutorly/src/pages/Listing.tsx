import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserXIcon } from 'lucide-react';
import { ListingContent } from '../components/listing/ListingContent';
import { EmptyState } from '../components/common/EmptyState';
import { getTutorById } from '../utils/tutors';
import { linkButton } from '../utils/buttonStyles';

export function ListingPage() {
  const { tutorId } = useParams();
  const tutor = getTutorById(tutorId);

  if (!tutor) {
    return (
      <div className="mx-auto max-w-page px-4 py-16 sm:px-6">
        <EmptyState
          icon={UserXIcon}
          title="Tutor not found"
          description="This listing may have been closed or the link is incorrect."
          action={<Link to="/search" className={`${linkButton.base} ${linkButton.primary}`}>Browse tutors</Link>} />
        
      </div>);

  }

  return <ListingContent key={tutor.id} tutor={tutor} />;
}