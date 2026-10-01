import { HOME_IMAGES } from "@/lib/site-images";

export const CATALOG_PAGE_SIZE = 12;
export const CATALOG_PRICE_MIN = 20000;
export const CATALOG_PRICE_MAX = 150000;

export const CATALOG_DEPARTMENTS = [
  "hombre",
  "mujer",
  "accesorios",
  "nuevos",
] as const;

export type CatalogDepartment = (typeof CATALOG_DEPARTMENTS)[number];

export const PRODUCT_TYPES = [
  { slug: "camisetas", label: "Camisetas" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "chaquetas", label: "Chaquetas" },
  { slug: "pantalones", label: "Pantalones" },
  { slug: "gorras", label: "Gorras" },
  { slug: "accesorios", label: "Accesorios" },
] as const;

export type ProductType = (typeof PRODUCT_TYPES)[number]["slug"];

export const PRODUCT_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];

export const PRODUCT_COLORS = ["Negro", "Blanco", "Gris"] as const;
export type ProductColor = (typeof PRODUCT_COLORS)[number];

export const SORT_OPTIONS = [
  { value: "best-selling", label: "Más vendidos" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "newest", label: "Más nuevos" },
] as const;

export type CatalogSort = (typeof SORT_OPTIONS)[number]["value"];

export type CatalogProduct = {
  id: string;
  name: string;
  department: "hombre" | "mujer" | "unisex";
  type: ProductType;
  color: ProductColor;
  material: string;
  price: number;
  sizes: ProductSize[];
  imageSrc: string;
  imageAlt: string;
  isNew: boolean;
  sold: number;
};

export type CatalogFilters = {
  category?: string;
  type?: string;
  sizes: ProductSize[];
  colors: ProductColor[];
  minPrice: number;
  maxPrice: number;
  q: string;
  sort: CatalogSort;
  page: number;
};

const IMAGES = {
  camisetas: {
    Negro: HOME_IMAGES.products.tshirt,
    Blanco: HOME_IMAGES.products.tshirt,
    Gris: HOME_IMAGES.products.tshirt,
  },
  hoodies: {
    Negro: HOME_IMAGES.products.hoodie,
    Blanco: HOME_IMAGES.products.hoodie,
    Gris: HOME_IMAGES.products.hoodie,
  },
  chaquetas: {
    Negro: HOME_IMAGES.products.jacket,
    Blanco: HOME_IMAGES.products.jacket,
    Gris: HOME_IMAGES.products.jacket,
  },
  pantalones: {
    Negro: HOME_IMAGES.products.jacket,
    Blanco: HOME_IMAGES.products.jacket,
    Gris: HOME_IMAGES.products.jacket,
  },
  gorras: {
    Negro: HOME_IMAGES.products.cap,
    Blanco: HOME_IMAGES.products.cap,
    Gris: HOME_IMAGES.products.cap,
  },
  accesorios: {
    Negro: HOME_IMAGES.products.cap,
    Blanco: HOME_IMAGES.products.cap,
    Gris: HOME_IMAGES.products.cap,
  },
} as const;

function allSizes(): ProductSize[] {
  return [...PRODUCT_SIZES];
}

const BASE_CAMISETAS: Array<{
  name: string;
  color: ProductColor;
  price: number;
  material: string;
}> = [
  { name: "Camiseta Ghost Logo", color: "Negro", price: 49900, material: "100% Algodón" },
  { name: "Camiseta Ghost Mini", color: "Blanco", price: 44900, material: "100% Algodón" },
  { name: "Camiseta Ghost Back", color: "Negro", price: 54900, material: "100% Algodón" },
  { name: "Camiseta Ghost Grey", color: "Gris", price: 49900, material: "100% Algodón" },
  { name: "Camiseta Manga Larga", color: "Negro", price: 59900, material: "100% Algodón" },
  { name: "Camiseta Oversize", color: "Blanco", price: 54900, material: "100% Algodón" },
  { name: "Camiseta Sin Mangas", color: "Negro", price: 39900, material: "100% Algodón" },
  { name: "Camiseta College", color: "Blanco", price: 49900, material: "100% Algodón" },
  { name: "Camiseta Ghost Core", color: "Gris", price: 42900, material: "100% Algodón" },
  { name: "Camiseta Ghost Type", color: "Negro", price: 46900, material: "100% Algodón" },
  { name: "Camiseta Ghost Fade", color: "Blanco", price: 47900, material: "100% Algodón" },
  { name: "Camiseta Ghost Box", color: "Gris", price: 51900, material: "100% Algodón" },
];

