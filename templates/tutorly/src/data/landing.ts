import {
  SearchIcon,
  CalendarCheckIcon,
  VideoIcon,
  ShieldCheckIcon,
  BadgeCheckIcon,
  HeartHandshakeIcon,
  LockIcon } from
'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const howItWorksSteps: {title: string;text: string;icon: LucideIcon;}[] = [
{ title: 'Find your tutor', text: 'Search by subject, level, price and availability. Watch intro videos and read real reviews.', icon: SearchIcon },
{ title: 'Book an hour that fits', text: 'Pick an open slot on the tutor\'s calendar. Save up to 15% with lesson packages.', icon: CalendarCheckIcon },
{ title: 'Learn live over video', text: 'Meet in our built-in classroom with whiteboard, screen share and lesson notes.', icon: VideoIcon }];


export const trustPoints: {title: string;text: string;icon: LucideIcon;}[] = [
{ title: 'Every tutor is vetted', text: 'ID verification, credential checks and a teaching demo before tutors go live.', icon: BadgeCheckIcon },
{ title: 'First lesson guarantee', text: 'Not the right fit? We\'ll refund your first lesson or find you a new tutor — free.', icon: HeartHandshakeIcon },
{ title: 'Safe for young learners', text: 'Background-checked tutors for under-18s and lessons recorded on request.', icon: ShieldCheckIcon },
{ title: 'Secure payments', text: 'You\'re only charged once a tutor accepts. Cancel free up to 24 hours before.', icon: LockIcon }];


export const platformStats: {value: string;label: string;}[] = [
{ value: '4,800+', label: 'Vetted tutors' },
{ value: '320k', label: 'Lessons taught' },
{ value: '4.9/5', label: 'Average rating' },
{ value: '60+', label: 'Subjects' }];