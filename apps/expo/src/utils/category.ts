import { Category } from "@packages/db";

const categories = {
  SERVICE_STATUS: "Service Status",
  GTA_ONLINE: "GTA Online",
  GTA_VI: "GTA VI",
  GTA_TRIOLOGY: "GTA Triology",
  RED_DEAD_ONLINE: "Red Dead Online",
  ROCKSTAR_GAMES: "Rockstar Games",
  TAKE_TWO: "Take Two",
  HUROC: "Huroc",
} as const;

export const formatCategory = (category: Category) => categories[category];

export const formatCategories = (cats: Category[]) =>
  cats.map((c) => formatCategory(c));
