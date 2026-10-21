export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto flex max-w-[1360px] flex-wrap justify-between gap-x-[4ch] gap-y-2 px-3 pt-16 pb-8 text-sm text-dim">
      <p>© {year} Linux Adona</p>
      <p className="hidden md:block">Press 1–5 to switch sections.</p>
      <p>Built with Next.js, Tailwind CSS and Keystatic.</p>
    </footer>
  );
}
