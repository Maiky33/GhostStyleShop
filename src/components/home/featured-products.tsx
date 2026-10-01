import Link from "next/link";

import { ProductCard } from "@/components/products/product-card";
import { buttonVariants } from "@/components/ui/button";
import { HOME_IMAGES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const FEATURED_PRODUCTS = [
  {
    name: "Hoodie Ghost",
    color: "Negro",
    price: "$ 89.900",
    imageSrc: HOME_IMAGES.products.hoodie,
    imageAlt: "Hoodie Ghost negro",
  },
  {
    name: "Camiseta Ghost",
    color: "Blanco",
    price: "$ 49.900",
    imageSrc: HOME_IMAGES.products.tshirt,
    imageAlt: "Camiseta Ghost blanca",
  },
  {
    name: "Gorra Ghost",
    color: "Negro",
    price: "$ 39.900",
    imageSrc: HOME_IMAGES.products.cap,
    imageAlt: "Gorra Ghost negra",
  },
  {
    name: "Chaqueta Ghost",
    color: "Negro",
    price: "$ 119.900",
    imageSrc: HOME_IMAGES.products.jacket,
    imageAlt: "Chaqueta Ghost negra",
  },
] as const;

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-600" />
      <h2 className="shrink-0 text-sm font-bold uppercase tracking-[0.18em] text-black sm:text-base">
        {title}
      </h2>
      <div className="h-px flex-1 bg-gray-600" />
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white py-14 sm:py-16 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Productos destacados" />

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>

        <div className="mt-5 flex justify-center">
          <Link
            href="/products?category=hombre"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 rounded-md border-black px-8 text-xs font-bold uppercase tracking-[0.12em] text-black hover:bg-neutral-50",
            )}
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
}
