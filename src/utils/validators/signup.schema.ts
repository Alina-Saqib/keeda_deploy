import { z } from 'zod';
import { messages } from '@/config/messages';
import {
  validateEmail,
  validatePassword,
} from '@/utils/validators/common-rules';

// form zod validation schema
export const signUpSchema = z.object({
  name: z.string().min(1, { message: messages.firstNameRequired }),
  phone: z.string().min(1).max(20).optional(), // Adjust the maximum length as needed
  email: validateEmail,
  password: validatePassword,
  isAgreed: z.boolean().optional(),
});

// generate form types from zod validation schema
export type SignUpSchema = z.infer<typeof signUpSchema>;
