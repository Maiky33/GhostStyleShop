import type { Metadata } from "next";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { TrustBar } from "@/components/layout/trust-bar";

export const metadata: Metadata = {
  title: "GhostStyle — Urban & Freestyle Clothing",
  description:
    "GhostStyle e-commerce platform for urban and freestyle clothing.",
};

export default function StoreLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex mx-auto w-full max-w-[1440px] min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <TrustBar />
      <Footer />
    </div>
  );
}
