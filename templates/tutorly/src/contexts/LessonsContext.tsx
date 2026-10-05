import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { lessons as initialLessons } from '../data/lessons';
import { levels } from '../data/subjects';
import { getSubjectName } from '../utils/tutors';
import type { BookingDraft, Lesson, LessonStatus, Tutor } from '../types/marketplace';

interface NewLessonInput {
  draft: BookingDraft;
  tutor: Tutor;
  learnerName: string;
  level: string;
  goals: string;
  total: number;
}

interface LessonsContextValue {
  lessons: Lesson[];
  addLesson: (input: NewLessonInput) => string;
  updateStatus: (id: string, status: LessonStatus, label: string) => void;
  sendMessage: (id: string, text: string) => void;
  saveNotes: (id: string, notes: string) => void;
}

const LessonsContext = createContext<LessonsContextValue | null>(null);

const nowIso = () => new Date().toISOString();
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export function LessonsProvider({ children }: {children: React.ReactNode;}) {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);

  const patch = useCallback((id: string, fn: (l: Lesson) => Lesson) => {
    setLessons((prev) => prev.map((l) => l.id === id ? fn(l) : l));
  }, []);

  const addLesson = useCallback((input: NewLessonInput) => {
    const { draft, tutor } = input;
    const id = `L-${Math.floor(1100 + Math.random() * 800)}`;
    const startsAt = `${draft.dateKey}T${String(draft.startHour).padStart(2, '0')}:00:00`;
    const lesson: Lesson = {
      id,
      role: 'learner',
      tutorId: tutor.id,
      counterpartName: tutor.name,
      counterpartPhoto: tutor.photo,
      subject: getSubjectName(draft.subject),
      level: levels.find((l) => l.id === input.level)?.name ?? input.level,
      learnerName: input.learnerName,
      goals: input.goals,
      startsAt,
      hours: draft.hours,
      packageLessons: draft.packageLessons,
      total: input.total,
      status: 'requested',
      createdAt: nowIso(),
      notes: '',
      messages: input.goals ?
      [{ id: uid('m'), sender: 'me', text: `Hi ${tutor.firstName}! Goals for ${input.learnerName}: ${input.goals}`, sentAt: nowIso() }] :
      [],
      timeline: [
      {
        id: uid('t'),
        label:
        draft.packageLessons > 1 ?
        `You requested a ${draft.packageLessons}-lesson package` :
        `You requested a ${draft.hours}-hour lesson`,
        at: nowIso()
      },
      { id: uid('t'), label: 'Card authorized · charged when the tutor accepts', at: nowIso() }]

    };
    setLessons((prev) => [lesson, ...prev]);
    return id;
  }, []);

  const updateStatus = useCallback(
    (id: string, status: LessonStatus, label: string) =>
    patch(id, (l) => ({ ...l, status, timeline: [...l.timeline, { id: uid('t'), label, at: nowIso() }] })),
    [patch]
  );

  const sendMessage = useCallback(
    (id: string, text: string) => {
      patch(id, (l) => ({ ...l, messages: [...l.messages, { id: uid('m'), sender: 'me', text, sentAt: nowIso() }] }));
      window.setTimeout(() => {
        patch(id, (l) => ({
          ...l,
          messages: [
          ...l.messages,
          { id: uid('m'), sender: 'them', text: 'Thanks for the message! I\'ll get back to you shortly. 👍', sentAt: nowIso() }]

        }));
      }, 1800);
    },
    [patch]
  );

  const saveNotes = useCallback((id: string, notes: string) => patch(id, (l) => ({ ...l, notes })), [patch]);

  const value = useMemo(
    () => ({ lessons, addLesson, updateStatus, sendMessage, saveNotes }),
    [lessons, addLesson, updateStatus, sendMessage, saveNotes]
  );

  return <LessonsContext.Provider value={value}>{children}</LessonsContext.Provider>;
}

export function useLessons(): LessonsContextValue {
  const ctx = useContext(LessonsContext);
  if (!ctx) throw new Error('useLessons must be used within LessonsProvider');
  return ctx;
}