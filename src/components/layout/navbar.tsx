import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

import { NavAccountMenu } from "@/components/layout/nav-account-menu";
import { StoreNavLinks } from "@/components/layout/store-nav-links";
import { getSessionPayload } from "@/lib/auth";

export async function Navbar() {
  const session = await getSessionPayload();

  return (
    <header className="relative z-40 mx-auto w-full max-w-[1440px] border-b-1 border-black bg-white h-[100px]">
      <div className="mx-auto flex h-[100px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0" aria-label="GhostStyle inicio">
          <Image loading="eager" src="/images/Navbar/LogoNavbar.png" alt="GhostStyle" width={100} height={100} />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          <Suspense fallback={null}>
            <StoreNavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-3 sm:gap-10">
          <NavAccountMenu isAuthenticated={Boolean(session)} />
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
          <Suspense fallback={null}>
            <StoreNavLinks variant="mobile" />
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
