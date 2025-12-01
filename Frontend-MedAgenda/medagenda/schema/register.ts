import { z } from 'zod'

export const RegisterSchema = z.object({
  first_name: z.string().trim().min(1, { message: 'Requerido' }).max(20),
  second_name: z.string().trim().max(20).optional(),
  first_last_name: z.string().trim().min(1, { message: 'Requerido' }).max(20),
  second_last_name: z.string().trim().min(1, { message: 'Requerido' }).max(20),
  legal_id: z.string().trim().min(5, { message: 'Mínimo 5 caracteres' }).max(15, { message: 'Máximo 15 caracteres' }),
  user_phone_number: z.string().trim().min(1, { message: 'Requerido' }).max(13),
  user_email_address: z.string().trim().toLowerCase().email({ message: 'Email inválido' }).max(255),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }).max(255),
}).strict()

export type RegisterInput = z.infer<typeof RegisterSchema>
