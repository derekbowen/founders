import type { Category, FileType } from '../types/marketplace';

export const categories: Category[] = [
{ id: 'ebooks', name: 'E-books', blurb: 'Guides, essays & field manuals', tint: '#FFE7D6' },
{ id: 'printables', name: 'Printables', blurb: 'Planners, trackers & binders', tint: '#FCE7F3' },
{ id: 'templates', name: 'Templates', blurb: 'Spreadsheets & dashboards', tint: '#DFF1FD' },
{ id: 'photo-packs', name: 'Photo packs', blurb: 'Stock photos & textures', tint: '#E3F4E5' },
{ id: 'audio', name: 'Audio', blurb: 'Loops, kits & sound beds', tint: '#ECE8FE' },
{ id: 'courses', name: 'Courses', blurb: 'Workbooks to learn by doing', tint: '#FEF7C3' }];


export const fileTypes: FileType[] = ['PDF', 'ZIP', 'MP3', 'XLSX'];

export const popularSearches = ['planner', 'lo-fi', 'budget', 'textures', 'workbook', 'wedding'];