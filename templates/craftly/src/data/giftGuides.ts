import type { GiftGuide } from '../types/marketplace';

const IMG = "/";

export const giftGuides: GiftGuide[] = [
{
  id: 'under-50',
  title: 'Gifts under $50',
  subtitle: 'Small, thoughtful, handmade',
  image: `${IMG}6d5486a4-7d8a-488e-87bb-37a72c4ccf74.jpg`,
  to: '/s?maxPrice=50'
},
{
  id: 'home-cook',
  title: 'For the home cook',
  subtitle: 'Boards, spoons & serveware',
  image: `${IMG}3692bbb1-fb78-445f-bc56-142e96468b01.jpg`,
  to: '/s?category=woodwork'
},
{
  id: 'cozy',
  title: 'Cozy nights in',
  subtitle: 'Candles, throws & mugs',
  image: `${IMG}c33c2a6b-6c7e-4ecd-bd3b-940d0d6f022d.jpg`,
  to: '/s?category=candles'
},
{
  id: 'wall',
  title: 'Wall-worthy',
  subtitle: 'Prints & weavings to frame',
  image: `${IMG}f0815389-c3b2-43ac-a823-a329f698cab8.jpg`,
  to: '/s?category=prints'
}];