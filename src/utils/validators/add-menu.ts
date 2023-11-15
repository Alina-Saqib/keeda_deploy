import { z } from 'zod';

// form zod validation schema
export const addMenuSchema = z.object({
  name: z.string().min(3),
});

// generate form types from zod validation schema
export type AddMenuSchema = z.infer<typeof addMenuSchema>;
