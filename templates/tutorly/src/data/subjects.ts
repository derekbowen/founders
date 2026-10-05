import {
  CalculatorIcon,
  FlaskConicalIcon,
  BookOpenIcon,
  LanguagesIcon,
  ClipboardCheckIcon,
  CodeIcon,
  MusicIcon } from
'lucide-react';
import type { Level, Subject } from '../types/marketplace';

export const subjects: Subject[] = [
{ id: 'math', name: 'Math', description: 'Algebra, geometry, calculus & statistics', icon: CalculatorIcon },
{ id: 'science', name: 'Science', description: 'Biology, chemistry & physics', icon: FlaskConicalIcon },
{ id: 'english', name: 'English', description: 'Reading, essay writing & literature', icon: BookOpenIcon },
{ id: 'languages', name: 'Languages', description: 'Spanish, French, Mandarin & more', icon: LanguagesIcon },
{ id: 'test-prep', name: 'SAT/ACT', description: 'Test strategy, timing & practice exams', icon: ClipboardCheckIcon },
{ id: 'coding', name: 'Coding', description: 'Python, JavaScript & Scratch for kids', icon: CodeIcon },
{ id: 'music-theory', name: 'Music theory', description: 'Harmony, ear training & AP Music Theory', icon: MusicIcon }];


export const levels: Level[] = [
{ id: 'elementary', name: 'Elementary (K–5)' },
{ id: 'middle', name: 'Middle school' },
{ id: 'high-school', name: 'High school' },
{ id: 'college', name: 'College' },
{ id: 'adult', name: 'Adult learners' }];


export const spokenLanguages: string[] = [
'English',
'Spanish',
'French',
'Mandarin',
'Hindi',
'Portuguese',
'Japanese',
'Korean',
'German',
'Arabic',
'Russian',
'Italian'];