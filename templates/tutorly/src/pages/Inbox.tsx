import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MessagesSquareIcon, GraduationCapIcon, PresentationIcon } from 'lucide-react';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs';
import { LessonList } from '../components/inbox/LessonList';
import { LessonDetail } from '../components/inbox/LessonDetail';
import { EmptyState } from '../components/common/EmptyState';
import { useLessons } from '../contexts/LessonsContext';
import { linkButton } from '../utils/buttonStyles';
import type { LessonRole } from '../types/marketplace';

export function InboxPage() {
  const { lessons } = useLessons();
  const [params, setParams] = useSearchParams();
  const selectedId = params.get('lesson');
  const selected = lessons.find((l) => l.id === selectedId) ?? null;
  const initialTab: LessonRole = selected?.role ?? (params.get('tab') === 'teaching' ? 'tutor' : 'learner');

  const learning = lessons.filter((l) => l.role === 'learner');
  const teaching = lessons.filter((l) => l.role === 'tutor');
  const select = (id: string) => setParams({ lesson: id });
  const pendingTeaching = teaching.filter((l) => l.status === 'requested').length;

  return (
    <div className="bg-ink-50">
      <div className="mx-auto max-w-page px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900">Inbox</h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <aside className={`rounded-3xl border border-ink-200 bg-white p-4 ${selected ? 'hidden lg:block' : ''}`} aria-label="Lessons">
            <Tabs defaultTab={initialTab} variant="underlined">
              <TabList>
                <Tab id="learner" icon={<GraduationCapIcon size={16} />}>My lessons</Tab>
                <Tab
                  id="tutor"
                  icon={<PresentationIcon size={16} />}
                  badge={pendingTeaching > 0 ? <span className="rounded-full bg-accent-400 px-1.5 text-xs font-semibold text-ink-900">{pendingTeaching}</span> : undefined}>
                  
                  Teaching
                </Tab>
              </TabList>
              <TabPanel id="learner" className="pt-4">
                <LessonList
                  lessons={learning}
                  selectedId={selectedId}
                  onSelect={select}
                  emptyText="Lessons you book with tutors will show up here." />
                
              </TabPanel>
              <TabPanel id="tutor" className="pt-4">
                <LessonList
                  lessons={teaching}
                  selectedId={selectedId}
                  onSelect={select}
                  emptyText="Booking requests from your students will show up here." />
                
              </TabPanel>
            </Tabs>
          </aside>

          <section className={selected ? '' : 'hidden lg:block'} aria-label="Lesson details">
            {selected ?
            <LessonDetail lesson={selected} onBack={() => setParams({})} /> :

            <EmptyState
              icon={MessagesSquareIcon}
              title="Select a lesson"
              description="Choose a lesson to see details, chat with your tutor or student, and join the video classroom."
              action={<Link to="/search" className={`${linkButton.base} ${linkButton.primary}`}>Book a new lesson</Link>} />

            }
          </section>
        </div>
      </div>
    </div>);

}