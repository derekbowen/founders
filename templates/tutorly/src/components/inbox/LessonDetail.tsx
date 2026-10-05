import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ArrowLeftIcon } from 'lucide-react';
import { Avatar } from '../Avatar';
import { LessonStatusBadge } from './LessonStatusBadge';
import { LessonActions } from './LessonActions';
import { LessonChat } from './LessonChat';
import { LessonTimeline } from './LessonTimeline';
import { LessonNotes } from './LessonNotes';
import { VideoRoomDialog } from './VideoRoomDialog';
import { useLessons } from '../../contexts/LessonsContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatHourRange, formatMoney, pluralize } from '../../utils/format';
import { brand } from '../../data/brand';
import type { Lesson } from '../../types/marketplace';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
}

export function LessonDetail({ lesson, onBack }: LessonDetailProps) {
  const { updateStatus, sendMessage, saveNotes } = useLessons();
  const { user } = useAuth();
  const [videoOpen, setVideoOpen] = useState(false);
  const start = parseISO(lesson.startsAt);
  const isTutor = lesson.role === 'tutor';

  const details = [
  { label: 'Date', value: format(start, 'EEE, MMM d, yyyy') },
  { label: 'Time', value: formatHourRange(start.getHours(), lesson.hours) },
  { label: 'Duration', value: pluralize(lesson.hours, 'hour') },
  { label: 'Package', value: lesson.packageLessons > 1 ? `${lesson.packageLessons} lessons` : 'Single lesson' },
  { label: isTutor ? 'You earn' : 'Total paid', value: formatMoney(isTutor ? lesson.total * (1 - brand.tutorCommissionRate) : lesson.total) },
  { label: 'Learner', value: `${lesson.learnerName} · ${lesson.level}` }];


  return (
    <article className="space-y-5" aria-labelledby="lesson-title">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-primary-700 lg:hidden">
        
        <ArrowLeftIcon size={16} aria-hidden="true" /> All lessons
      </button>

      <div className="rounded-3xl border border-ink-200 bg-white p-5">
        <div className="flex flex-wrap items-start gap-4">
          <Avatar name={lesson.counterpartName} alt={lesson.counterpartName} src={lesson.counterpartPhoto} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="lesson-title" className="text-xl font-semibold text-ink-900">
                {lesson.subject} {isTutor ? 'with' : 'lesson with'} {lesson.counterpartName}
              </h2>
              <LessonStatusBadge status={lesson.status} />
            </div>
            <p className="text-sm text-ink-500">
              Booking #{lesson.id}
              {!isTutor &&
              <>
                  {' · '}
                  <Link to={`/tutors/${lesson.tutorId}`} className="font-medium text-primary-700 hover:text-primary-800">View listing</Link>
                </>
              }
            </p>
          </div>
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-2xl bg-ink-50 p-4 sm:grid-cols-3">
          {details.map((d) =>
          <div key={d.label}>
              <dt className="text-xs text-ink-500">{d.label}</dt>
              <dd className="mt-0.5 text-sm font-medium text-ink-900">{d.value}</dd>
            </div>
          )}
        </dl>

        {lesson.goals &&
        <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Learning goals</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-700">{lesson.goals}</p>
          </div>
        }

        <div className="mt-5 border-t border-ink-200 pt-5">
          <LessonActions
            lesson={lesson}
            onStatusChange={(status, label) => updateStatus(lesson.id, status, label)}
            onJoin={() => setVideoOpen(true)} />
          
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <LessonChat lesson={lesson} onSend={(text) => sendMessage(lesson.id, text)} />
        <div className="space-y-5">
          <LessonNotes lesson={lesson} onSave={(notes) => saveNotes(lesson.id, notes)} />
          <LessonTimeline events={lesson.timeline} />
        </div>
      </div>

      <VideoRoomDialog
        lesson={lesson}
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        selfName={`${user.firstName} ${user.lastName}`} />
      
    </article>);

}