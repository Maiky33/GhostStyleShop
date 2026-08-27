"use client";

import Link from "next/link";
import { Calendar, CreditCard, User } from "lucide-react";

import { AuthInput } from "@/components/auth/auth-input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function RegisterForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="flex w-full flex-col justify-center items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-0 lg:py-0 border-t-2 border-black lg:border-t-0 lg:border-l-2">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-black sm:text-[1.75rem]">
            Crear cuenta
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Completa tus datos para registrarte
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <AuthInput
            label="Nombres"
            name="firstName"
            autoComplete="given-name"
            placeholder="Ingresa tus nombres"
            icon={<User className="size-4" strokeWidth={1.75} />}
            required
          />

          <AuthInput
            label="Apellidos"
            name="lastName"
            autoComplete="family-name"
            placeholder="Ingresa tus apellidos"
            icon={<User className="size-4" strokeWidth={1.75} />}
            required
          />

          <AuthInput
            label="Cédula"
            name="documentId"
            inputMode="numeric"
            placeholder="Ingresa tu número de cédula"
            icon={<CreditCard className="size-4" strokeWidth={1.75} />}
            required
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
          />

          <button
            type="submit"
            className={cn(
              buttonVariants(),
              "h-12 w-full rounded-lg bg-black text-sm font-bold uppercase tracking-[0.08em] text-white hover:bg-black/90",
            )}
          >
            Registrarme
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
