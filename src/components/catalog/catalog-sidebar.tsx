"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CATALOG_PRICE_MAX,
  CATALOG_PRICE_MIN,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  PRODUCT_TYPES,
  formatCatalogPrice,
  type CatalogFilters,
  type ProductColor,
  type ProductSize,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CatalogSidebarProps = {
  filters: CatalogFilters;
  sizeCounts: Record<ProductSize, number>;
  colorCounts: Record<ProductColor, number>;
  onSelectType: (type?: string) => void;
  onToggleSize: (size: ProductSize) => void;
  onToggleColor: (color: ProductColor) => void;
  onPriceChange: (min: number, max: number) => void;
};

const COLOR_SWATCH: Record<ProductColor, string> = {
  Negro: "bg-black",
  Blanco: "bg-white border border-neutral-300",
  Gris: "bg-neutral-400",
};

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between text-sm font-semibold text-black"
      >
        {title}
        <ChevronDown
          className={cn("size-4 transition-transform", open ? "rotate-180" : "rotate-0")}
          strokeWidth={1.75}
        />
      </button>
      {open ? <div className="mt-3">{children}</div> : null}
    </div>
  );
}

export function CatalogSidebar({
  filters,
  sizeCounts,
  colorCounts,
  onSelectType,
  onToggleSize,
  onToggleColor,
  onPriceChange,
}: CatalogSidebarProps) {
  const [price, setPrice] = useState([filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    setPrice([filters.minPrice, filters.maxPrice]);
  }, [filters.minPrice, filters.maxPrice]);

  return (
    <aside className="w-full shrink-0 lg:w-56">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-black">
          Categorías
        </p>
        <ul className="mt-3 space-y-1">
          {PRODUCT_TYPES.map((item) => {
            const active = filters.type === item.slug;

            return (
              <li key={item.slug}>
                <button
                  type="button"
                  onClick={() => onSelectType(active ? undefined : item.slug)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100",
                    active && "bg-neutral-200 font-medium text-black",
                  )}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-black">
        Filtrar por
      </p>

      <FilterSection title="Talla">
        <ul className="space-y-2">
          {PRODUCT_SIZES.map((size) => (
            <li key={size}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-black">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => onToggleSize(size)}
                  className="size-4 rounded border-neutral-300 accent-black"
                />
                <span>
                  {size} ({sizeCounts[size]})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Color">
        <ul className="space-y-2">
          {PRODUCT_COLORS.map((color) => (
            <li key={color}>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-black">
                <input
                  type="checkbox"
                  checked={filters.colors.includes(color)}
                  onChange={() => onToggleColor(color)}
                  className="size-4 rounded border-neutral-300 accent-black"
                />
                <span className={cn("size-3.5 rounded-full", COLOR_SWATCH[color])} />
                <span>
                  {color} ({colorCounts[color]})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </FilterSection>

      <FilterSection title="Precio">
        <div className="px-1">
          <input
            type="range"
            min={CATALOG_PRICE_MIN}
            max={CATALOG_PRICE_MAX}
            step={1000}
            value={price[0]}
            onChange={(event) => {
              const nextMin = Math.min(Number(event.target.value), price[1]);
              setPrice([nextMin, price[1]]);
            }}
            onMouseUp={() => onPriceChange(price[0], price[1])}
            onTouchEnd={() => onPriceChange(price[0], price[1])}
            className="w-full accent-black"
          />
          <input
            type="range"
            min={CATALOG_PRICE_MIN}
            max={CATALOG_PRICE_MAX}
            step={1000}
            value={price[1]}
            onChange={(event) => {
              const nextMax = Math.max(Number(event.target.value), price[0]);
              setPrice([price[0], nextMax]);
            }}
            onMouseUp={() => onPriceChange(price[0], price[1])}
            onTouchEnd={() => onPriceChange(price[0], price[1])}
            className="w-full accent-black"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
            <span>{formatCatalogPrice(price[0])}</span>
            <span>{formatCatalogPrice(price[1])}</span>
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}
