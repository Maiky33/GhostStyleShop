import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Los nombres son requeridos")
    .max(100, "Los nombres son demasiado largos"),
  lastName: z
    .string()
    .trim()
    .min(1, "Los apellidos son requeridos")
    .max(100, "Los apellidos son demasiado largos"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(72, "La contraseña es demasiado larga"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

export function zodFieldErrors(error: z.ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const key = issue.path.join(".") || "root";
    fieldErrors[key] ??= [];
    fieldErrors[key].push(issue.message);
  }

  return fieldErrors;
}
