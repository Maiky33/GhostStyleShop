import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1440px]">
      <HeroSection />
      <FeaturedProducts />
    </main>
  );
}
