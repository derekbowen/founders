import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, StarIcon, VideoIcon, XIcon, ClockIcon } from 'lucide-react';
import { Button } from '../Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../Dialog';
import { useToast } from '../ToastProvider';
import { brandButton, linkButton } from '../../utils/buttonStyles';
import type { Lesson, LessonStatus } from '../../types/marketplace';

interface LessonActionsProps {
  lesson: Lesson;
  onStatusChange: (status: LessonStatus, label: string) => void;
  onJoin: () => void;
}

export function LessonActions({ lesson, onStatusChange, onJoin }: LessonActionsProps) {
  const { addToast } = useToast();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const first = lesson.counterpartName.split(' ')[0];
  const isTutor = lesson.role === 'tutor';

  const cancel = () => {
    onStatusChange('cancelled', isTutor ? 'You cancelled the lesson · learner refunded' : 'You cancelled the lesson · full refund issued');
    setConfirmCancel(false);
    addToast({ type: 'info', message: 'Lesson cancelled' });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {lesson.status === 'requested' && !isTutor &&
      <>
          <p className="mr-auto inline-flex items-center gap-2 text-sm text-ink-700">
            <ClockIcon size={16} className="text-accent-600" aria-hidden="true" /> Waiting for {first} to accept
          </p>
          <Button className={brandButton.danger} onClick={() => setConfirmCancel(true)}>Cancel request</Button>
        </>
      }
      {lesson.status === 'requested' && isTutor &&
      <>
          <Button
          leftIcon={<CheckIcon size={16} />}
          className={brandButton.primary}
          onClick={() => {
            onStatusChange('scheduled', 'You accepted the request');
            addToast({ type: 'success', message: `Lesson with ${first} scheduled` });
          }}>
          
            Accept request
          </Button>
          <Button
          leftIcon={<XIcon size={16} />}
          className={brandButton.danger}
          onClick={() => {
            onStatusChange('cancelled', 'You declined the request');
            addToast({ type: 'info', message: 'Request declined' });
          }}>
          
            Decline
          </Button>
        </>
      }
      {lesson.status === 'scheduled' &&
      <>
          <Button leftIcon={<VideoIcon size={16} />} className={brandButton.primary} onClick={onJoin}>
            Join video lesson
          </Button>
          {isTutor &&
        <Button
          className={brandButton.secondary}
          onClick={() => {
            onStatusChange('completed', 'Lesson marked as completed');
            addToast({ type: 'success', message: 'Lesson completed — add notes for your learner' });
          }}>
          
              Mark as completed
            </Button>
        }
          <Button className={brandButton.danger} onClick={() => setConfirmCancel(true)}>Cancel lesson</Button>
        </>
      }
      {lesson.status === 'completed' && !isTutor &&
      <>
          <Button leftIcon={<StarIcon size={16} />} className={brandButton.accent} onClick={() => setReviewOpen(true)}>
            Leave a review
          </Button>
          <Link to={`/tutors/${lesson.tutorId}`} className={`${linkButton.base} ${linkButton.secondary} !py-2`}>Book again</Link>
        </>
      }
      {lesson.status === 'cancelled' && !isTutor &&
      <Link to={`/tutors/${lesson.tutorId}`} className={`${linkButton.base} ${linkButton.primary} !py-2`}>Book a new time</Link>
      }
      {lesson.status === 'completed' && isTutor &&
      <p className="text-sm text-ink-600">Earnings will be included in your next weekly payout.</p>
      }

      <Dialog isOpen={confirmCancel} onClose={() => setConfirmCancel(false)} size="sm">
        <DialogHeader>Cancel this lesson?</DialogHeader>
        <DialogContent>
          <p className="text-sm text-ink-600">
            {isTutor ?
            `${first} will be notified and fully refunded.` :
            'Cancelling more than 24 hours before the start time gives you a full refund.'}
          </p>
        </DialogContent>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button className={brandButton.secondary} onClick={() => setConfirmCancel(false)}>Keep lesson</Button>
            <Button variant="destructive" onClick={cancel}>Yes, cancel</Button>
          </div>
        </DialogFooter>
      </Dialog>

      <Dialog isOpen={reviewOpen} onClose={() => setReviewOpen(false)} size="md">
        <DialogHeader>Review your lesson with {first}</DialogHeader>
        <DialogContent>
          <div className="flex gap-1" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((i) =>
            <button key={i} type="button" role="radio" aria-checked={rating === i} aria-label={`${i} stars`} onClick={() => setRating(i)}>
                <StarIcon size={28} className={i <= rating ? 'fill-accent-400 text-accent-500' : 'text-ink-300'} />
              </button>
            )}
          </div>
          <label htmlFor="review-text" className="mt-4 block text-sm font-medium text-ink-800">Your review</label>
          <textarea
            id="review-text"
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="What did you learn? How was the teaching style?"
            className="mt-1.5 w-full rounded-xl border border-ink-200 p-3 text-sm focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100" />
          
        </DialogContent>
        <DialogFooter>
          <div className="flex justify-end gap-2">
            <Button className={brandButton.secondary} onClick={() => setReviewOpen(false)}>Cancel</Button>
            <Button
              className={brandButton.primary}
              disabled={reviewText.trim().length < 10}
              onClick={() => {
                setReviewOpen(false);
                setReviewText('');
                addToast({ type: 'success', message: 'Thanks! Your review has been published.' });
              }}>
              
              Publish review
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </div>);

}