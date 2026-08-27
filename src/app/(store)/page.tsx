import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { TrustBar } from "@/components/layout/trust-bar";

export default function HomePage() {
  return (
    <div className="flex mx-auto w-full max-w-[1440px] min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 mx-auto w-full max-w-[1440px]">
        <HeroSection />
        <FeaturedProducts />
        <TrustBar />
      </main>
      <Footer />
    </div>
  );
}
