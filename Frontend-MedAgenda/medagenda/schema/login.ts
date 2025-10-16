import { z } from 'zod'

export const loginScheme = z.object({
  email: z.email({ message: 'Error en mail no sirve' })
          .min(5, { message: "Se requiere minimo 5 caracteres" }),
  password: z.string()
          .min(5, { message: "Se requiere minimo 5 caracteres" })
})