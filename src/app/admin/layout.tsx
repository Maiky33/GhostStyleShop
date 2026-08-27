export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="border-b border-zinc-800 px-6 py-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
          GhostStyle Admin
        </p>
      </div>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
