import type { CurrentUser, Tutor } from '../types/marketplace';

export const currentUser: CurrentUser = {
  firstName: 'Alex',
  lastName: 'Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (415) 555-0134',
  role: 'parent'
};

/** The signed-in user's own tutor listing (powers the "Teaching" inbox and their profile). */
export const currentUserTutor: Tutor = {
  id: 'me',
  name: 'Alex Morgan',
  firstName: 'Alex',
  headline: 'Friendly high-school chemistry tutor and lab-safety nerd',
  country: 'United States',
  city: 'Oakland',
  timezone: 'Pacific Time (GMT-7)',
  hourlyRate: 40,
  rating: 5,
  reviewCount: 18,
  lessonsTaught: 96,
  studentsCount: 14,
  responseTime: 'within 2 hours',
  memberSince: '2025',
  languages: ['English', 'Spanish'],
  subjects: [{ subject: 'science', topics: ['Chemistry', 'Honors Chemistry'], levels: ['middle', 'high-school'] }],
  bio: 'Parent of two and former lab technician. I tutor chemistry on weekday evenings and love helping students connect formulas to the real world.',
  teachingStyle: 'Calm, step-by-step and heavy on worked examples.',
  teachingHighlights: ['Worked examples', 'Lab-safety tips', 'Bilingual support'],
  education: [{ title: 'B.S. Chemistry', institution: 'UC Davis', year: '2012', verified: true }],
  packages: [{ lessons: 5, discountPercent: 5 }],
  availability: { mon: [18, 19], tue: [18, 19], wed: [18, 19], thu: [18, 19], fri: [], sat: [10, 11], sun: [] },
  verified: true
};