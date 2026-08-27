import type { Metadata } from "next";

import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión — GhostStyle",
  description: "Inicia sesión en tu cuenta de GhostStyle.",
};

export default function LoginPage() {
  return (
    <AuthCard>
      <LoginForm />
    </AuthCard>
  );
}
