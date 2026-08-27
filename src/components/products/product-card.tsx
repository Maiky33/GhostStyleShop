import { Heart } from "lucide-react";

import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  name: string;
  color: string;
  price: string;
  imageSrc?: string;
  imageAlt: string;
  className?: string;
};

export function ProductCard({
  name,
  color,
  price,
  imageSrc,
  imageAlt,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-xl border border-neutral-200 bg-white",
        className,
      )}
    >
      <div className="relative aspect-square bg-neutral-50">
        <button
          type="button"
          aria-label={`Agregar ${name} a favoritos`}
          className="absolute top-3 right-3 z-10 text-black transition-opacity hover:opacity-70"
        >
          <Heart className="size-8 cursor-pointer" strokeWidth={1.75} />
        </button>

        <SiteImage
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="h-full w-full"
          imageClassName="object-contain p-6"
        />
      </div>

      <div className="space-y-1 px-4 py-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.06em] text-black">
          {name}
        </h3>
        <p className="text-sm text-neutral-600">{color}</p>
        <p className="pt-1 text-sm font-bold text-black">{price}</p>
      </div>
    </article>
  );
}
