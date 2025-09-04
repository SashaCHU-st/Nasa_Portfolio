import { z } from "zod";

export const FavoriteSchema = z.object({
  nasa_id: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});