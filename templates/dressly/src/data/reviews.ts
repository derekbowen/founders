import type { Review } from '../types/marketplace';

const img = (id: string) =>
`https://cdn.magicpatterns.com/patterns/generated-images/${id}.jpg`;

export const reviews: Review[] = [
{
  id: 'r1',
  listingId: 'wonderland-floral-midi',
  authorId: 'u9',
  rating: 5,
  date: 'September 2026',
  text: 'I got more compliments in this dress than at my own wedding. Arrived steamed and perfect, and Camille included a handwritten note. Fit exactly like my usual 6.',
  sizeWorn: 6,
  fitFeedback: 'True to size',
  occasion: 'Wedding guest',
  photo: img('7e5264cc-4b44-4e43-937a-be786047b639')
},
{
  id: 'r2',
  listingId: 'wonderland-floral-midi',
  authorId: 'u7',
  rating: 5,
  date: 'August 2026',
  text: 'Beautiful quality — you can tell it is the real deal. The sleeves are a little snug if you have strong arms but overall gorgeous.',
  sizeWorn: 6,
  fitFeedback: 'True to size',
  occasion: 'Bridal shower'
},
{
  id: 'r3',
  listingId: 'velvet-strapless-column',
  authorId: 'u8',
  rating: 5,
  date: 'September 2026',
  text: 'Felt like a movie star at a black tie gala. Didn’t slip once. Return was super easy with the prepaid label.',
  sizeWorn: 4,
  fitFeedback: 'True to size',
  occasion: 'Black tie',
  photo: img('6dddba19-8e37-4ad6-958f-caf89f93c416')
},
{
  id: 'r4',
  listingId: 'guipure-lace-bow-mini',
  authorId: 'u7',
  rating: 5,
  date: 'July 2026',
  text: 'Wore it to my rehearsal dinner. Size up — I’m usually a 0 and the 2 fit perfectly. Olivia shipped it the same day.',
  sizeWorn: 2,
  fitFeedback: 'Runs small',
  occasion: 'Rehearsal dinner',
  photo: img('31836b5b-93f7-4c6e-b34d-2895590b41fb')
},
{
  id: 'r5',
  listingId: 'emerald-one-shoulder-gown',
  authorId: 'u9',
  rating: 5,
  date: 'June 2026',
  text: 'The color is even richer in person. Satin is heavy and luxurious. Highly recommend for an evening wedding.',
  sizeWorn: 8,
  fitFeedback: 'True to size',
  occasion: 'Wedding guest',
  photo: img('b45e457d-a569-4210-811a-8132a6d0d389')
},
{
  id: 'r6',
  listingId: 'emerald-one-shoulder-gown',
  authorId: 'u8',
  rating: 4,
  date: 'May 2026',
  text: 'Stunning, though a bit long for me at 5′4″ — wear tall heels. Priya was lovely to deal with.',
  sizeWorn: 8,
  fitFeedback: 'True to size',
  occasion: 'Black tie'
},
{
  id: 'r7',
  listingId: 'sequin-long-sleeve-mini',
  authorId: 'u7',
  rating: 5,
  date: 'January 2026',
  text: 'NYE perfection. Super stretchy and comfortable for dancing all night.',
  sizeWorn: 6,
  fitFeedback: 'True to size',
  occasion: 'Cocktail',
  photo: img('57660aa3-06d9-4a94-83f6-b4ab98f84a00')
},
{
  id: 'r8',
  listingId: 'metallic-bandage-midi',
  authorId: 'u9',
  rating: 5,
  date: 'August 2026',
  text: 'Snatched in the best way. Definitely size up if you’re between sizes. Iconic dress.',
  sizeWorn: 4,
  fitFeedback: 'Runs small',
  occasion: 'Birthday'
},
{
  id: 'r9',
  listingId: 'beaded-cape-sleeve-gown',
  authorId: 'u8',
  rating: 5,
  date: 'March 2026',
  text: 'Wore this to a charity gala and people would not stop asking where it was from. The beading is immaculate.',
  sizeWorn: 8,
  fitFeedback: 'True to size',
  occasion: 'Gala',
  photo: img('fc9122ce-42e3-4f4b-80b2-db2364a92fa6')
},
{
  id: 'r10',
  listingId: 'cowl-satin-slip-midi',
  authorId: 'u7',
  rating: 4,
  date: 'April 2026',
  text: 'Lovely soft color and easy to wear. Straps adjust so you can dial in the fit.',
  sizeWorn: 6,
  fitFeedback: 'True to size',
  occasion: 'Wedding guest'
},
{
  id: 'r11',
  listingId: 'broderie-tiered-maxi',
  authorId: 'u9',
  rating: 5,
  date: 'July 2026',
  text: 'Took it on my babymoon in Tulum — room for the bump and so breezy. Photos came out dreamy.',
  sizeWorn: 8,
  fitFeedback: 'Runs large',
  occasion: 'Vacation',
  photo: img('58fe59e8-8925-436e-8956-c74632384cfb')
},
{
  id: 'r12',
  listingId: 'feather-trim-mini',
  authorId: 'u8',
  rating: 5,
  date: 'June 2026',
  text: 'The feathers! So fun for my 30th. Arrived in a garment bag with care instructions.',
  sizeWorn: 4,
  fitFeedback: 'True to size',
  occasion: 'Birthday',
  photo: img('6e905227-adcf-48a6-828d-8391e89e9a75')
}];