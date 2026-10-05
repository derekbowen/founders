import { categories } from '../data/categories';
import { destinations } from '../data/destinations';
import { experiences } from '../data/experiences';
import { hosts } from '../data/hosts';
import { reviews } from '../data/reviews';

export const getExperience = (id?: string) => experiences.find((e) => e.id === id);
export const getHost = (id?: string) => hosts.find((h) => h.id === id);
export const getDestination = (id?: string) => destinations.find((d) => d.id === id);
export const getCategory = (id?: string) => categories.find((c) => c.id === id);
export const getReviewsFor = (experienceId: string) => reviews.filter((r) => r.experienceId === experienceId);
export const getExperiencesByHost = (hostId: string) => experiences.filter((e) => e.hostId === hostId);
export const countExperiencesIn = (destinationId: string) =>
experiences.filter((e) => e.destinationId === destinationId).length;