import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14 8.5V7.2c0-.7.5-1.2 1.3-1.2H17V3h-2.2C12.7 3 11 4.7 11 7v1.5H9v3h2V21h3v-9.5h2.6L17 8.5h-3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82c.92.63 2.03 1 3.22 1.08V9.7c-.94-.03-1.86-.26-2.68-.68v6.43c0 3.4-2.76 6.16-6.16 6.16S5.82 18.85 5.82 15.45c0-3.04 2.22-5.57 5.13-6.03v3.1c-.67-.22-1.16-.85-1.16-1.59 0-.93.75-1.68 1.68-1.68.93 0 1.68.75 1.68 1.68v8.18c.55.18 1.13.28 1.73.28 2.36 0 4.27-1.91 4.27-4.27V5.82h2.45z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[1440px] bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-white/90 sm:text-sm">
          © 2024 Ghost Style. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="https://instagram.com"
            aria-label="Instagram"
            className="transition-opacity hover:opacity-70"
          >
            <InstagramIcon className="size-4" />
          </Link>
          <Link
            href="https://facebook.com"
            aria-label="Facebook"
            className="transition-opacity hover:opacity-70"
          >
            <FacebookIcon className="size-4" />
          </Link>
          <Link
            href="https://tiktok.com"
            aria-label="TikTok"
            className="transition-opacity hover:opacity-70"
          >
            <TikTokIcon className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
