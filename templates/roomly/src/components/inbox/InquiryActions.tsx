import React, { useState } from 'react';
import { CalendarPlusIcon, CircleXIcon, HandshakeIcon, PartyPopperIcon } from 'lucide-react';
import { Button } from '../Button';
import { useToast } from '../ToastProvider';
import { useApp } from '../../contexts/AppContext';
import { buttonStyles, fieldStyles } from '../../utils/styles';
import type { Inquiry } from '../../types/inquiry';

export function InquiryActions({ inquiry, isLandlord }: {inquiry: Inquiry;isLandlord: boolean;}) {
  const { setInquiryStatus } = useApp();
  const { addToast } = useToast();
  const [scheduling, setScheduling] = useState(false);
  const [viewingAt, setViewingAt] = useState('');

  if (inquiry.status === 'closed') {
    return <p className="text-sm text-navy-500">This inquiry is closed. No further actions available.</p>;
  }

  if (inquiry.status === 'agreed') {
    return (
      <p className="flex items-start gap-2 rounded-xl bg-primary-50 p-3 text-sm text-primary-900">
        <PartyPopperIcon size={16} className="mt-0.5 shrink-0" aria-hidden />
        You both agreed offline. Sign the contract and arrange the deposit directly.
      </p>);

  }

  if (!isLandlord) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-navy-600">The landlord updates the status as things progress. Changed your plans?</p>
        <Button
          className={`${buttonStyles.outline} w-full`}
          leftIcon={<CircleXIcon size={16} />}
          onClick={() => {
            setInquiryStatus(inquiry.id, 'closed', 'Withdrawn by renter');
            addToast({ type: 'info', message: 'Inquiry withdrawn' });
          }}>
          
          Withdraw inquiry
        </Button>
      </div>);

  }

  return (
    <div className="space-y-2.5">
      {inquiry.status !== 'viewing' && (
      scheduling ?
      <div className="space-y-2 rounded-xl border border-navy-100 p-3">
            <label htmlFor="viewing-at" className={fieldStyles.label}>
              Viewing date & time
            </label>
            <input
          id="viewing-at"
          type="datetime-local"
          value={viewingAt}
          onChange={(e) => setViewingAt(e.target.value)}
          className={fieldStyles.control} />
        
            <div className="flex gap-2">
              <Button
            size="small"
            disabled={!viewingAt}
            className={`${buttonStyles.primary} flex-1 disabled:!opacity-50`}
            onClick={() => {
              setInquiryStatus(inquiry.id, 'viewing', `${viewingAt}:00`);
              setScheduling(false);
              addToast({ type: 'success', message: 'Viewing scheduled' });
            }}>
            
                Confirm
              </Button>
              <Button size="small" className={buttonStyles.ghost} onClick={() => setScheduling(false)}>
                Cancel
              </Button>
            </div>
          </div> :

      <Button
        className={`${buttonStyles.primary} w-full`}
        leftIcon={<CalendarPlusIcon size={16} />}
        onClick={() => setScheduling(true)}>
        
            Schedule viewing
          </Button>)
      }
      <Button
        className={`${inquiry.status === 'viewing' ? buttonStyles.primary : buttonStyles.outline} w-full`}
        leftIcon={<HandshakeIcon size={16} />}
        onClick={() => {
          setInquiryStatus(inquiry.id, 'agreed', 'Contract signed offline');
          addToast({ type: 'success', message: 'Marked as agreed offline' });
        }}>
        
        Mark as agreed offline
      </Button>
      <Button
        className={`${buttonStyles.ghost} w-full !text-coral-700 hover:!bg-coral-50`}
        leftIcon={<CircleXIcon size={16} />}
        onClick={() => {
          setInquiryStatus(inquiry.id, 'closed', 'Closed by landlord');
          addToast({ type: 'info', message: 'Inquiry closed' });
        }}>
        
        Close inquiry
      </Button>
    </div>);

}