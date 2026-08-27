import {
  Headphones,
  RefreshCw,
  Shield,
  Truck,
} from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "Envíos rápidos",
    description: "A todo el país",
  },
  {
    icon: Shield,
    title: "Pagos seguros",
    description: "Protegemos tu información",
  },
  {
    icon: RefreshCw,
    title: "Cambios fáciles",
    description: "Hasta 30 días",
  },
  {
    icon: Headphones,
    title: "Atención 24/7",
    description: "Estamos para ayudarte",
  },
] as const;

export function TrustBar() {
  return (
    <section className="mx-auto w-full max-w-[1440px] border-t border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center gap-4 px-6 py-8 lg:px-8"
          >
            <feature.icon
              className="size-7 shrink-0 text-black"
              strokeWidth={1.5}
            />
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.08em] text-black">
                {feature.title}
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
