import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string({ required_error: "Nombre requerido" })
    .max(50, { message: "El campo no debe tener más de 50 caracteres" }),
  lastname: z
    .string({ required_error: "Apellido requerido" })
    .max(50, { message: "El campo no debe tener más de 50 caracteres" }),
  type_doc: z.string({ required_error: "Tipo de documento requerido" }),
  num_doc: z
  .string({
    required_error: "Número de documento requerido",
  })
    .max(50, { message: "El campo no debe tener más de 50 caracteres" }),
  telephone: z
    .string({
      required_error: "Teléfono requerido"
    })
    .max(10, { message: "El campo no debe tener más de 10 caracteres" }),
  email: z
    .string({ required_error: "Correo requerido" })
    .email({ message: "El correo no es válido" })
    .min(5, { message: "El correo no es válido" })
    .max(50, { message: "El correo no es válido" }),
  password: z
    .string({ required_error: "Contraseña requerida" })
    .max(64, { message: "La contraseña no debe tener más de 64 caracteres" }),
  position: z
    .string({ required_error: "Cargo requerido" })
    .max(50, { message: "El campo no debe tener más de 50 caracteres" }),
});
