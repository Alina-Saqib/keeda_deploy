import { z } from 'zod';

// form zod validation schema
export const addBusinessSchema = z.object({
  name: z.string().min(3),
  type: z.string(), // Adjust the maximum length as needed
  description: z.string().optional(),
});

// generate form types from zod validation schema
export type AddBusinessSchema = z.infer<typeof addBusinessSchema>;
