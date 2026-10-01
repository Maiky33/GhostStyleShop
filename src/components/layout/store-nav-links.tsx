"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/products?category=hombre", label: "Hombre" },
  { href: "/products?category=mujer", label: "Mujer" },
  { href: "/products?category=accesorios", label: "Accesorios" },
  { href: "/products?category=nuevos", label: "Nuevos" },
] as const;

function isActive(href: string, pathname: string, category: string | null) {
  if (href === "/") {
    return pathname === "/";
  }

  const url = new URL(href, "http://localhost");
  return pathname === "/products" && category === url.searchParams.get("category");
}

export function StoreNavLinks({
  variant = "desktop",
}: {
  variant?: "desktop" | "mobile";
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      {NAV_LINKS.map((link) => {
        const active = isActive(link.href, pathname, category);

        return (
          <Link
            key={`${variant}-${link.label}`}
            href={link.href}
            className={cn(
              "relative whitespace-nowrap pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-70",
              variant === "desktop" &&
                active &&
                "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-black",
              variant === "mobile" && active && "underline underline-offset-4",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
