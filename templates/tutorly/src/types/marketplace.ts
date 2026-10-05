import type { LucideIcon } from 'lucide-react';

export type SubjectId =
'math' |
'science' |
'english' |
'languages' |
'test-prep' |
'coding' |
'music-theory';

export type LevelId = 'elementary' | 'middle' | 'high-school' | 'college' | 'adult';

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export interface Subject {
  id: SubjectId;
  name: string;
  description: string;
  icon: LucideIcon;
}

export interface Level {
  id: LevelId;
  name: string;
}

export interface TutorSubject {
  subject: SubjectId;
  topics: string[];
  levels: LevelId[];
}

export interface Credential {
  title: string;
  institution: string;
  year: string;
  verified: boolean;
}

export interface LessonPackage {
  lessons: number;
  discountPercent: number;
}

export interface Tutor {
  id: string;
  name: string;
  firstName: string;
  headline: string;
  photo?: string;
  country: string;
  city: string;
  timezone: string;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  lessonsTaught: number;
  studentsCount: number;
  responseTime: string;
  memberSince: string;
  languages: string[];
  subjects: TutorSubject[];
  bio: string;
  teachingStyle: string;
  teachingHighlights: string[];
  education: Credential[];
  packages: LessonPackage[];
  availability: Record<DayKey, number[]>;
  verified: boolean;
  featured?: boolean;
}

export interface Review {
  id: string;
  tutorId: string;
  author: string;
  role: 'Student' | 'Parent';
  rating: number;
  date: string;
  subject: string;
  text: string;
}

export type LessonStatus = 'requested' | 'scheduled' | 'completed' | 'cancelled';

export type LessonRole = 'learner' | 'tutor';

export interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  sentAt: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  at: string;
}

export interface Lesson {
  id: string;
  role: LessonRole;
  tutorId: string;
  counterpartName: string;
  counterpartPhoto?: string;
  subject: string;
  level: string;
  learnerName: string;
  goals: string;
  startsAt: string;
  hours: number;
  packageLessons: number;
  total: number;
  status: LessonStatus;
  messages: ChatMessage[];
  timeline: TimelineEvent[];
  notes: string;
  createdAt: string;
}

export interface BookingDraft {
  tutorId: string;
  subject: SubjectId;
  dateKey: string;
  startHour: number;
  hours: number;
  packageLessons: number;
}

export interface CurrentUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'learner' | 'parent' | 'tutor';
}