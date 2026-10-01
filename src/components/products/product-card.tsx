import { Heart, ShoppingBag } from "lucide-react";

import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  name: string;
  color: string;
  price: string;
  imageSrc?: string;
  imageAlt: string;
  material?: string;
  showAddToCart?: boolean;
  className?: string;
};

export function ProductCard({
  name,
  color,
  price,
  imageSrc,
  imageAlt,
  material,
  showAddToCart = false,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white",
        className,
      )}
    >
      <div className="relative aspect-square bg-neutral-50">
        <button
          type="button"
          aria-label={`Agregar ${name} a favoritos`}
          className="absolute top-3 right-3 z-10 text-black transition-opacity hover:opacity-70"
        >
          <Heart className="size-7 cursor-pointer" strokeWidth={1.75} />
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

      <div className="flex flex-1 flex-col space-y-1 px-4 pt-4 pb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.06em] text-black">
          {name}
        </h3>
        <p className="text-sm text-neutral-600">
          {material ? `${color} | ${material}` : color}
        </p>
        <p className="pt-1 text-sm font-bold text-black">{price}</p>

        {showAddToCart ? (
          <button
            type="button"
            className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-black text-[11px] font-bold uppercase tracking-[0.08em] text-white hover:bg-black/90"
          >
            <ShoppingBag className="size-3.5" strokeWidth={2} />
            Añadir al carrito
          </button>
        ) : null}
      </div>
    </article>
  );
}
