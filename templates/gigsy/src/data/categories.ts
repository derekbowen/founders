import { Category } from '../types/marketplace';
import { covers } from './images';

export const categories: Category[] = [
{
  id: 'design',
  name: 'Design & Creative',
  description: 'Brand identity, UI/UX, illustration',
  image: covers.brandIdentity,
  skills: ['Logo design', 'Brand identity', 'UI design', 'UX research', 'Figma', 'Illustration', 'Webflow']
},
{
  id: 'development',
  name: 'Development & IT',
  description: 'Web apps, e-commerce, mobile',
  image: covers.reactWebapp,
  skills: ['React', 'Node.js', 'TypeScript', 'Shopify', 'React Native', 'Next.js', 'PostgreSQL']
},
{
  id: 'writing',
  name: 'Writing & Content',
  description: 'SEO articles, copy, documentation',
  image: covers.seoBlog,
  skills: ['SEO writing', 'Copywriting', 'Technical writing', 'Blog posts', 'Editing', 'UX writing']
},
{
  id: 'video',
  name: 'Video & Animation',
  description: 'Explainers, editing, 3D motion',
  image: covers.explainer,
  skills: ['Motion graphics', '2D animation', 'Video editing', 'Color grading', '3D rendering', 'After Effects']
},
{
  id: 'marketing',
  name: 'Marketing & Growth',
  description: 'Paid ads, social, email',
  image: covers.paidAds,
  skills: ['Google Ads', 'Meta Ads', 'Social strategy', 'Email automation', 'Klaviyo', 'Analytics']
}];