import { Category } from "../types/marketplace";
import { images } from "./images";

export const categories: Category[] = [
{ id: "vegetables", label: "Vegetables", blurb: "Greens, roots & heirlooms", image: images.carrots },
{ id: "fruit", label: "Fruit", blurb: "Orchard & berry patch", image: images.apples },
{ id: "eggs-dairy", label: "Eggs & dairy", blurb: "Pasture eggs, farmstead cheese", image: images.eggs },
{ id: "meat", label: "Meat", blurb: "Grass-fed & pasture-raised", image: images.beef },
{ id: "honey", label: "Honey", blurb: "Raw, local, unfiltered", image: images.honey },
{ id: "bakery", label: "Bakery", blurb: "Wood-fired breads & buns", image: images.sourdough },
{ id: "flowers", label: "Flowers", blurb: "Field-grown bouquets", image: images.dahlias }];