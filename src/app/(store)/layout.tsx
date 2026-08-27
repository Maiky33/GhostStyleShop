import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GhostStyle — Urban & Freestyle Clothing",
  description:
    "GhostStyle e-commerce platform for urban and freestyle clothing.",
};

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
