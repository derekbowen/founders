import { images as img } from "./images";
import type { Vendor } from "../types/marketplace";

export const vendors: Vendor[] = [
{
  id: "v1", slug: "golden-hour-atelier", name: "Golden Hour Atelier", category: "photographers", ownerId: "u-claire",
  tagline: "Editorial wedding photography with a documentary heart",
  description: "Golden Hour Atelier photographs weddings across Northern California and beyond. Our approach blends unposed storytelling with gently guided portraits, always shot in natural light. Every collection includes a private online gallery, full-resolution images, and a sneak peek within 72 hours.",
  city: "San Francisco", lat: 37.7749, lng: -122.4194, startingPrice: 2400, priceUnit: "per event", rating: 4.97, reviewCount: 128,
  styles: ["Editorial", "Romantic", "Classic"], languages: ["English", "French"], guestCapacity: { min: 2, max: 400 },
  serviceArea: ["San Francisco", "Napa Valley", "Sonoma", "Monterey Peninsula"], travelRadius: 150,
  awards: ["Vowly Couples' Choice 2026", "Featured in Vogue Weddings", "Junebug Best of the Best 2025"],
  packages: [
  { name: "Elopement", price: 2400, description: "Intimate coverage for elopements and micro-weddings.", includes: ["3 hours of coverage", "300+ edited images", "Online gallery"] },
  { name: "Signature", price: 4800, description: "Our most-loved collection for full wedding days.", includes: ["8 hours of coverage", "Second photographer", "Engagement session"] },
  { name: "Heirloom", price: 7200, description: "Full-day storytelling with an heirloom album.", includes: ["10 hours of coverage", "Second photographer", "12×12 linen album"] }],

  images: [img.goldenHour, img.bridalDetails, img.ceremonyArch, img.coupleCoast, img.gardenWedding],
  responseTime: "within 2 hours", yearsInBusiness: 9, unavailableDates: ["2027-06-12", "2027-09-18", "2027-05-22"]
},
{
  id: "v2", slug: "saltwater-and-film", name: "Saltwater & Film", category: "photographers", ownerId: "u-marco",
  tagline: "Coastal love stories on film and digital",
  description: "Based in Santa Cruz, Saltwater & Film captures relaxed, sun-soaked weddings on the beach, in the redwoods and beyond. We shoot a hybrid of 35mm film and digital, and offer bilingual coverage in English and Spanish.",
  city: "Santa Cruz", lat: 36.9741, lng: -122.0308, startingPrice: 3200, priceUnit: "per event", rating: 4.92, reviewCount: 86,
  styles: ["Coastal", "Boho", "Destination"], languages: ["English", "Spanish"], guestCapacity: { min: 2, max: 250 },
  serviceArea: ["Santa Cruz", "Monterey Peninsula", "South Bay", "Peninsula"], travelRadius: 120,
  awards: ["Best of Vowly 2025"],
  packages: [
  { name: "Half day", price: 3200, description: "Ceremony, portraits and cocktail hour.", includes: ["5 hours of coverage", "2 rolls of 35mm film", "Online gallery"] },
  { name: "Full day", price: 4900, description: "Getting ready through the last dance.", includes: ["9 hours of coverage", "Second shooter", "5 rolls of film"] }],

  images: [img.coupleCoast, img.ceremonyArch, img.goldenHour, img.receptionTent, img.bridalDetails],
  responseTime: "within 4 hours", yearsInBusiness: 7, unavailableDates: ["2027-07-10", "2027-08-14"]
},
{
  id: "v3", slug: "alpine-and-oak", name: "Alpine & Oak Photo", category: "photographers", ownerId: "u-hana",
  tagline: "Elopements and intimate weddings in wild places",
  description: "Alpine & Oak specializes in adventurous elopements and small weddings under 60 guests. Hana helps with every detail — permits, timing for the best light, and hidden locations from the redwoods to Lake Tahoe.",
  city: "Mill Valley", lat: 37.906, lng: -122.545, startingPrice: 2900, priceUnit: "per event", rating: 4.88, reviewCount: 54,
  styles: ["Minimalist", "Rustic", "Destination"], languages: ["English", "Korean"], guestCapacity: { min: 2, max: 60 },
  serviceArea: ["Marin", "Lake Tahoe", "Sonoma", "San Francisco"], travelRadius: 250,
  awards: ["Adventure Instead Featured Artist"],
  packages: [
  { name: "Sunrise elopement", price: 2900, description: "Four hours of adventure at first light.", includes: ["4 hours of coverage", "Location scouting", "Permit guidance"] },
  { name: "Weekend adventure", price: 5400, description: "Two days of storytelling for destination couples.", includes: ["Up to 12 hours over 2 days", "Itinerary planning", "Printed keepsake box"] }],

  images: [img.mountainElopement, img.goldenHour, img.coupleCoast, img.bridalDetails, img.gardenWedding],
  responseTime: "within a day", yearsInBusiness: 5, unavailableDates: ["2027-06-05"]
},
{
  id: "v4", slug: "hillcrest-estate", name: "Hillcrest Estate", category: "venues", ownerId: "u-william",
  tagline: "A historic stone estate among Sonoma's oaks",
  description: "Set on 40 acres of gardens, oak groves and vineyards, Hillcrest Estate hosts one wedding per day so the whole property is yours. Ceremony lawn, a candlelit barrel room, and an overnight suite for the couple are included in every rental.",
  city: "Sonoma", lat: 38.2919, lng: -122.458, startingPrice: 9500, priceUnit: "venue rental", rating: 4.9, reviewCount: 212,
  styles: ["Classic", "Garden", "Black-tie"], languages: ["English"], guestCapacity: { min: 50, max: 300 },
  serviceArea: ["Sonoma"], travelRadius: 0,
  awards: ["Sonoma Magazine Best Venue 2026", "Vowly Couples' Choice 2025"],
  packages: [
  { name: "Weekday", price: 9500, description: "Monday–Thursday celebrations.", includes: ["10-hour rental", "Tables & chairs for 200", "Bridal suite"] },
  { name: "Saturday", price: 14500, description: "Our signature peak-season date.", includes: ["12-hour rental", "Ceremony lawn & barrel room", "On-site coordinator"] },
  { name: "Weekend buyout", price: 24000, description: "Friday welcome party through Sunday brunch.", includes: ["3-day exclusive use", "12 guest cottages", "Rehearsal dinner terrace"] }],

  images: [img.venueEstate, img.gardenWedding, img.receptionTent, img.plannerTablescape, img.cateringTable],
  responseTime: "within 3 hours", yearsInBusiness: 22, unavailableDates: ["2027-06-12", "2027-06-19", "2027-09-25"]
},
{
  id: "v5", slug: "vine-and-vow-vineyard", name: "Vine & Vow Vineyard", category: "venues", ownerId: "u-sofia",
  tagline: "Golden-hour vows among the Napa vines",
  description: "A working family vineyard with a restored 1890s barn, ceremony arbor overlooking the vines, and estate wines poured at your reception. All-inclusive packages bundle catering, bar and day-of coordination.",
  city: "Napa", lat: 38.2975, lng: -122.2869, startingPrice: 11000, priceUnit: "venue rental", rating: 4.85, reviewCount: 97,
  styles: ["Rustic", "Romantic", "Garden"], languages: ["English", "Italian"], guestCapacity: { min: 40, max: 220 },
  serviceArea: ["Napa Valley"], travelRadius: 0,
  awards: ["Napa Valley Wedding Awards — Best Barn Venue"],
  packages: [
  { name: "Vineyard ceremony", price: 11000, description: "Ceremony and reception in the barn.", includes: ["8-hour rental", "Estate wine tasting", "Barn string lights"] },
  { name: "All-inclusive", price: 26000, description: "Venue, catering, bar and coordination for 120.", includes: ["Venue rental", "Plated dinner", "Day-of coordinator"] }],

  images: [img.venueVineyard, img.ceremonyArch, img.cateringTable, img.receptionTent, img.heroCouple],
  responseTime: "within 2 hours", yearsInBusiness: 15, unavailableDates: ["2027-05-29", "2027-09-11"]
},
{
  id: "v6", slug: "hart-and-bloom-florals", name: "Hart & Bloom Florals", category: "florists", ownerId: "u-emma",
  tagline: "Garden-grown florals, gathered from Sonoma farms",
  description: "Hart & Bloom designs lush, seasonal wedding flowers — cascading bouquets, ceremony arches and abundant tablescapes. We source from local flower farms whenever possible and compost every stem after your celebration.",
  city: "Petaluma", lat: 38.2324, lng: -122.6367, startingPrice: 3500, priceUnit: "per event", rating: 4.95, reviewCount: 143,
  styles: ["Romantic", "Garden", "Boho"], languages: ["English"], guestCapacity: { min: 20, max: 400 },
  serviceArea: ["Sonoma", "Marin", "Napa Valley", "San Francisco"], travelRadius: 90,
  awards: ["Vowly Couples' Choice 2025", "Vowly Couples' Choice 2026", "Slow Flowers Member"],
  packages: [
  { name: "Petite", price: 3500, description: "Personal flowers and a few statement pieces.", includes: ["Bridal bouquet + 4 bridesmaids", "8 boutonnieres", "Welcome sign arrangement"] },
  { name: "Garden party", price: 7800, description: "Full ceremony and reception design.", includes: ["Ceremony arch install", "15 centerpieces", "Delivery & breakdown"] }],

  images: [img.floralsBouquet, img.floristStudio, img.ceremonyArch, img.floralsCenterpiece, img.gardenWedding],
  responseTime: "within an hour", yearsInBusiness: 6, unavailableDates: ["2027-06-12"]
},
{
  id: "v7", slug: "petal-and-stem-studio", name: "Petal & Stem Studio", category: "florists", ownerId: "u-amara",
  tagline: "Sculptural florals for modern celebrations",
  description: "Petal & Stem creates architectural floral installations, suspended clouds and minimal tablescapes. We love unexpected color, dried textures and designing with negative space.",
  city: "Oakland", lat: 37.8044, lng: -122.2712, startingPrice: 2200, priceUnit: "per event", rating: 4.9, reviewCount: 71,
  styles: ["Modern", "Minimalist", "Editorial"], languages: ["English", "French"], guestCapacity: { min: 10, max: 300 },
  serviceArea: ["East Bay", "San Francisco", "Peninsula"], travelRadius: 60,
  awards: ["Martha Stewart Weddings — Florist to Watch 2026"],
  packages: [
  { name: "Modern essentials", price: 2200, description: "Bouquets, boutonnieres and bud vases.", includes: ["Sculptural bouquet", "6 boutonnieres", "20 bud vases"] },
  { name: "Installation", price: 6500, description: "Statement ceremony or ceiling installation.", includes: ["Custom install design", "Site visit", "Setup & strike"] }],

  images: [img.floralsCenterpiece, img.plannerTablescape, img.floralsBouquet, img.cityWedding, img.bridalDetails],
  responseTime: "within 3 hours", yearsInBusiness: 4, unavailableDates: ["2027-08-21"]
},
{
  id: "v8", slug: "harvest-table-catering", name: "Harvest Table Catering", category: "caterers", ownerId: "u-diego",
  tagline: "Farm-to-table feasts from Sonoma County",
  description: "Seasonal, family-style menus built around local farms and our wood-fired grill. Every package includes a tasting for two, staffing, rentals coordination and a late-night snack.",
  city: "Healdsburg", lat: 38.6105, lng: -122.8697, startingPrice: 95, priceUnit: "per guest", rating: 4.93, reviewCount: 164,
  styles: ["Rustic", "Garden", "Classic"], languages: ["English", "Spanish"], guestCapacity: { min: 50, max: 350 },
  serviceArea: ["Sonoma", "Napa Valley", "Marin"], travelRadius: 80,
  awards: ["Michelin Guide Recommended (restaurant)", "Best of Vowly 2026"],
  packages: [
  { name: "Family-style", price: 95, description: "Shared platters passed down long tables.", includes: ["3 passed appetizers", "Family-style dinner", "Tasting for two"] },
  { name: "Wood-fired feast", price: 135, description: "Live-fire stations and a raw bar.", includes: ["Oyster & crudo bar", "Live-fire grill station", "Late-night tacos"] }],

  images: [img.cateringTable, img.receptionTent, img.plannerTablescape, img.venueVineyard, img.gardenWedding],
  responseTime: "within 2 hours", yearsInBusiness: 11, unavailableDates: ["2027-09-18"]
},
{
  id: "v9", slug: "lantern-and-ladle", name: "Lantern & Ladle", category: "caterers", ownerId: "u-linh",
  tagline: "Modern Vietnamese-Californian catering",
  description: "Bright, modern menus with Vietnamese roots — from passed bánh mì bites to elegant plated dinners and late-night phở. Full-service staffing and bar packages available.",
  city: "San Francisco", lat: 37.7609, lng: -122.4350, startingPrice: 78, priceUnit: "per guest", rating: 4.87, reviewCount: 89,
  styles: ["Modern", "Editorial", "Black-tie"], languages: ["English", "Vietnamese"], guestCapacity: { min: 30, max: 500 },
  serviceArea: ["San Francisco", "East Bay", "Peninsula", "South Bay"], travelRadius: 70,
  awards: ["SF Chronicle Top Caterer 2025"],
  packages: [
  { name: "Stations", price: 78, description: "Interactive food stations and passed bites.", includes: ["4 passed bites", "3 stations", "Staffing"] },
  { name: "Plated", price: 120, description: "Four-course plated dinner service.", includes: ["Amuse-bouche", "Choice of 3 entrées", "Champagne toast"] }],

  images: [img.receptionTent, img.cateringTable, img.cityWedding, img.plannerTablescape, img.cakeTiered],
  responseTime: "within 4 hours", yearsInBusiness: 8, unavailableDates: ["2027-06-26"]
},
{
  id: "v10", slug: "velvet-groove-entertainment", name: "Velvet Groove Entertainment", category: "music", ownerId: "u-jordan",
  tagline: "DJ & MC who keeps the dance floor full",
  description: "Open-format DJ and bilingual MC service with premium sound, dance floor lighting and ceremony audio included. We build your playlist together in our online planning portal.",
  city: "Oakland", lat: 37.8270, lng: -122.2500, startingPrice: 2600, priceUnit: "per event", rating: 4.96, reviewCount: 201,
  styles: ["Modern", "Black-tie", "Classic"], languages: ["English", "Spanish"], guestCapacity: { min: 50, max: 600 },
  serviceArea: ["East Bay", "San Francisco", "Napa Valley", "Peninsula", "South Bay"], travelRadius: 120,
  awards: ["Vowly Couples' Choice 2024–2026", "WeddingWire Hall of Fame"],
  packages: [
  { name: "Reception", price: 2600, description: "Five hours of DJ & MC.", includes: ["5 hours DJ + MC", "Dance floor lighting", "Wireless mics"] },
  { name: "Ceremony to close", price: 3600, description: "Every moment, with ceremony sound.", includes: ["8 hours coverage", "Ceremony audio", "Uplighting (12)"] }],

  images: [img.djDancefloor, img.receptionTent, img.cityWedding, img.heroCouple, img.venueVineyard],
  responseTime: "within an hour", yearsInBusiness: 12, unavailableDates: ["2027-06-12", "2027-07-17"]
},
{
  id: "v11", slug: "strings-by-the-bay", name: "Strings by the Bay", category: "music", ownerId: "u-mei",
  tagline: "Ceremony strings, from Bach to Beyoncé",
  description: "Conservatory-trained string trios and quartets for ceremonies and cocktail hours. Choose from our library of 400+ arrangements or request a custom arrangement of your song.",
  city: "San Francisco", lat: 37.7929, lng: -122.4100, startingPrice: 1800, priceUnit: "per event", rating: 4.91, reviewCount: 63,
  styles: ["Classic", "Romantic", "Black-tie"], languages: ["English", "Mandarin"], guestCapacity: { min: 10, max: 400 },
  serviceArea: ["San Francisco", "Peninsula", "Marin", "Napa Valley"], travelRadius: 100,
  awards: ["Featured on The Knot"],
  packages: [
  { name: "Ceremony trio", price: 1800, description: "Prelude, processional and recessional.", includes: ["Violin, viola & cello", "Up to 1 hour", "Song consultation"] },
  { name: "Quartet + cocktails", price: 2900, description: "Ceremony and cocktail hour quartet.", includes: ["String quartet", "Up to 2.5 hours", "1 custom arrangement"] }],

  images: [img.cityWedding, img.ceremonyArch, img.gardenWedding, img.venueEstate, img.bridalDetails],
  responseTime: "within 5 hours", yearsInBusiness: 6, unavailableDates: []
},
{
  id: "v12", slug: "ever-after-events", name: "Ever After Events", category: "planners", ownerId: "u-sofia",
  tagline: "Wine country planning, from first idea to last dance",
  description: "Full-service planning, partial planning and month-of coordination for Napa and Sonoma weddings. We know every venue, every vendor and every back road — so you can simply enjoy being engaged.",
  city: "Calistoga", lat: 38.5788, lng: -122.5797, startingPrice: 3200, priceUnit: "coordination", rating: 4.94, reviewCount: 118,
  styles: ["Romantic", "Classic", "Destination"], languages: ["English", "Italian"], guestCapacity: { min: 20, max: 350 },
  serviceArea: ["Napa Valley", "Sonoma", "Lake Tahoe"], travelRadius: 200,
  awards: ["Vogue Weddings Top Planner", "Vowly Couples' Choice 2026"],
  packages: [
  { name: "Month-of", price: 3200, description: "We take over six weeks before the big day.", includes: ["Timeline & logistics", "Rehearsal direction", "Day-of team of 2"] },
  { name: "Full planning", price: 12000, description: "Twelve months of guidance and design.", includes: ["Vendor curation", "Design & mood boards", "Budget management"] }],

  images: [img.plannerTablescape, img.venueVineyard, img.stationery, img.ceremonyArch, img.heroCouple],
  responseTime: "within 2 hours", yearsInBusiness: 15, unavailableDates: ["2027-05-29", "2027-09-11"]
},
{
  id: "v13", slug: "the-modern-fete", name: "The Modern Fête", category: "planners", ownerId: "u-priya",
  tagline: "Design-forward planning for multicultural celebrations",
  description: "We plan modern weddings and multi-day multicultural celebrations — sangeet to send-off. Expect thoughtful design, rigorous logistics and a calm, organized team.",
  city: "San Francisco", lat: 37.7849, lng: -122.4294, startingPrice: 4500, priceUnit: "partial planning", rating: 4.89, reviewCount: 58,
  styles: ["Modern", "Editorial", "Minimalist"], languages: ["English", "Hindi"], guestCapacity: { min: 50, max: 600 },
  serviceArea: ["San Francisco", "Peninsula", "South Bay", "East Bay"], travelRadius: 100,
  awards: ["Brides Magazine Planner to Know 2026"],
  packages: [
  { name: "Partial planning", price: 4500, description: "For couples who've started and need a pro.", includes: ["6 months of support", "Vendor referrals", "Day-of coordination"] },
  { name: "Multi-day celebration", price: 15000, description: "Three days of events, fully managed.", includes: ["Up to 4 events", "Guest logistics", "Cultural ceremony expertise"] }],

  images: [img.ceremonyArch, img.plannerTablescape, img.cityWedding, img.stationery, img.floralsCenterpiece],
  responseTime: "within 3 hours", yearsInBusiness: 5, unavailableDates: ["2027-10-09"]
},
{
  id: "v14", slug: "maison-blanche-bridal", name: "Maison Blanche Bridal", category: "attire", ownerId: "u-celine",
  tagline: "A Parisian-inspired bridal salon",
  description: "Private, by-appointment gown fittings with champagne in our Palo Alto salon. We carry couture and independent designers, with in-house alterations and veil-making.",
  city: "Palo Alto", lat: 37.4419, lng: -122.143, startingPrice: 1800, priceUnit: "gowns", rating: 4.92, reviewCount: 176,
  styles: ["Classic", "Romantic", "Vintage", "Black-tie"], languages: ["English", "French"], guestCapacity: null,
  serviceArea: ["Peninsula", "South Bay", "San Francisco"], travelRadius: 0,
  awards: ["Vowly Couples' Choice 2026", "Brides Best Bridal Salon — Bay Area"],
  packages: [
  { name: "Signature appointment", price: 0, description: "90-minute private styling session.", includes: ["Private salon", "Champagne service", "Up to 3 guests"] },
  { name: "Gown + alterations", price: 2600, description: "Gown with complete in-house tailoring.", includes: ["Designer gown", "Unlimited fittings", "Steaming & pressing"] }],

  images: [img.attireGown, img.bridalDetails, img.heroCouple, img.cityWedding, img.goldenHour],
  responseTime: "within 6 hours", yearsInBusiness: 14, unavailableDates: []
},
{
  id: "v15", slug: "atelier-noir-suiting", name: "Atelier Noir Suiting", category: "attire", ownerId: "u-andre",
  tagline: "Bespoke suits and tuxedos for the whole party",
  description: "Made-to-measure and bespoke suiting for grooms, partners and wedding parties. Fabrics from Italian and English mills, with group rental options for groomsmen.",
  city: "San Francisco", lat: 37.7880, lng: -122.4070, startingPrice: 650, priceUnit: "suit rental", rating: 4.86, reviewCount: 49,
  styles: ["Modern", "Black-tie", "Classic"], languages: ["English", "Portuguese"], guestCapacity: null,
  serviceArea: ["San Francisco", "East Bay", "Peninsula"], travelRadius: 0,
  awards: ["SF Magazine Best Tailor 2025"],
  packages: [
  { name: "Party rental", price: 650, description: "Premium rental suits for the wedding party.", includes: ["Suit or tux", "Shirt & tie", "Free fitting"] },
  { name: "Made-to-measure", price: 1900, description: "Your suit, cut to your measurements.", includes: ["40+ measurements", "Two fittings", "Monogramming"] }],

  images: [img.bridalDetails, img.cityWedding, img.heroCouple, img.djDancefloor, img.attireGown],
  responseTime: "within a day", yearsInBusiness: 4, unavailableDates: []
},
{
  id: "v16", slug: "sugar-and-lace-cakes", name: "Sugar & Lace Cakes", category: "cakes", ownerId: "u-linh",
  tagline: "Buttercream wedding cakes with hand-sculpted sugar flowers",
  description: "Elegant tiered cakes, dessert tables and late-night sweets. Flavors range from classic vanilla-bean to pandan-coconut and black sesame. Complimentary tasting box for booked couples.",
  city: "San Jose", lat: 37.3382, lng: -121.8863, startingPrice: 7, priceUnit: "per slice", rating: 4.95, reviewCount: 132,
  styles: ["Romantic", "Vintage", "Garden"], languages: ["English", "Vietnamese"], guestCapacity: { min: 20, max: 500 },
  serviceArea: ["South Bay", "Peninsula", "San Francisco", "Santa Cruz"], travelRadius: 60,
  awards: ["Vowly Couples' Choice 2026"],
  packages: [
  { name: "Classic tiered", price: 7, description: "Buttercream tiers with fresh florals.", includes: ["2 flavors", "Delivery & setup", "Cake stand rental"] },
  { name: "Sugar-flower couture", price: 12, description: "Hand-sculpted sugar flowers & gold leaf.", includes: ["Up to 4 flavors", "Design consultation", "Anniversary tier"] }],

  images: [img.cakeTiered, img.plannerTablescape, img.receptionTent, img.floralsCenterpiece, img.gardenWedding],
  responseTime: "within 3 hours", yearsInBusiness: 8, unavailableDates: ["2027-06-12"]
}];