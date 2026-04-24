import { fetchBihusNews } from '@/lib/bihus';

function formatDate(pubDate: string): string {
  try {
    return new Date(pubDate).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return pubDate;
  }
}

export default async function NewsBlock() {
  const articles = await fetchBihusNews(6);
  if (!articles.length) return null;

  return (
    <section className="px-5 md:px-10 pb-20 max-w-[900px] mx-auto w-full">
      <div className="border-t border-white/7 pt-14 mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase mb-2">
            // Нові розслідування
          </div>
          <h2 className="font-display font-bold text-2xl text-white">
            Bihus.Info — останні новини
          </h2>
        </div>
        <a
          href="https://bihus.info"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.1em] text-white/40 hover:text-white/70 transition-colors no-underline border border-white/7 px-4 py-2 rounded-sm hover:border-white/15 shrink-0"
        >
          Всі матеріали →
        </a>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded bg-[var(--bg2)] border border-white/7 p-5 hover:border-white/15 hover:bg-[var(--bg3)] transition-all no-underline"
          >
            <div className="font-mono text-[10px] tracking-[0.12em] text-white/35 uppercase mb-2">
              {formatDate(article.pubDate)}
              {article.categories[0] && (
                <span className="ml-2 text-red-600/70">{article.categories[0]}</span>
              )}
            </div>
            <div className="font-display font-semibold text-[15px] text-white/90 leading-snug mb-2 group-hover:text-white transition-colors line-clamp-3">
              {article.title}
            </div>
            {article.description && (
              <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                {article.description}
              </p>
            )}
            <div className="font-mono text-[11px] text-red-600/60 mt-3 group-hover:text-red-500 transition-colors">
              Читати розслідування →
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 p-5 rounded bg-[var(--bg2)] border border-white/7">
        <div className="font-mono text-[11px] tracking-[0.12em] text-white/35 uppercase mb-2">
          // Знайшли новий кейс?
        </div>
        <p className="text-sm text-white/55 leading-relaxed mb-3">
          Якщо ви знайшли корупційну справу з підтвердженою сумою — надсилайте посилання на
          офіційне джерело (НАБУ, САП, рішення суду). Додамо до калькулятора після перевірки.
        </p>
        <a
          href="https://github.com/romkravets/skilky.ua/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-[12px] tracking-[0.08em] text-white/60 border border-white/10 px-5 py-2.5 rounded-sm hover:border-white/25 hover:text-white transition-all no-underline"
        >
          Запропонувати кейс на GitHub →
        </a>
      </div>
    </section>
  );
}
