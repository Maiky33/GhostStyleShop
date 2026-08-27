import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const NAV_LINKS: Array<{
  href: string;
  label: string;
  active?: boolean;
}> = [
  { href: "/", label: "Inicio", active: true },
  { href: "/products?category=hombre", label: "Hombre" },
  { href: "/products?category=mujer", label: "Mujer" },
  { href: "/products?category=accesorios", label: "Accesorios" },
  { href: "/products?category=nuevos", label: "Nuevos" },
];

function NavLink({
  href,
  label,
  active,
  className,
}: {
  href: string;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative whitespace-nowrap pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-70",
        active &&
          "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-black",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="mx-auto w-full max-w-[1440px] border-b-1 border-black bg-white h-[100px]">
      <div className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="GhostStyle inicio">
          <Image loading="eager" src="/images/Navbar/LogoNavbar.png" alt="GhostStyle" width={100} height={100} />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-10">
          <Link
            href="/login"
            aria-label="Mi cuenta"
            className="text-black transition-opacity hover:opacity-70"
          >
            <User className="size-[30px]" strokeWidth={1.75} />
          </Link>
          <Link
            href="/favorites"
            aria-label="Favoritos"
            className="text-black transition-opacity hover:opacity-70"
          >
            <Heart className="size-[30px]" strokeWidth={1.75} />
          </Link>
          <Link
            href="/cart"
            aria-label="Carrito"
            className="relative text-black transition-opacity hover:opacity-70"
          >
            <ShoppingBag className="size-[30px]" strokeWidth={1.75} />
            <span className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              2
            </span>
          </Link>
        </div>
      </div>

      <nav className="border-t border-neutral-200 lg:hidden">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={`mobile-${link.label}`}
              {...link}
              className={cn(
                link.active && "after:hidden underline underline-offset-4",
              )}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}
