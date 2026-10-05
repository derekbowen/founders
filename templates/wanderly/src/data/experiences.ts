import type { Experience } from '../types/marketplace';
import { images } from './images';

export const experiences: Experience[] = [
{
  id: 'alfama-tascas-food-walk', title: 'Tascas & Tiles: Alfama Food Walk', destinationId: 'lisbon', categoryId: 'food', hostId: 'ines',
  image: images.alfamaFood, gallery: [images.alfamaFood, images.destLisbon, images.fadoNight, images.hero],
  pricePerPerson: 65, privateGroupPrice: 420, durationHours: 3.5, minGuests: 1, maxGuests: 10, languages: ['English', 'Portuguese', 'Spanish'],
  timesOfDay: ['morning', 'afternoon'], departureTimes: ['10:00', '15:30'], wheelchairAccessible: false, rating: 4.97, reviewCount: 612,
  summary: 'Eat your way through Lisbon\u2019s oldest neighborhood with a local food writer.',
  description: 'Wind through Alfama\u2019s steep alleys tasting the dishes Lisboetas actually eat: bifanas from a 70-year-old counter, tinned fish with vinho verde, and warm pastéis de nata straight from the oven. Between bites, hear the stories of the families who\u2019ve run these places for generations.',
  itinerary: [
  { time: '0:00', title: 'Meet at Largo do Chafariz de Dentro', description: 'Coffee and a quick intro to Portuguese food culture.' },
  { time: '0:30', title: 'Petiscos at a family tasca', description: 'Bifanas, chouriço assado and a glass of green wine.' },
  { time: '1:30', title: 'Tinned fish & tiles', description: 'Taste premium conservas and explore hidden azulejo walls.' },
  { time: '2:30', title: 'Ginjinha & pastéis de nata', description: 'Finish with cherry liqueur and custard tarts at a miradouro.' }],

  included: ['8+ tastings — a full lunch', '3 drinks (wine, ginjinha, coffee)', 'Neighborhood guidebook PDF'],
  notIncluded: ['Hotel pickup', 'Gratuities'],
  whatToBring: ['Comfortable walking shoes', 'An empty stomach', 'Water bottle'],
  meetingPoint: { name: 'Largo do Chafariz de Dentro', address: 'Largo do Chafariz de Dentro, 1100-139 Lisboa', lat: 38.7114, lng: -9.13, instructions: 'Look for Inês with a coral Wanderly tote by the fountain.' }
},
{
  id: 'arrabida-sea-kayak', title: 'Sea Kayaking the Arrábida Coast', destinationId: 'lisbon', categoryId: 'outdoors', hostId: 'rui',
  image: images.arrabidaKayak, gallery: [images.arrabidaKayak, images.destLisbon, images.capeTownKayak, images.alfamaFood],
  pricePerPerson: 85, privateGroupPrice: 560, durationHours: 4, minGuests: 2, maxGuests: 8, languages: ['English', 'Portuguese'],
  timesOfDay: ['morning', 'afternoon'], departureTimes: ['09:00', '14:00'], wheelchairAccessible: false, rating: 4.94, reviewCount: 284,
  summary: 'Paddle turquoise coves and limestone caves in a protected marine park.',
  description: 'Just 40 minutes from Lisbon, the Arrábida Natural Park hides some of Europe\u2019s clearest water. Paddle stable sit-on-top kayaks past sea caves, snorkel a sheltered cove and enjoy a picnic on a beach reachable only by water.',
  itinerary: [
  { time: '0:00', title: 'Safety briefing at Portinho', description: 'Gear up and learn paddle basics on the beach.' },
  { time: '0:45', title: 'Paddle to the sea caves', description: 'Explore Lapa de Santa Margarida and limestone arches.' },
  { time: '2:15', title: 'Snorkel & picnic', description: 'Swim in a hidden cove with local cheese, fruit and bread.' },
  { time: '3:15', title: 'Return paddle', description: 'Ride the afternoon breeze back to the bay.' }],

  included: ['Kayak, paddle & life vest', 'Snorkel gear', 'Beach picnic', 'Waterproof bag'],
  notIncluded: ['Transport from Lisbon', 'Wetsuit rental (€8)'],
  whatToBring: ['Swimsuit & towel', 'Reef-safe sunscreen', 'Change of clothes'],
  meetingPoint: { name: 'Portinho da Arrábida beach', address: 'Portinho da Arrábida, 2925 Setúbal', lat: 38.48, lng: -8.979, instructions: 'Meet at the blue kayak rack next to the beach café.' }
},
{
  id: 'mouraria-fado-night', title: 'Fado Night in Mouraria', destinationId: 'lisbon', categoryId: 'nightlife', hostId: 'ines',
  image: images.fadoNight, gallery: [images.fadoNight, images.destLisbon, images.alfamaFood, images.hero],
  pricePerPerson: 55, privateGroupPrice: 360, durationHours: 3, minGuests: 1, maxGuests: 12, languages: ['English', 'Portuguese'],
  timesOfDay: ['evening'], departureTimes: ['20:00'], wheelchairAccessible: true, rating: 4.92, reviewCount: 198,
  summary: 'Hear soul-stirring fado in the neighborhood where it was born.',
  description: 'Skip the dinner-show circuit. We visit two tiny tavernas where amateur and professional fadistas sing for neighbors, with petiscos and wine to keep the night going.',
  itinerary: [
  { time: '0:00', title: 'Meet at Largo da Severa', description: 'A short walk through the history of fado.' },
  { time: '0:30', title: 'First taverna', description: 'Petiscos and a set of fado vadio (amateur fado).' },
  { time: '1:45', title: 'Second taverna', description: 'Professional fadistas and a final glass of port.' }],

  included: ['Petiscos sharing plates', '2 drinks', 'Reserved seats'],
  notIncluded: ['Full dinner', 'Gratuities'],
  whatToBring: ['Smart-casual clothes', 'Cash for extra drinks'],
  meetingPoint: { name: 'Largo da Severa', address: 'Largo da Severa, 1100-588 Lisboa', lat: 38.7162, lng: -9.1353, instructions: 'Meet beside the fado mural on the square.' }
},
{
  id: 'roma-norte-tacos-after-dark', title: 'Tacos After Dark in Roma Norte', destinationId: 'mexico-city', categoryId: 'food', hostId: 'diego',
  image: images.cdmxTacos, gallery: [images.cdmxTacos, images.destCdmx, images.cdmxMurals, images.cdmxMole],
  pricePerPerson: 49, privateGroupPrice: 380, durationHours: 3, minGuests: 1, maxGuests: 12, languages: ['English', 'Spanish'],
  timesOfDay: ['evening'], departureTimes: ['18:30', '20:30'], wheelchairAccessible: true, rating: 4.98, reviewCount: 931,
  summary: 'Five legendary taco stands, mezcal and the stories behind them.',
  description: 'From al pastor shaved off the trompo to suadero and tacos de canasta, we hit the stands chilangos line up for. Expect salsas ranked by heat, a mezcal tasting and a crash course in taco etiquette.',
  itinerary: [
  { time: '0:00', title: 'Meet at Plaza Río de Janeiro', description: 'Agua fresca and a taco 101 briefing.' },
  { time: '0:20', title: 'Al pastor & suadero', description: 'Two classic stands, side by side.' },
  { time: '1:30', title: 'Mezcalería stop', description: 'Taste three artisanal mezcals with orange and sal de gusano.' },
  { time: '2:30', title: 'Churros for dessert', description: 'Hot churros dipped in Mexican chocolate.' }],

  included: ['15+ tacos across 5 stops', 'Mezcal tasting', 'Agua fresca & dessert'],
  notIncluded: ['Extra drinks', 'Gratuities'],
  whatToBring: ['Appetite', 'Comfortable shoes', 'Small cash'],
  meetingPoint: { name: 'Plaza Río de Janeiro', address: 'Plaza Río de Janeiro, Roma Nte., CDMX', lat: 19.418, lng: -99.161, instructions: 'Diego will be by the David statue wearing a coral cap.' }
},
{
  id: 'mole-from-scratch', title: 'Mole from Scratch with Rosa', destinationId: 'mexico-city', categoryId: 'workshops', hostId: 'rosa',
  image: images.cdmxMole, gallery: [images.cdmxMole, images.destCdmx, images.cdmxTacos, images.cdmxMurals],
  pricePerPerson: 79, privateGroupPrice: 450, durationHours: 4, minGuests: 2, maxGuests: 8, languages: ['Spanish', 'English'],
  timesOfDay: ['morning'], departureTimes: ['10:00'], wheelchairAccessible: true, rating: 4.99, reviewCount: 402,
  summary: 'Grind chiles in a molcajete and cook a family mole recipe in Coyoacán.',
  description: 'Rosa\u2019s Oaxacan mole has 28 ingredients and a lot of love. Shop at Mercado de Coyoacán, toast chiles and spices, grind them by hand and sit down to a feast with handmade tortillas.',
  itinerary: [
  { time: '0:00', title: 'Market visit', description: 'Pick chiles, chocolate and herbs at Mercado de Coyoacán.' },
  { time: '1:00', title: 'Toast & grind', description: 'Hands-on in Rosa\u2019s home kitchen with a volcanic-stone molcajete.' },
  { time: '2:30', title: 'Tortillas by hand', description: 'Press and cook fresh corn tortillas on the comal.' },
  { time: '3:15', title: 'Family-style feast', description: 'Mole poblano with rice, beans and agua de jamaica.' }],

  included: ['Market ingredients', 'Full lunch', 'Recipe booklet', 'Apron to take home'],
  notIncluded: ['Transport to Coyoacán'],
  whatToBring: ['Closed-toe shoes', 'Hair tie'],
  meetingPoint: { name: 'Mercado de Coyoacán', address: 'Ignacio Allende s/n, Coyoacán, CDMX', lat: 19.35, lng: -99.162, instructions: 'Meet at the main entrance on Ignacio Allende.' }
},
{
  id: 'murals-and-mezcal', title: 'Murals & Mezcal: Street Art Walk', destinationId: 'mexico-city', categoryId: 'culture', hostId: 'diego',
  image: images.cdmxMurals, gallery: [images.cdmxMurals, images.destCdmx, images.cdmxTacos, images.cdmxMole],
  pricePerPerson: 39, privateGroupPrice: 300, durationHours: 2.5, minGuests: 1, maxGuests: 14, languages: ['English', 'Spanish'],
  timesOfDay: ['afternoon'], departureTimes: ['15:00'], wheelchairAccessible: true, rating: 4.9, reviewCount: 356,
  summary: 'Explore the city\u2019s best murals with a working muralist.',
  description: 'From Rivera\u2019s legacy to today\u2019s street artists, see how Mexico City tells its stories on walls. Meet artists in their studio and end at a hidden mezcalería.',
  itinerary: [
  { time: '0:00', title: 'Centro Histórico murals', description: 'The roots of Mexican muralism.' },
  { time: '1:00', title: 'Doctores street art', description: 'Contemporary walls and a studio visit.' },
  { time: '2:00', title: 'Mezcal tasting', description: 'Two mezcals in a neighborhood bar.' }],

  included: ['Studio visit', 'Mezcal tasting', 'Mini art print'],
  notIncluded: ['Food', 'Gratuities'],
  whatToBring: ['Camera', 'Sun hat'],
  meetingPoint: { name: 'Palacio de Bellas Artes', address: 'Av. Juárez, Centro, CDMX', lat: 19.4352, lng: -99.1412, instructions: 'Meet at the front steps, east side.' }
},
{
  id: 'gion-golden-hour-photo-walk', title: 'Golden Hour Photo Walk in Gion', destinationId: 'kyoto', categoryId: 'photography', hostId: 'yuki',
  image: images.kyotoGion, gallery: [images.kyotoGion, images.destKyoto, images.kyotoTea, images.kyotoBamboo],
  pricePerPerson: 72, privateGroupPrice: 380, durationHours: 2.5, minGuests: 1, maxGuests: 6, languages: ['English', 'Japanese'],
  timesOfDay: ['afternoon', 'evening'], departureTimes: ['16:30'], wheelchairAccessible: false, rating: 4.96, reviewCount: 247,
  summary: 'Shoot lantern-lit lanes with a pro photographer as the sun sets.',
  description: 'Learn composition and low-light technique on Kyoto\u2019s most photogenic streets — Hanamikoji, Shirakawa and Yasaka — timed for golden hour and blue hour. Suitable for phone and camera users.',
  itinerary: [
  { time: '0:00', title: 'Settings & composition', description: 'Quick tips at Yasaka Shrine.' },
  { time: '0:30', title: 'Ninenzaka & Sannenzaka', description: 'Golden hour on the stone lanes.' },
  { time: '1:30', title: 'Shirakawa at blue hour', description: 'Reflections and lantern light.' }],

  included: ['Personalized photo tips', '10 edited photos of you', 'Shot list map'],
  notIncluded: ['Camera equipment'],
  whatToBring: ['Camera or smartphone', 'Charged battery'],
  meetingPoint: { name: 'Yasaka Shrine West Gate', address: '625 Gionmachi Kitagawa, Higashiyama, Kyoto', lat: 35.0037, lng: 135.7751, instructions: 'Meet at the bottom of the vermillion gate steps.' }
},
{
  id: 'machiya-tea-ceremony', title: 'Tea Ceremony in a Machiya Townhouse', destinationId: 'kyoto', categoryId: 'culture', hostId: 'kenji',
  image: images.kyotoTea, gallery: [images.kyotoTea, images.destKyoto, images.kyotoGion, images.kyotoBamboo],
  pricePerPerson: 95, privateGroupPrice: 480, durationHours: 1.5, minGuests: 1, maxGuests: 6, languages: ['Japanese', 'English'],
  timesOfDay: ['morning', 'afternoon'], departureTimes: ['10:00', '13:00', '15:30'], wheelchairAccessible: false, rating: 4.95, reviewCount: 173,
  summary: 'Experience the quiet art of chado in a 120-year-old home.',
  description: 'Kenji guides you through the meaning and movement of a traditional tea ceremony, then teaches you to whisk your own matcha served with seasonal wagashi sweets.',
  itinerary: [
  { time: '0:00', title: 'Welcome to the machiya', description: 'Garden walk and introduction to chado.' },
  { time: '0:20', title: 'The ceremony', description: 'Watch a full ceremony in the tatami room.' },
  { time: '0:50', title: 'Whisk your own matcha', description: 'With seasonal wagashi sweets.' }],

  included: ['Matcha & wagashi', 'Kimono-style haori to wear'],
  notIncluded: ['Transport'],
  whatToBring: ['Clean socks (shoes off indoors)'],
  meetingPoint: { name: 'Mori Machiya', address: 'Nishiki-koji, Nakagyo, Kyoto', lat: 35.006, lng: 135.763, instructions: 'The wooden door with a small indigo noren.' }
},
{
  id: 'arashiyama-bamboo-dawn-hike', title: 'Arashiyama Bamboo Dawn Hike', destinationId: 'kyoto', categoryId: 'outdoors', hostId: 'yuki',
  image: images.kyotoBamboo, gallery: [images.kyotoBamboo, images.destKyoto, images.kyotoGion, images.kyotoTea],
  pricePerPerson: 45, privateGroupPrice: 260, durationHours: 3, minGuests: 1, maxGuests: 10, languages: ['English', 'Japanese'],
  timesOfDay: ['morning'], departureTimes: ['06:00'], wheelchairAccessible: false, rating: 4.88, reviewCount: 139,
  summary: 'Beat the crowds through the bamboo grove and up to a river viewpoint.',
  description: 'Arrive before the tour buses for a silent walk through the bamboo, then hike forest trails to a lookout over the Hozugawa river, finishing with breakfast at a riverside café.',
  itinerary: [
  { time: '0:00', title: 'Empty bamboo grove', description: 'The grove at its most magical.' },
  { time: '0:45', title: 'Okochi trail', description: 'Forest path to the river viewpoint.' },
  { time: '2:15', title: 'Riverside breakfast', description: 'Japanese breakfast set by the Katsura river.' }],

  included: ['Japanese breakfast', 'Hot tea'],
  notIncluded: ['Train fare to Arashiyama'],
  whatToBring: ['Hiking shoes', 'Light jacket'],
  meetingPoint: { name: 'Saga-Arashiyama Station', address: 'Sagatenryuji, Ukyo, Kyoto', lat: 35.017, lng: 135.6713, instructions: 'Meet at the south exit ticket gates.' }
},
{
  id: 'el-born-tapas-vermut', title: 'Tapas & Vermut Crawl in El Born', destinationId: 'barcelona', categoryId: 'food', hostId: 'marta',
  image: images.bcnTapas, gallery: [images.bcnTapas, images.destBarcelona, images.bcnPaella, images.bcnGaudi],
  pricePerPerson: 69, privateGroupPrice: 460, durationHours: 3, minGuests: 1, maxGuests: 10, languages: ['English', 'Spanish', 'Catalan', 'French'],
  timesOfDay: ['afternoon', 'evening'], departureTimes: ['12:30', '19:00'], wheelchairAccessible: true, rating: 4.93, reviewCount: 518,
  summary: 'Vermut hour, bombas and croquetas in Barcelona\u2019s most charming barrio.',
  description: 'Do it like the locals: vermut on tap with olives, then hop between centuries-old bodegas and modern tapas bars for bombas, croquetas, pan con tomate and Iberian ham.',
  itinerary: [
  { time: '0:00', title: 'La hora del vermut', description: 'House vermut and gildas at a 1920s bodega.' },
  { time: '1:00', title: 'Classic tapas', description: 'Bombas, bravas and croquetas.' },
  { time: '2:00', title: 'Cava & crema catalana', description: 'A sweet finish near Santa Maria del Mar.' }],

  included: ['10+ tapas', '4 drinks', 'Neighborhood map'],
  notIncluded: ['Gratuities'],
  whatToBring: ['Appetite', 'Comfortable shoes'],
  meetingPoint: { name: 'Passeig del Born', address: 'Passeig del Born 1, 08003 Barcelona', lat: 41.3851, lng: 2.1834, instructions: 'Meet by the fountain at the top of the promenade.' }
},
{
  id: 'rooftop-paella-masterclass', title: 'Paella Masterclass at a Rooftop Kitchen', destinationId: 'barcelona', categoryId: 'workshops', hostId: 'marta',
  image: images.bcnPaella, gallery: [images.bcnPaella, images.destBarcelona, images.bcnTapas, images.bcnGaudi],
  pricePerPerson: 89, privateGroupPrice: 640, durationHours: 3.5, minGuests: 2, maxGuests: 12, languages: ['English', 'Spanish'],
  timesOfDay: ['afternoon', 'evening'], departureTimes: ['11:00', '17:30'], wheelchairAccessible: true, rating: 4.97, reviewCount: 467,
  summary: 'Cook seafood paella over fire with skyline views and sangria.',
  description: 'Learn the secrets of socarrat on Marta\u2019s rooftop. Prep a seafood paella in a giant pan, mix your own sangria and feast together as the sun sets over Eixample.',
  itinerary: [
  { time: '0:00', title: 'Sangria welcome', description: 'Mix your own pitcher on the terrace.' },
  { time: '0:30', title: 'Sofrito & stock', description: 'Build the flavor base step by step.' },
  { time: '1:30', title: 'Paella over fire', description: 'Cook and chase the perfect socarrat.' },
  { time: '2:30', title: 'Rooftop feast', description: 'Eat together with crema catalana.' }],

  included: ['All ingredients', 'Dinner & dessert', 'Unlimited sangria', 'Recipes by email'],
  notIncluded: ['Hotel pickup'],
  whatToBring: ['Sunglasses', 'Light layer for the evening'],
  meetingPoint: { name: 'Sol Rooftop Studio', address: 'Carrer de València 230, 08007 Barcelona', lat: 41.391, lng: 2.165, instructions: 'Ring "Àtic" at the green door and take the lift to the top.' }
},
{
  id: 'gaudi-through-a-lens', title: 'Gaudí Through a Lens', destinationId: 'barcelona', categoryId: 'photography', hostId: 'pau',
  image: images.bcnGaudi, gallery: [images.bcnGaudi, images.destBarcelona, images.bcnTapas, images.bcnPaella],
  pricePerPerson: 59, privateGroupPrice: 320, durationHours: 3, minGuests: 1, maxGuests: 8, languages: ['English', 'Spanish', 'Catalan'],
  timesOfDay: ['morning'], departureTimes: ['08:30'], wheelchairAccessible: false, rating: 4.86, reviewCount: 94,
  summary: 'Photograph Park Güell and Gràcia\u2019s modernista gems with a pro.',
  description: 'Start early in Park Güell before crowds, master architectural composition and finish in Gràcia\u2019s squares capturing everyday Barcelona life.',
  itinerary: [
  { time: '0:00', title: 'Park Güell at opening', description: 'Mosaics, columns and the city view.' },
  { time: '1:30', title: 'Gràcia streets', description: 'Hidden modernista façades.' },
  { time: '2:30', title: 'Coffee & photo review', description: 'Quick edits and feedback.' }],

  included: ['Park Güell entry ticket', 'Photo review session', 'Coffee'],
  notIncluded: ['Camera equipment'],
  whatToBring: ['Camera or smartphone', 'Wide-angle lens if you have one'],
  meetingPoint: { name: 'Park Güell main gate', address: 'Carrer d\u2019Olot, 08024 Barcelona', lat: 41.4145, lng: 2.1527, instructions: 'Meet beside the gatehouse on Carrer d\u2019Olot.' }
},
{
  id: 'riad-tagine-cooking-class', title: 'Moroccan Tagine Cooking Class', destinationId: 'marrakech', categoryId: 'workshops', hostId: 'fatima',
  image: images.marrakechTagine, gallery: [images.marrakechTagine, images.destMarrakech, images.hero, images.cdmxMole],
  pricePerPerson: 58, privateGroupPrice: 340, durationHours: 4.5, minGuests: 1, maxGuests: 10, languages: ['Arabic', 'French', 'English'],
  timesOfDay: ['morning', 'afternoon'], departureTimes: ['09:30', '15:00'], wheelchairAccessible: false, rating: 4.95, reviewCount: 326,
  summary: 'Shop the spice souk, then cook a slow tagine on a riad rooftop.',
  description: 'Fatima leads you through the medina\u2019s spice stalls to build your own ras el hanout, then you\u2019ll cook chicken tagine with preserved lemon, zaalouk salad and fresh khobz.',
  itinerary: [
  { time: '0:00', title: 'Spice souk walk', description: 'Smell, taste and choose your spices.' },
  { time: '1:00', title: 'Mint tea welcome', description: 'Learn the art of the Moroccan pour.' },
  { time: '1:30', title: 'Rooftop cooking', description: 'Tagine, salads and bread from scratch.' },
  { time: '3:30', title: 'Lunch on the terrace', description: 'Eat everything you made.' }],

  included: ['Spices to take home', 'Lunch & mint tea', 'Recipe cards'],
  notIncluded: ['Hotel pickup outside the medina'],
  whatToBring: ['Modest clothing for the souk', 'Sun hat'],
  meetingPoint: { name: 'Café des Épices', address: 'Rahba Lakdima, Medina, Marrakech', lat: 31.63, lng: -7.989, instructions: 'Meet at the café entrance in the spice square.' }
},
{
  id: 'sea-point-dolphin-kayak', title: 'Kayak with Dolphins off Sea Point', destinationId: 'cape-town', categoryId: 'outdoors', hostId: 'thabo',
  image: images.capeTownKayak, gallery: [images.capeTownKayak, images.destCapeTown, images.boKaapPhoto, images.capeTownJazz],
  pricePerPerson: 75, privateGroupPrice: 480, durationHours: 2, minGuests: 2, maxGuests: 10, languages: ['English', 'Zulu', 'Afrikaans'],
  timesOfDay: ['morning'], departureTimes: ['07:00', '09:30'], wheelchairAccessible: false, rating: 4.91, reviewCount: 389,
  summary: 'Paddle the Atlantic with dolphins, seals and Lion\u2019s Head views.',
  description: 'Glide across the calm morning ocean where dusky dolphins and Cape fur seals play. Double kayaks make it easy for beginners — Thabo handles the rest.',
  itinerary: [
  { time: '0:00', title: 'Gear up at Three Anchor Bay', description: 'Wetsuits, life vests and a quick lesson.' },
  { time: '0:20', title: 'Dolphin search', description: 'Paddle out along the kelp forests.' },
  { time: '1:30', title: 'Coffee on the beach', description: 'Warm up and share photos.' }],

  included: ['Double kayak & gear', 'Wetsuit', 'GoPro photos', 'Coffee & rusks'],
  notIncluded: ['Transport'],
  whatToBring: ['Swimsuit', 'Towel', 'Sunscreen'],
  meetingPoint: { name: 'Three Anchor Bay', address: 'Beach Rd, Three Anchor Bay, Cape Town', lat: -33.9077, lng: 18.3971, instructions: 'Look for the coral kayak trailer in the car park.' }
},
{
  id: 'city-bowl-jazz-bars', title: 'Jazz Bars of the City Bowl', destinationId: 'cape-town', categoryId: 'nightlife', hostId: 'thabo',
  image: images.capeTownJazz, gallery: [images.capeTownJazz, images.destCapeTown, images.boKaapPhoto, images.capeTownKayak],
  pricePerPerson: 62, privateGroupPrice: 420, durationHours: 3.5, minGuests: 1, maxGuests: 12, languages: ['English'],
  timesOfDay: ['evening'], departureTimes: ['19:30'], wheelchairAccessible: true, rating: 4.89, reviewCount: 211,
  summary: 'Discover Cape jazz in three intimate live-music venues.',
  description: 'Cape Town has one of the richest jazz traditions in the world. Hear live sets in three venues, from a candlelit basement to a rooftop bar, with local craft drinks along the way.',
  itinerary: [
  { time: '0:00', title: 'Cape jazz history', description: 'Stories over a craft cocktail.' },
  { time: '0:45', title: 'Basement session', description: 'A live trio in a 40-seat room.' },
  { time: '2:15', title: 'Rooftop finale', description: 'Late set overlooking the city lights.' }],

  included: ['Cover charges', '3 drinks', 'Reserved tables'],
  notIncluded: ['Food', 'Ride home'],
  whatToBring: ['ID (18+)', 'Smart-casual clothes'],
  meetingPoint: { name: 'Greenmarket Square', address: 'Greenmarket Square, Cape Town City Centre', lat: -33.9225, lng: 18.4196, instructions: 'Meet by the Old Town House steps.' }
},
{
  id: 'bo-kaap-photo-walk-lunch', title: 'Bo-Kaap Photo Walk & Cape Malay Lunch', destinationId: 'cape-town', categoryId: 'photography', hostId: 'amina',
  image: images.boKaapPhoto, gallery: [images.boKaapPhoto, images.destCapeTown, images.capeTownJazz, images.capeTownKayak],
  pricePerPerson: 68, privateGroupPrice: 390, durationHours: 3.5, minGuests: 1, maxGuests: 8, languages: ['English', 'Afrikaans'],
  timesOfDay: ['morning', 'afternoon'], departureTimes: ['10:00'], wheelchairAccessible: false, rating: 4.94, reviewCount: 158,
  summary: 'Photograph colorful Bo-Kaap with a local, then share a family lunch.',
  description: 'Walk the cobbled streets where Amina grew up, learn the history behind the colors, photograph Table Mountain views and finish with a home-cooked Cape Malay curry.',
  itinerary: [
  { time: '0:00', title: 'Wale Street start', description: 'History of Bo-Kaap and its people.' },
  { time: '0:30', title: 'Color & light', description: 'Photo stops on Chiappini and Rose streets.' },
  { time: '2:00', title: 'Family lunch', description: 'Cape Malay curry and koeksisters at Amina\u2019s home.' }],

  included: ['Home-cooked lunch', 'Photo tips', 'Spice sachet'],
  notIncluded: ['Camera equipment'],
  whatToBring: ['Camera or phone', 'Respectful clothing'],
  meetingPoint: { name: 'Bo-Kaap Museum', address: '71 Wale St, Schotsche Kloof, Cape Town', lat: -33.9207, lng: 18.4148, instructions: 'Meet in front of the museum entrance.' }
}];