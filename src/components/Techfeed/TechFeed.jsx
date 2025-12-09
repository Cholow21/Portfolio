import React, { useEffect, useState } from "react";
import { Newspaper } from "lucide-react";

export default function TechFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(
          "https://dev.to/api/articles?per_page=5&tag=webdev"
        );
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
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
        className="group fixed bottom-6 right-6 z-50 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-2xl border border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Toggle Tech Feed"
      >
        <Newspaper className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></span>
      </button>

      <div
        className={`fixed bottom-24 right-6 z-40 bg-white text-black rounded-lg shadow-2xl border border-gray-200 w-80 sm:w-96 max-h-[70vh] overflow-hidden transform transition-all duration-500 ${
          open
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="sticky top-0 bg-black text-white text-center py-4 font-bold shadow-lg z-10">
          <div className="flex items-center justify-center gap-2">
            <Newspaper className="w-5 h-5" />
            <span className="text-lg">Latest in Tech</span>
          </div>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto max-h-[calc(70vh-60px)]">
          {loading && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
              <p className="text-black text-sm mt-3 font-medium">Loading tech feed...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 text-sm bg-red-50 p-4 rounded-lg border border-red-200">
              Error: {error}
            </div>
          )}
          {!loading &&
            !error &&
            articles.map((article, index) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 hover:border-black"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-sm font-bold text-black mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {new Date(article.published_at).toLocaleDateString()}
                  </span>
                  <span className="text-black font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Read →
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </>
  );
}
