"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

import { cn } from "@/lib/utils";

type NavAccountMenuProps = {
  isAuthenticated: boolean;
};

export function NavAccountMenu({ isAuthenticated }: NavAccountMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  async function handleLogout() {
    setPending(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        aria-label="Iniciar sesión"
        className="text-black transition-opacity hover:opacity-70"
      >
        <User className="size-[30px]" strokeWidth={1.75} />
      </Link>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-label="Cuenta activa"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="text-[#F5C400] transition-opacity hover:opacity-80"
      >
        <User className="cursor-pointer size-[30px]" strokeWidth={1.75} />
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-3 w-44 rounded-lg border-2 border-black bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={handleLogout}
            disabled={pending}
            className={cn(
              "h-10 w-full cursor-pointer rounded-md bg-black text-xs font-bold uppercase tracking-[0.08em] text-white hover:bg-black/90 disabled:opacity-60",
            )}
          >
            {pending ? "Saliendo..." : "Cerrar sesión"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
