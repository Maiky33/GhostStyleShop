import { AuthError, setAuthCookie, signAuthToken } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { registerSchema, zodFieldErrors } from "@/lib/validations/auth";
import { registerUser } from "@/services/auth.service";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("El cuerpo de la petición no es válido", 400);
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(
      "Revisa los datos ingresados",
      400,
      zodFieldErrors(parsed.error),
    );
  }

  try {
    const user = await registerUser(parsed.data);
    const token = signAuthToken(user);
    await setAuthCookie(token);

    return jsonSuccess({ user }, 201);
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, error.status);
    }

    console.error("Register failed", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2021"
    ) {
      return jsonError(
        "La base de datos aún no tiene las tablas de Prisma. Ejecuta las migraciones.",
        500,
      );
    }

    return jsonError("No se pudo crear la cuenta", 500);
  }
}
