"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { AuthInput } from "@/components/auth/auth-input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as ApiResponse<{ user: AuthUser }>;

      if (!payload.success) {
        setError(payload.message);
        return;
      }

      router.push(payload.data.user.role === "ADMIN" ? "/admin" : "/");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex  w-full flex-col justify-center items-center px-6 py-10 sm:px-10 sm:py-14  lg:px-0 lg:py-0 lg:pt-4 border-t-2 border-black lg:border-t-0 lg:border-l-2">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-black sm:text-[1.75rem]">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <AuthInput
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            required
            disabled={pending}
          />

          <div className="space-y-2">
            <AuthInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              placeholder="Ingresa tu contraseña"
              required
              disabled={pending}
              endAction={
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-neutral-500 transition-colors hover:text-black"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              }
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-black underline underline-offset-2 transition-opacity hover:opacity-70"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
          </div>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className={cn(
              buttonVariants(),
              "h-12 w-full rounded-lg bg-black text-sm font-bold uppercase tracking-[0.08em] text-white hover:bg-black/90 disabled:opacity-60",
            )}
          >
            {pending ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/register"
            className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
