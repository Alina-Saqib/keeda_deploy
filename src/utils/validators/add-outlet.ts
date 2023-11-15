import { z } from 'zod';

export const addOutletSchema = z.object({
  name: z.string().min(3),
  type: z.string().min(1).max(20).optional(),
  pictureurl: z.string().optional(),
  dayOfWeek: z.string().optional(),
  country: z.string().optional(),
  address: z.string().optional(),
});

export type AddOutletSchema = z.infer<typeof addOutletSchema>;
