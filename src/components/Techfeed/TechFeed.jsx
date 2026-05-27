import { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

export default function TechFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("https://dev.to/api/articles?per_page=5&tag=webdev");
        if (!response.ok) throw new Error("Failed to fetch articles");
        setArticles(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white w-12 h-12 flex items-center justify-center shadow-2xl border border-white/10 hover:bg-white hover:text-black hover:border-black transition-all duration-300"
        aria-label="Toggle Tech Feed"
      >
        <Newspaper className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-2 border-black rounded-full" />
      </button>

      <div className={`fixed bottom-24 right-6 z-40 bg-white text-black shadow-2xl border border-black/10 w-80 sm:w-96 max-h-[70vh] overflow-hidden transition-all duration-300 ${
        open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      }`}>
        <div className="bg-black text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-4 h-4" />
            <span className="text-xs font-mono tracking-widest uppercase">Latest in Tech</span>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xs font-mono">Close</button>
        </div>

        <div className="overflow-y-auto max-h-[calc(70vh-52px)]">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {error && (
            <p className="text-xs text-center text-gray-500 py-8 font-mono">Failed to load articles.</p>
          )}
          {!loading && !error && articles.map((article, i) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block px-5 py-4 border-b border-black/5 hover:bg-black hover:text-white transition-all duration-200"
            >
              <h3 className="text-sm font-semibold mb-1 line-clamp-2 leading-snug">{article.title}</h3>
              <div className="flex justify-between items-center text-xs text-gray-400 group-hover:text-gray-300">
                <span className="font-mono">{new Date(article.published_at).toLocaleDateString()}</span>
                <span>Read →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
