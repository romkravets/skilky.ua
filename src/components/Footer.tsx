import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/7 px-10 py-8 flex justify-between items-center flex-wrap gap-4">
      <div className="font-mono text-[11px] text-white/45 tracking-[0.08em]">
        © 2025 kradene.ua — відкритий код, MIT License
      </div>
      <div className="flex gap-5">
        {[
          { label: 'Методологія', href: '/about' },
          { label: 'Джерела', href: '/about#sources' },
          { label: 'GitHub', href: 'https://github.com' },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="font-mono text-[11px] text-white/45 hover:text-white/70 transition-colors no-underline tracking-wide"
          >
            {label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
