import { images } from "./images";
import type { RealWedding } from "../types/marketplace";

export const realWeddings: RealWedding[] = [
{
  id: "rw1",
  couple: "Isabel & Marcus",
  location: "Hillcrest Estate, Sonoma",
  season: "Spring 2026",
  style: "Garden",
  image: images.gardenWedding,
  excerpt: "A rose-covered pergola, a string quartet and a family-style feast under the oaks — a weekend-long celebration with 160 of their favorite people.",
  vendorIds: ["v4", "v6", "v8", "v11"]
},
{
  id: "rw2",
  couple: "Priya & Daniel",
  location: "San Francisco City Hall",
  season: "Winter 2026",
  style: "Black-tie",
  image: images.cityWedding,
  excerpt: "Marble, gold and a sleek modern gown. An intimate rotunda ceremony followed by a dinner-party reception in Pacific Heights.",
  vendorIds: ["v1", "v7", "v9", "v15"]
},
{
  id: "rw3",
  couple: "Camila & Ethan",
  location: "Big Sur Coast",
  season: "Summer 2026",
  style: "Coastal",
  image: images.coupleCoast,
  excerpt: "Fog rolling in over the cliffs, bare feet in the grass, and 35mm film capturing every windswept moment of their clifftop vows.",
  vendorIds: ["v2", "v13", "v16"]
}];