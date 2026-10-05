import { images } from "./images";
import type { Category } from "../types/marketplace";

export const categories: Category[] = [
{ id: "photographers", label: "Photographers", singular: "Photographer", description: "Editorial, documentary & film", image: images.goldenHour },
{ id: "venues", label: "Venues", singular: "Venue", description: "Estates, vineyards & lofts", image: images.venueEstate },
{ id: "florists", label: "Florists", singular: "Florist", description: "Bouquets, arches & installs", image: images.floralsBouquet },
{ id: "caterers", label: "Caterers", singular: "Caterer", description: "Plated, family-style & stations", image: images.cateringTable },
{ id: "music", label: "Music & DJs", singular: "Music & DJ", description: "DJs, bands & string quartets", image: images.djDancefloor },
{ id: "planners", label: "Planners", singular: "Planner", description: "Full planning & coordination", image: images.plannerTablescape },
{ id: "attire", label: "Attire", singular: "Attire", description: "Gowns, suits & alterations", image: images.attireGown },
{ id: "cakes", label: "Cakes", singular: "Cakes & desserts", description: "Cakes, desserts & sweets", image: images.cakeTiered }];