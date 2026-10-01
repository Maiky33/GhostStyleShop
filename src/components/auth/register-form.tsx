"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Calendar, CreditCard, Eye, EyeOff, User } from "lucide-react";

import { AuthInput } from "@/components/auth/auth-input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ApiResponse } from "@/types/api";
import type { AuthUser } from "@/types/auth";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setPending(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const payload = (await response.json()) as ApiResponse<{ user: AuthUser }>;

      if (!payload.success) {
        setError(payload.message);
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servidor");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex w-full flex-col justify-center items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-8 lg:py-8 border-t-2 border-black lg:border-t-0 lg:border-l-2">
      <div className="w-full max-w-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-black sm:text-[1.75rem]">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Completa tus datos para registrarte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AuthInput
            label="Nombres"
            name="firstName"
            autoComplete="given-name"
            placeholder="Ingresa tus nombres"
            icon={<User className="size-4" strokeWidth={1.75} />}
            required
            disabled={pending}
          />

          <AuthInput
            label="Apellidos"
            name="lastName"
            autoComplete="family-name"
            placeholder="Ingresa tus apellidos"
            icon={<User className="size-4" strokeWidth={1.75} />}
            required
            disabled={pending}
          />

          <AuthInput
            label="Correo electrónico"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            required
            disabled={pending}
          />

          <AuthInput
            label="Cédula"
            name="documentId"
            inputMode="numeric"
            placeholder="Ingresa tu número de cédula"
            icon={<CreditCard className="size-4" strokeWidth={1.75} />}
            required
            disabled={pending}
          />

          <AuthInput
            label="Fecha de nacimiento"
            name="birthDate"
            type="text"
            placeholder="Selecciona tu fecha de nacimiento"
            icon={<Calendar className="size-4" strokeWidth={1.75} />}
            onFocus={(event) => {
              event.currentTarget.type = "date";
            }}
            onBlur={(event) => {
              if (!event.currentTarget.value) {
                event.currentTarget.type = "text";
              }
            }}
            required
            disabled={pending}
          />

          <AuthInput
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            required
            minLength={8}
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

          <AuthInput
            containerClassName="sm:col-span-2"
            label="Confirmar contraseña"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Repite tu contraseña"
            required
            minLength={8}
            disabled={pending}
          />

          {error ? (
            <p className="text-sm text-red-600 sm:col-span-2" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className={cn(
              buttonVariants(),
              "h-12 w-full rounded-lg bg-black text-sm font-bold uppercase tracking-[0.08em] text-white hover:bg-black/90 disabled:opacity-60 sm:col-span-2",
            )}
          >
            {pending ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-black">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
