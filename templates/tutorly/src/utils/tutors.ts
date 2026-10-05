import { tutors } from '../data/tutors';
import { currentUserTutor } from '../data/currentUser';
import { levels, subjects } from '../data/subjects';
import type { LevelId, SubjectId, Tutor } from '../types/marketplace';

export function getTutorById(id: string | undefined): Tutor | undefined {
  if (!id) return undefined;
  if (id === currentUserTutor.id) return currentUserTutor;
  return tutors.find((t) => t.id === id);
}

export function getSubjectName(id: SubjectId): string {
  return subjects.find((s) => s.id === id)?.name ?? id;
}

export function getLevelName(id: LevelId): string {
  return levels.find((l) => l.id === id)?.name ?? id;
}

export function getTutorSubjectNames(tutor: Tutor): string[] {
  return tutor.subjects.map((s) => getSubjectName(s.subject));
}

export function getTutorTopics(tutor: Tutor): string[] {
  return tutor.subjects.flatMap((s) => s.topics);
}