import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string({ required_error: "La contraseña actual es requerida." }),
    newPassword: z
      .string({ required_error: "La nueva contraseña es requerida." })
      .min(8, { message: "La nueva contraseña debe tener al menos 8 caracteres." })
      .max(64, { message: "La nueva contraseña no debe tener más de 64 caracteres." })
      .regex(
        /[A-Z]/,
        { message: "La nueva contraseña debe contener al menos una letra mayúscula." }
      )
      .regex(/^[^\ñÑ]*$/, { message: "La contraseña no puede contener la letra 'ñ'" })
      .regex(/^[^()]*[@$%&!\/\\?*.][^()]*$/, { message: "La nueva contraseña debe incluir al menos un caracter especial." })
      .regex(/\d/, { message: "La nueva contraseña debe contener al menos un número." }),
    confirmPassword: z.string({ required_error: "Debe confirmar la nueva contraseña." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });
