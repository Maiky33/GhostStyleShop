import Image from "next/image";

export function AuthBranding() {
  return (
    <div className="flex flex-col items-center justify-center px-6 pb-10 text-center sm:px-10 sm:pb-14 lg:px-12">
      <Image loading="eager" src="/images/Navbar/LogoNavbar.png" alt="GhostStyle" width={500} height={500} />

      <p className="text-[20px] font-bold uppercase tracking-[0.12em] text-black">
        Tu estilo, tu esencia.
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.18em] text-black/80 sm:text-sm">
        Ropa que te representa.
      </p>
    </div>
  );
}
