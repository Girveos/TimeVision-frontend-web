import { z } from "zod";

export const loginSchema = z.object({
  user: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo no es válido" })
    .min(5, { message: "El correo no es válido" })
    .max(50, { message: "El correo no es válido" }),
  pass: z
    .string({ required_error: "La contraseña es requerida" })
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .max(64, { message: "La contraseña no debe tener más de 64 caracteres" }),
});
