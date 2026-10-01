"use client";

import Link from "next/link";
import { ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { CatalogSidebar } from "@/components/catalog/catalog-sidebar";
import { ProductCard } from "@/components/products/product-card";
import {
  SORT_OPTIONS,
  catalogTitle,
  departmentLabel,
  filterCatalogProducts,
  formatCatalogPrice,
  getFilterCounts,
  paginateProducts,
  parseCatalogFilters,
  productTypeLabel,
  type CatalogSort,
  type ProductColor,
  type ProductSize,
} from "@/lib/catalog";

function readSearchRecord(searchParams: URLSearchParams) {
  const record: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

export function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  const filters = parseCatalogFilters(readSearchRecord(searchParams));
  const products = filterCatalogProducts(filters);
  const counts = getFilterCounts(filters.category, filters.type);
  const pagination = paginateProducts(products, filters.page);
  const title = catalogTitle(filters);
  const typeLabel = productTypeLabel(filters.type);
  const department = departmentLabel(filters.category);

  useEffect(() => {
    setSearchValue(searchParams.get("q") ?? "");
  }, [searchParams]);

  function updateParams(updates: Record<string, string | null>, resetPage = true) {
    const next = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    }

    if (resetPage) {
      next.delete("page");
    }

    const query = next.toString();
    router.replace(query ? `/products?${query}` : "/products", { scroll: false });
  }

  function toggleList(key: "size" | "color", value: string, selected: string[]) {
    const next = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    updateParams({ [key]: next.length > 0 ? next.join(",") : null });
  }

  return (
    <section className="mx-auto w-full max-w-[1440px] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setFiltersOpen((current) => !current)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-black px-4 text-xs font-bold uppercase tracking-[0.12em]"
            >
              <SlidersHorizontal className="size-4" />
              Filtros
            </button>
            {filtersOpen ? (
              <div className="mt-4 rounded-xl border border-neutral-200 p-4">
                <CatalogSidebar
                  filters={filters}
                  sizeCounts={counts.sizes}
                  colorCounts={counts.colors}
                  onSelectType={(type) => updateParams({ type: type ?? null })}
                  onToggleSize={(size: ProductSize) =>
                    toggleList("size", size, filters.sizes)
                  }
                  onToggleColor={(color: ProductColor) =>
                    toggleList("color", color, filters.colors)
                  }
                  onPriceChange={(min, max) =>
                    updateParams({
                      minPrice: String(min),
                      maxPrice: String(max),
                    })
                  }
                />
              </div>
            ) : null}
          </div>

          <div className="hidden lg:block">
            <CatalogSidebar
              filters={filters}
              sizeCounts={counts.sizes}
              colorCounts={counts.colors}
              onSelectType={(type) => updateParams({ type: type ?? null })}
              onToggleSize={(size: ProductSize) =>
                toggleList("size", size, filters.sizes)
              }
              onToggleColor={(color: ProductColor) =>
                toggleList("color", color, filters.colors)
              }
              onPriceChange={(min, max) =>
                updateParams({
                  minPrice: String(min),
                  maxPrice: String(max),
                })
              }
            />
          </div>

          <div className="min-w-0 flex-1">
            <nav className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
              <Link href="/" className="hover:text-black">
                Inicio
              </Link>
              <ChevronRight className="size-3.5" />
              <span className={typeLabel ? "" : "text-black"}>{department}</span>
              {typeLabel ? (
                <>
                  <ChevronRight className="size-3.5" />
                  <span className="text-black">{typeLabel}</span>
                </>
              ) : null}
            </nav>

            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-[0.08em] text-black sm:text-[1.75rem]">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-neutral-500">
                  Mostrando {pagination.from}-{pagination.to} de {pagination.total}{" "}
                  resultados
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:max-w-xl">
                <label className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="search"
                    value={searchValue}
                    placeholder="Buscar productos..."
                    onChange={(event) => setSearchValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        updateParams({ q: searchValue.trim() || null });
                      }
                    }}
                    className="h-10 w-full rounded-lg border border-neutral-300 bg-white pr-3 pl-10 text-sm outline-none focus:border-black"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-neutral-600">
                  <span className="hidden whitespace-nowrap sm:inline">
                    Ordenar por:
                  </span>
                  <select
                    value={filters.sort}
                    onChange={(event) =>
                      updateParams({ sort: event.target.value as CatalogSort })
                    }
                    className="h-10 min-w-[160px] rounded-lg border border-neutral-300 bg-white px-3 text-sm text-black outline-none focus:border-black"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {pagination.items.length === 0 ? (
              <p className="mt-16 text-center text-sm text-neutral-500">
                No hay productos para estos filtros.
              </p>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {pagination.items.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    color={product.color}
                    material={product.material}
                    price={formatCatalogPrice(product.price)}
                    imageSrc={product.imageSrc}
                    imageAlt={product.imageAlt}
                    showAddToCart
                  />
                ))}
              </div>
            )}

            <CatalogPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={(page) => updateParams({ page: String(page) }, false)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
