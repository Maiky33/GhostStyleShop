import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata: Metadata = {
  title: "Productos — GhostStyle",
  description: "Catálogo GhostStyle de ropa urbana y freestyle.",
};

function CatalogFallback() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm text-neutral-500">Cargando catálogo...</p>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogView />
    </Suspense>
  );
}
