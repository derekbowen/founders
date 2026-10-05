import type { RoomType } from '../types/listing';

export const popularCities = [
{ name: 'Berlin', country: 'Germany', rooms: 1240, avgRent: 690, color: 'bg-primary-100' },
{ name: 'Amsterdam', country: 'Netherlands', rooms: 860, avgRent: 980, color: 'bg-coral-100' },
{ name: 'Barcelona', country: 'Spain', rooms: 1105, avgRent: 610, color: 'bg-navy-100' },
{ name: 'Lisbon', country: 'Portugal', rooms: 720, avgRent: 580, color: 'bg-primary-100' },
{ name: 'Milan', country: 'Italy', rooms: 640, avgRent: 760, color: 'bg-coral-100' },
{ name: 'Vienna', country: 'Austria', rooms: 530, avgRent: 620, color: 'bg-navy-100' }];


export const universities = [
{ name: 'Technische Universität Berlin', short: 'TU Berlin', city: 'Berlin' },
{ name: 'University of Amsterdam', short: 'UvA', city: 'Amsterdam' },
{ name: 'Universitat de Barcelona', short: 'UB', city: 'Barcelona' },
{ name: 'Universidade de Lisboa', short: 'ULisboa', city: 'Lisbon' },
{ name: 'Bocconi University', short: 'Bocconi', city: 'Milan' },
{ name: 'University of Vienna', short: 'Uni Wien', city: 'Vienna' }];


export const roomTypes: {id: RoomType;label: string;description: string;}[] = [
{ id: 'private', label: 'Private room', description: 'Your own room in a shared flat' },
{ id: 'studio', label: 'Studio', description: 'Self-contained with kitchenette' },
{ id: 'shared', label: 'Shared room', description: 'Share a room, save on rent' },
{ id: 'whole', label: 'Whole flat', description: 'The entire place to yourself' }];


export const roomTypeLabels: Record<RoomType, string> = {
  private: 'Private room',
  studio: 'Studio',
  shared: 'Shared room',
  whole: 'Whole flat'
};

export const howItWorks = [
{
  title: 'Search with filters that matter',
  text: 'Filter by rent, bills, stay length, flatmates and move-in date across verified rooms.'
},
{
  title: 'Send an inquiry',
  text: 'Introduce yourself and your plans. Landlords and flatmates reply directly in your inbox.'
},
{
  title: 'Schedule a viewing',
  text: 'Meet in person or on a video call. Ask about the flat, the flatmates and the contract.'
},
{
  title: 'Agree and move in',
  text: 'Sign your contract directly with the landlord. No booking fees, no middlemen.'
}];


export const safetyTips = [
{ title: 'Never pay before viewing', text: 'Always see the room in person or on a live video call first.' },
{ title: 'Keep chats in the inbox', text: 'Messages here help us protect you if something goes wrong.' },
{ title: 'Get a written contract', text: 'Ask for a signed agreement covering rent, deposit and dates.' },
{ title: 'Report anything odd', text: 'Flag suspicious listings — our team reviews every report.' }];


export const landlordBenefits = [
'List for free in under 10 minutes',
'Screened renters with verified profiles',
'Manage all inquiries in one inbox'];


export const stats = [
{ value: '5,000+', label: 'verified rooms' },
{ value: '48', label: 'university cities' },
{ value: '4.8/5', label: 'renter rating' }];