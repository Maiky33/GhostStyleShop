import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Crear cuenta — GhostStyle",
  description: "Regístrate en GhostStyle y descubre tu estilo.",
};

export default function RegisterPage() {
  return (
    <AuthCard>
      <RegisterForm />
    </AuthCard>
  );
}
