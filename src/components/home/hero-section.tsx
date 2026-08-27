import Link from "next/link";

import { SiteImage } from "@/components/ui/site-image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="mx-auto w-full min-h-[300px] max-w-[1440px] relative overflow-hidden bg-[url('/images/Hero/backgroundBanner.png')] bg-[length:100%_100%] bg-center">
      <div className="relative mx-auto min-h-[300px] grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-0">
        <div className="max-w-xl">
          <span className="inline-flex  bg-black px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
            Nueva colección
          </span>

          <h1 className="mt-6 text-[clamp(3rem,6vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight text-black">
            Ghost Style
          </h1>

          <p className="mt-4 text-sm font-[24px] uppercase tracking-[0.28em] text-black sm:text-base">
            Tu estilo. Tu esencia.
          </p>

          <Link
            href="/products"
            className={cn(
              buttonVariants(),
              "mt-8 inline-flex h-11 rounded-md bg-black px-10 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-black/90",
            )}
          >
            Ver colección
          </Link>
        </div>

        <div className="flex justify-end w-full  lg:justify-end lg:max-w-[576px] h-[300px]">
          <SiteImage
            src="/images/Hero/HeroGhost.png"
            alt="Fantasma Ghost Style"
            fill
            priority
            sizes="(max-width: 1024px) 70vw, 420px"
            className="aspect-[4/5] w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]"
            imageClassName="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
