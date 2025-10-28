import React, { useEffect, useState } from "react";

export default function TechFeed() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading)
    return (
      <div className="fixed bottom-6 right-6 bg-white shadow-lg border border-blue-200 rounded-xl p-4 w-80 text-center text-[#0f4875] text-sm animate-pulse">
        Loading tech feed...
      </div>
    );
  if (error)
    return (
      <div className="fixed bottom-6 right-6 bg-white shadow-lg border border-red-200 rounded-xl p-4 w-80 text-center text-red-500 text-sm">
        Error: {error}
      </div>
    );

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white text-blue-900 rounded-2xl shadow-2xl border border-blue-100 w-80 max-h-[70vh] overflow-y-auto transition-all duration-300 hover:shadow-[#0f4875]/30">
      <div className="sticky top-0 bg-[#0f4875] text-white text-center py-3 rounded-t-2xl font-semibold shadow-md">
        📰 Latest in Tech
      </div>

      <div className="p-4 space-y-4">
        {articles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 hover:border-[#0f4875]/40"
          >
            <h3 className="text-sm font-semibold text-[#0f4875] mb-1 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(article.published_at).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}