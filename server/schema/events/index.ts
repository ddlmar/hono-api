import { z } from "zod";

export const eventsSchema = z.object({
  name: z.string().min(3),
  date: z.date(),
});

type Events = z.infer<typeof eventsSchema>;

export type { Events };
