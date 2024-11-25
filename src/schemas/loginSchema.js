import { z } from "zod";

export const loginSchema = z.object({
  user: z
    .string({ required_error: "El correo es requerido" })
    .email({ message: "El correo no es válido" })
    .min(5, { message: "El correo no es válido" })
    .max(50, { message: "El correo no es válido" }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .max(64, { message: "La contraseña no debe tener más de 64 caracteres" }),
});