function buildCatalog(): CatalogProduct[] {
  const products: CatalogProduct[] = [];
  let sold = 120;

  for (const department of ["hombre", "mujer"] as const) {
    BASE_CAMISETAS.forEach((item, index) => {
      products.push({
        id: `${department}-camiseta-${index + 1}`,
        name: item.name,
        department,
        type: "camisetas",
        color: item.color,
        material: item.material,
        price: item.price,
        sizes: allSizes(),
        imageSrc: IMAGES.camisetas[item.color],
        imageAlt: `${item.name} ${item.color}`,
        isNew: index < 4,
        sold: sold - index,
      });
    });

    BASE_CAMISETAS.forEach((item, index) => {
      products.push({
        id: `${department}-camiseta-b-${index + 1}`,
        name: `${item.name} Pro`,
        department,
        type: "camisetas",
        color: item.color,
        material: item.material,
        price: item.price + 2000,
        sizes: index % 2 === 0 ? ["S", "M", "L"] : ["M", "L", "XL", "XXL"],
        imageSrc: IMAGES.camisetas[item.color],
        imageAlt: `${item.name} Pro ${item.color}`,
        isNew: false,
        sold: 40 - index,
      });
    });

    products.push(
      {
        id: `${department}-hoodie-1`,
        name: "Hoodie Ghost",
        department,
        type: "hoodies",
        color: "Negro",
        material: "80% Algodón",
        price: 89900,
        sizes: allSizes(),
        imageSrc: IMAGES.hoodies.Negro,
        imageAlt: "Hoodie Ghost negro",
        isNew: true,
        sold: 96,
      },
      {
        id: `${department}-hoodie-2`,
        name: "Hoodie Ghost Light",
        department,
        type: "hoodies",
        color: "Gris",
        material: "80% Algodón",
        price: 84900,
        sizes: ["M", "L", "XL"],
        imageSrc: IMAGES.hoodies.Gris,
        imageAlt: "Hoodie Ghost gris",
        isNew: false,
        sold: 64,
      },
      {
        id: `${department}-chaqueta-1`,
        name: "Chaqueta Ghost",
        department,
        type: "chaquetas",
        color: "Negro",
        material: "Poliéster",
        price: 119900,
        sizes: ["S", "M", "L", "XL"],
        imageSrc: IMAGES.chaquetas.Negro,
        imageAlt: "Chaqueta Ghost negra",
        isNew: true,
        sold: 58,
      },
      {
        id: `${department}-pantalon-1`,
        name: "Pantalón Ghost Cargo",
        department,
        type: "pantalones",
        color: "Negro",
        material: "Algodón",
        price: 99900,
        sizes: ["S", "M", "L", "XL", "XXL"],
        imageSrc: IMAGES.pantalones.Negro,
        imageAlt: "Pantalón Ghost cargo",
        isNew: false,
        sold: 41,
      },
      {
        id: `${department}-gorra-1`,
        name: "Gorra Ghost",
        department,
        type: "gorras",
        color: "Negro",
        material: "Algodón",
        price: 39900,
        sizes: ["S", "M", "L"],
        imageSrc: IMAGES.gorras.Negro,
        imageAlt: "Gorra Ghost negra",
        isNew: true,
        sold: 88,
      },
    );
  }

  products.push(
    {
      id: "accesorio-1",
      name: "Gorra Ghost Logo",
      department: "unisex",
      type: "accesorios",
      color: "Negro",
      material: "Algodón",
      price: 39900,
      sizes: ["S", "M", "L"],
      imageSrc: IMAGES.accesorios.Negro,
      imageAlt: "Gorra Ghost Logo",
      isNew: true,
      sold: 77,
    },
    {
      id: "accesorio-2",
      name: "Gorra Ghost White",
      department: "unisex",
      type: "accesorios",
      color: "Blanco",
      material: "Algodón",
      price: 39900,
      sizes: ["S", "M", "L"],
      imageSrc: IMAGES.accesorios.Blanco,
      imageAlt: "Gorra Ghost blanca",
      isNew: false,
      sold: 52,
    },
    {
      id: "accesorio-3",
      name: "Beanie Ghost",
      department: "unisex",
      type: "accesorios",
      color: "Gris",
      material: "Lana",
      price: 34900,
      sizes: ["M", "L"],
      imageSrc: IMAGES.accesorios.Gris,
      imageAlt: "Beanie Ghost gris",
      isNew: true,
      sold: 39,
    },
  );

  return products;
}

export const CATALOG_PRODUCTS = buildCatalog();

export function isCatalogDepartment(value: string | undefined): value is CatalogDepartment {
  return CATALOG_DEPARTMENTS.includes(value as CatalogDepartment);
}

export function isProductType(value: string | undefined): value is ProductType {
  return PRODUCT_TYPES.some((item) => item.slug === value);
}

export function isProductSize(value: string): value is ProductSize {
  return PRODUCT_SIZES.includes(value as ProductSize);
}

