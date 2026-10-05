import type { InquiryStatus } from '../types/inquiry';

export const inquiryStatuses: Record<
  InquiryStatus,
  {label: string;description: string;badge: string;dot: string;}> =
{
  sent: {
    label: 'Inquiry sent',
    description: 'Waiting for a reply.',
    badge: 'bg-navy-100 text-navy-800',
    dot: 'bg-navy-400'
  },
  replied: {
    label: 'Replied',
    description: 'The conversation has started.',
    badge: 'bg-primary-100 text-primary-800',
    dot: 'bg-primary-600'
  },
  viewing: {
    label: 'Viewing scheduled',
    description: 'A viewing has been arranged.',
    badge: 'bg-coral-100 text-coral-800',
    dot: 'bg-coral-500'
  },
  agreed: {
    label: 'Agreed offline',
    description: 'Both sides agreed. Contract is signed directly.',
    badge: 'bg-primary-700 text-white',
    dot: 'bg-primary-200'
  },
  closed: {
    label: 'Closed',
    description: 'This inquiry is no longer active.',
    badge: 'bg-navy-50 text-navy-500 ring-1 ring-navy-100',
    dot: 'bg-navy-300'
  }
};

export const statusOrder: InquiryStatus[] = ['sent', 'replied', 'viewing', 'agreed', 'closed'];