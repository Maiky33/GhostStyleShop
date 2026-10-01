import { redirect } from "next/navigation";

import { getSessionPayload } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSessionPayload();

  if (session) {
    redirect(session.role === "ADMIN" ? "/admin" : "/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      {children}
    </div>
  );
}
