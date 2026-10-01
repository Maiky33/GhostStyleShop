import { getAuthCookie, verifyAuthToken } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { getUserById } from "@/services/auth.service";

export async function GET() {
  const token = await getAuthCookie();

  if (!token) {
    return jsonError("No hay sesión activa", 401);
  }

  const payload = verifyAuthToken(token);

  if (!payload) {
    return jsonError("La sesión no es válida", 401);
  }

  const user = await getUserById(payload.sub);

  if (!user) {
    return jsonError("La sesión no es válida", 401);
  }

  return jsonSuccess({ user });
}
