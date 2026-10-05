import { Farm } from "../types/marketplace";
import { images } from "./images";

export const farms: Farm[] = [
{
  id: "willow-creek",
  name: "Willow Creek Farm",
  tagline: "Heirloom vegetables grown on 12 no-till acres",
  owner: "Hannah Reyes",
  location: "Rhinebeck, NY",
  address: "214 Mill Road, Rhinebeck, NY 12572",
  distanceMi: 6.2,
  coords: { x: 66, y: 55 },
  coverImage: images.farmVeg,
  shortStory:
  "Hannah left a city kitchen to grow the vegetables she used to cook with. Twelve years on, her no-till beds feed 400 families a week.",
  story: [
  "Hannah Reyes spent a decade cooking in New York restaurants before deciding she wanted to be on the other side of the delivery door. In 2014 she leased four acres of tired hayfield outside Rhinebeck and started building soil.",
  "Today Willow Creek grows more than 60 varieties of vegetables on 12 certified-organic, no-till acres. Everything is harvested the morning before pickup and washed in cold well water.",
  "We save our own seed for our favorite heirloom tomatoes and host a free open-field day every September — come see where your food grows."],

  since: 2014,
  acres: 12,
  practices: ["Certified organic", "No-spray", "Heirloom", "Regenerative"],
  pickup: [
  { day: "Tuesday", window: "3:00 – 7:00 pm", location: "Farm stand, 214 Mill Road" },
  { day: "Saturday", window: "9:00 am – 12:00 pm", location: "Rhinebeck Farmers Market, booth 14" }],

  deliveryZones: [
  { name: "Rhinebeck & Red Hook", fee: 4, minOrder: 25, days: "Thursday" },
  { name: "Kingston & Saugerties", fee: 7, minOrder: 35, days: "Thursday" }],

  rating: 4.9,
  reviewCount: 212,
  responseTime: "within 2 hours",
  pickupInstructions:
  "Pull into the gravel lot past the red mailbox. Orders are boxed and labeled by last name in the cooler on the porch — grab yours and wave hello!"
},
{
  id: "sunnyside-orchard",
  name: "Sunnyside Orchard",
  tagline: "Four generations of apples, peaches and berries",
  owner: "Tom & Ellie Brandt",
  location: "Red Hook, NY",
  address: "88 Orchard Lane, Red Hook, NY 12571",
  distanceMi: 9.8,
  coords: { x: 64, y: 40 },
  coverImage: images.farmOrchard,
  shortStory:
  "The Brandts have tended the same hillside since 1938. They now grow 34 apple varieties using integrated pest management and bee-friendly cover crops.",
  story: [
  "Ellie's great-grandfather planted the first Baldwin trees on this hillside in 1938. Four generations later the orchard has grown to 70 acres and 34 apple varieties, plus peaches, pears and a June strawberry patch.",
  "We use integrated pest management, keep our own bee colonies and plant clover between rows to feed the soil. Fruit is picked ripe — never gassed or stored for months."],

  since: 1938,
  acres: 70,
  practices: ["No-spray", "Regenerative", "Heirloom"],
  pickup: [
  { day: "Wednesday", window: "12:00 – 6:00 pm", location: "Orchard barn store" },
  { day: "Saturday", window: "8:00 am – 2:00 pm", location: "Orchard barn store" }],

  deliveryZones: [{ name: "Red Hook, Rhinebeck & Tivoli", fee: 5, minOrder: 30, days: "Friday" }],
  rating: 4.8,
  reviewCount: 340,
  responseTime: "within 4 hours",
  pickupInstructions:
  "Come to the big red barn — the pickup shelf is just inside the sliding door on the left. Ask for a free cider sample!"
},
{
  id: "little-hen",
  name: "Little Hen Homestead",
  tagline: "Pasture-raised eggs from happy, roaming hens",
  owner: "Marcus Bell",
  location: "New Paltz, NY",
  address: "17 Libertyville Road, New Paltz, NY 12561",
  distanceMi: 15.4,
  coords: { x: 32, y: 85 },
  coverImage: images.farmPasture,
  shortStory:
  "800 heritage hens move to fresh pasture every three days in Marcus's hand-built mobile coops. The result: deep-orange yolks and healthier fields.",
  story: [
  "Marcus started with six backyard chickens and a borrowed egg carton. Now 800 heritage-breed hens and 60 ducks rotate across 20 acres of pasture in mobile coops he built himself.",
  "Moving the flock every three days keeps the birds healthy and spreads fertility across the land. Our eggs are collected twice daily and never more than four days old at pickup."],

  since: 2017,
  acres: 20,
  practices: ["Pasture-raised", "Free-range", "Regenerative"],
  pickup: [
  { day: "Thursday", window: "4:00 – 7:00 pm", location: "Farm gate, 17 Libertyville Rd" },
  { day: "Sunday", window: "10:00 am – 1:00 pm", location: "New Paltz Farmers Market" }],

  deliveryZones: [{ name: "New Paltz, Highland & Gardiner", fee: 4, minOrder: 20, days: "Friday" }],
  rating: 5.0,
  reviewCount: 158,
  responseTime: "within 1 hour",
  pickupInstructions:
  "The egg fridge is in the little white shed at the end of the driveway. Please return empty cartons to the bin — we reuse them!"
},
{
  id: "stone-wall-creamery",
  name: "Stone Wall Creamery",
  tagline: "Farmstead cheese from our own Jersey herd",
  owner: "Priya Natarajan",
  location: "Hudson, NY",
  address: "402 County Route 9, Hudson, NY 12534",
  distanceMi: 21.0,
  coords: { x: 62, y: 12 },
  coverImage: images.chevre,
  shortStory:
  "Priya milks 30 Jerseys and a small goat herd, turning every drop into aged cheddars and fresh chèvre in her on-farm cave.",
  story: [
  "Stone Wall Creamery is a true farmstead dairy: every cheese is made from the milk of our own 30 Jersey cows and 18 Nubian goats, within hours of milking.",
  "Our cheddars age 9 to 18 months in a cave dug into the hillside behind the barn. Fresh chèvre is made twice a week and rolled in herbs from the garden."],

  since: 2016,
  acres: 45,
  practices: ["Grass-fed", "Pasture-raised", "Small batch"],
  pickup: [{ day: "Saturday", window: "10:00 am – 3:00 pm", location: "Creamery shop" }],
  deliveryZones: [{ name: "Hudson, Germantown & Catskill", fee: 6, minOrder: 30, days: "Friday" }],
  rating: 4.9,
  reviewCount: 96,
  responseTime: "within 3 hours",
  pickupInstructions:
  "Ring the cowbell at the creamery shop door. Your order will be in the cold case with your name on it."
},
{
  id: "black-oak-ranch",
  name: "Black Oak Ranch",
  tagline: "Grass-fed beef and pastured poultry",
  owner: "Dale Kowalski",
  location: "Germantown, NY",
  address: "1290 Route 9G, Germantown, NY 12526",
  distanceMi: 17.5,
  coords: { x: 58, y: 25 },
  coverImage: images.farmStand,
  shortStory:
  "Dale's cattle graze 100% grass across 180 rolling acres. Chickens follow the herd, cleaning pasture and building soil the old-fashioned way.",
  story: [
  "Black Oak Ranch raises Angus-cross cattle on nothing but grass and hay, moved daily across 180 acres of rolling pasture. Our chickens follow a few days behind, scratching through the paddocks.",
  "Everything is processed at a USDA-inspected family butcher 20 minutes away, then vacuum-sealed and frozen at peak freshness."],

  since: 2009,
  acres: 180,
  practices: ["Grass-fed", "Pasture-raised", "Regenerative"],
  pickup: [{ day: "Friday", window: "2:00 – 6:00 pm", location: "Ranch farm store" }],
  deliveryZones: [
  { name: "Germantown, Hudson & Red Hook", fee: 6, minOrder: 40, days: "Saturday" },
  { name: "Kingston & Rhinebeck", fee: 9, minOrder: 50, days: "Saturday" }],

  rating: 4.8,
  reviewCount: 121,
  responseTime: "within 5 hours",
  pickupInstructions:
  "Pull up to the farm store beside the silo. Frozen orders are packed in insulated bags — bring a cooler if you have a long drive."
},
{
  id: "bee-kind-apiary",
  name: "Bee Kind Apiary",
  tagline: "Raw honey from 120 hives in the Catskill foothills",
  owner: "June Okafor",
  location: "Woodstock, NY",
  address: "55 Glasco Turnpike, Woodstock, NY 12498",
  distanceMi: 11.3,
  coords: { x: 24, y: 38 },
  coverImage: images.farmApiary,
  shortStory:
  "June keeps 120 hives on wildflower meadows and partner farms. Her honey is never heated or filtered — just spun, strained and jarred.",
  story: [
  "June caught her first swarm in 2012 and has been hooked ever since. Bee Kind now tends 120 hives placed on wildflower meadows and partner farms across the valley.",
  "We harvest just twice a year and never heat or micro-filter our honey, so it keeps its pollen, enzymes and the flavor of each season."],

  since: 2012,
  acres: 8,
  practices: ["Raw & unfiltered", "Small batch"],
  pickup: [{ day: "Saturday", window: "11:00 am – 4:00 pm", location: "Honey house, 55 Glasco Tpke" }],
  deliveryZones: [{ name: "Woodstock, Saugerties & Kingston", fee: 4, minOrder: 25, days: "Wednesday" }],
  rating: 5.0,
  reviewCount: 187,
  responseTime: "within 2 hours",
  pickupInstructions:
  "The honey house is the small yellow building behind the main house. Self-serve pickup shelf is on the right."
},
{
  id: "hearth-grain",
  name: "Hearth & Grain Bakehouse",
  tagline: "Wood-fired breads from locally milled grain",
  owner: "Sam & Leo Marchetti",
  location: "Kingston, NY",
  address: "31 Wall Street, Kingston, NY 12401",
  distanceMi: 1.1,
  coords: { x: 42, y: 58 },
  coverImage: images.farmBakery,
  shortStory:
  "Two brothers, one wood-fired oven and grain milled ten miles away. Every loaf is naturally leavened for 36 hours.",
  story: [
  "Sam and Leo built their brick oven by hand in the back of an old Kingston carriage house. Every morning at 3 am they fire it with local hardwood.",
  "All our flour is grown and stone-milled in the Hudson Valley. Our country loaf ferments for 36 hours for a deep flavor and a crust that crackles."],

  since: 2019,
  acres: 0,
  practices: ["Wood-fired", "Small batch", "Certified organic"],
  pickup: [
  { day: "Wednesday", window: "7:00 am – 1:00 pm", location: "Bakehouse counter, 31 Wall St" },
  { day: "Saturday", window: "7:00 am – 12:00 pm", location: "Bakehouse counter, 31 Wall St" }],

  deliveryZones: [{ name: "Kingston & Uptown", fee: 3, minOrder: 15, days: "Wednesday & Saturday" }],
  rating: 4.9,
  reviewCount: 264,
  responseTime: "within 1 hour",
  pickupInstructions:
  "Skip the line and head to the pickup shelf by the window — bags are labeled with your first name and order number."
},
{
  id: "fieldnotes-flowers",
  name: "Fieldnotes Flower Farm",
  tagline: "Seasonal cut flowers grown without chemicals",
  owner: "Rosa Lindqvist",
  location: "Saugerties, NY",
  address: "9 Churchland Road, Saugerties, NY 12477",
  distanceMi: 10.2,
  coords: { x: 40, y: 30 },
  coverImage: images.dahlias,
  shortStory:
  "Rosa grows 200+ varieties of dahlias, zinnias and sunflowers on two acres — cut at dawn and arranged the same day.",
  story: [
  "Fieldnotes started as a corner of Rosa's vegetable garden and grew into two acres of dahlias, zinnias, cosmos and sunflowers.",
  "We grow without synthetic chemicals and cut every stem at dawn, so bouquets last a week or more in your vase."],

  since: 2020,
  acres: 2,
  practices: ["No-spray", "Small batch"],
  pickup: [{ day: "Friday", window: "3:00 – 7:00 pm", location: "Flower cart, 9 Churchland Rd" }],
  deliveryZones: [{ name: "Saugerties, Woodstock & Kingston", fee: 5, minOrder: 20, days: "Friday" }],
  rating: 4.9,
  reviewCount: 74,
  responseTime: "within 3 hours",
  pickupInstructions:
  "Bouquets wait in buckets of water on the flower cart by the barn. Look for your name on the kraft tag."
}];