export function isProductColor(value: string): value is ProductColor {
  return PRODUCT_COLORS.includes(value as ProductColor);
}

export function isCatalogSort(value: string | undefined): value is CatalogSort {
  return SORT_OPTIONS.some((item) => item.value === value);
}

export function formatCatalogPrice(value: number) {
  return `$ ${value.toLocaleString("es-CO")}`;
}

export function departmentLabel(category?: string) {
  if (category === "hombre") return "Hombre";
  if (category === "mujer") return "Mujer";
  if (category === "accesorios") return "Accesorios";
  if (category === "nuevos") return "Nuevos";
  return "Catálogo";
}

export function productTypeLabel(type?: string) {
  return PRODUCT_TYPES.find((item) => item.slug === type)?.label;
}

export function catalogTitle(filters: Pick<CatalogFilters, "category" | "type">) {
  const type = productTypeLabel(filters.type);
  const department = departmentLabel(filters.category);

  if (filters.category === "nuevos") {
    return type ? `${type} nuevas` : "Nuevos";
  }

  if (filters.category === "accesorios") {
    return "Accesorios";
  }

  if (type && (filters.category === "hombre" || filters.category === "mujer")) {
    return `${type} para ${department.toLowerCase()}`;
  }

  if (type) {
    return type;
  }

  if (!filters.category) {
    return "Todos los productos";
  }

  if (filters.category === "hombre" || filters.category === "mujer") {
    return `Productos para ${department.toLowerCase()}`;
  }

  return department;
}

export function parseCatalogFilters(
  searchParams: Record<string, string | string[] | undefined>,
): CatalogFilters {
  const read = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const sizes = (read("size") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(isProductSize);

  const colors = (read("color") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(isProductColor);

  const minPrice = Number(read("minPrice"));
  const maxPrice = Number(read("maxPrice"));
  const page = Number(read("page"));
  const sortValue = read("sort");

  return {
    category: read("category"),
    type: read("type"),
    sizes,
    colors,
    minPrice:
      Number.isFinite(minPrice) && minPrice > 0 ? minPrice : CATALOG_PRICE_MIN,
    maxPrice:
      Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : CATALOG_PRICE_MAX,
    q: (read("q") ?? "").trim(),
    sort: isCatalogSort(sortValue) ? sortValue : "best-selling",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

function matchesDepartment(product: CatalogProduct, category?: string) {
  if (!category || !isCatalogDepartment(category)) {
    return true;
  }

  if (category === "nuevos") {
    return product.isNew;
  }

  if (category === "accesorios") {
    return product.type === "accesorios";
  }

  return product.department === category || product.department === "unisex";
}

export function getScopedProducts(category?: string) {
  return CATALOG_PRODUCTS.filter((product) => matchesDepartment(product, category));
}

export function filterCatalogProducts(filters: CatalogFilters) {
  const scoped = getScopedProducts(filters.category);

  const filtered = scoped.filter((product) => {
    if (filters.type && isProductType(filters.type) && product.type !== filters.type) {
      return false;
    }

    if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
      return false;
    }

    if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
      return false;
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    if (filters.q) {
      const query = filters.q.toLowerCase();
      const haystack = `${product.name} ${product.color} ${product.material}`.toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });

  filtered.sort((a, b) => {
    if (filters.sort === "price-asc") return a.price - b.price;
    if (filters.sort === "price-desc") return b.price - a.price;
    if (filters.sort === "newest") return Number(b.isNew) - Number(a.isNew) || b.sold - a.sold;
    return b.sold - a.sold;
  });

  return filtered;
}

export function getFilterCounts(category?: string, type?: string) {
  const scoped = getScopedProducts(category).filter((product) => {
    if (type && isProductType(type)) {
      return product.type === type;
    }
    return true;
  });

  const sizes = Object.fromEntries(PRODUCT_SIZES.map((size) => [size, 0])) as Record<
    ProductSize,
    number
  >;
  const colors = Object.fromEntries(PRODUCT_COLORS.map((color) => [color, 0])) as Record<
    ProductColor,
    number
  >;

  for (const product of scoped) {
    colors[product.color] += 1;
    for (const size of product.sizes) {
      sizes[size] += 1;
    }
  }

  return { sizes, colors };
}

export function paginateProducts(products: CatalogProduct[], page: number) {
  const totalPages = Math.max(1, Math.ceil(products.length / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * CATALOG_PAGE_SIZE;
  const items = products.slice(start, start + CATALOG_PAGE_SIZE);

  return {
    items,
    currentPage,
    totalPages,
    total: products.length,
    from: products.length === 0 ? 0 : start + 1,
    to: Math.min(start + CATALOG_PAGE_SIZE, products.length),
  };
}
