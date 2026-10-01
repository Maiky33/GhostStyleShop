import { AuthError, setAuthCookie, signAuthToken } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { loginSchema, zodFieldErrors } from "@/lib/validations/auth";
import { loginUser } from "@/services/auth.service";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError("El cuerpo de la petición no es válido", 400);
  }

  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError(
      "Revisa los datos ingresados",
      400,
      zodFieldErrors(parsed.error),
    );
  }

  try {
    const user = await loginUser(parsed.data);
    const token = signAuthToken(user);
    await setAuthCookie(token);

    return jsonSuccess({ user });
  } catch (error) {
    if (error instanceof AuthError) {
      return jsonError(error.message, error.status);
    }

    console.error("Login failed", error);
    return jsonError("No se pudo iniciar sesión", 500);
  }
}
