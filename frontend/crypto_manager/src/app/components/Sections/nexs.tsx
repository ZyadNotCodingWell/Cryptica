"use client";

import { useState, useEffect } from "react";
import { Newspaper, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

type NewsItem = {
  title: string;
  description: string;
  published_at: string;
  url: string;
  image_url?: string;
  source: string;
  sentiment?: string;
  keywords?: string[];
};

export function NewsBlock({ apiReference }: { apiReference: string }) {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsItem[] | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!apiReference) return;

      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/news/${apiReference}`);
        const raw = await res.json();

        if (Array.isArray(raw)) {
          const parsed: NewsItem[] = raw
            .filter(
              (item) =>
                item &&
                typeof item === "object" &&
                typeof item.title === "string" &&
                typeof item.url === "string"
            )
            .map((item) => ({
              title: item.title,
              description: item.description ?? "No description",
              published_at: item.published_at ?? "",
              url: item.url,
              image_url: item.image_url,
              source: item.source ?? "CoinDesk",
              sentiment: item.sentiment,
              keywords: item.keywords || [],
            }));
          setNews(parsed);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiReference]);

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment?.toUpperCase()) {
      case "POSITIVE": return "text-lime-500";
      case "NEGATIVE": return "text-red-600";
      case "NEUTRAL": return "text-yellow-500";
      default: return "text-neutral-400";
    }
  };
  const getSentimentBgColor = (sentiment?: string) => {
    switch (sentiment?.toUpperCase()) {
      case "POSITIVE": return "bg-lime-950/70";
      case "NEGATIVE": return "bg-red-950/70";
      case "NEUTRAL": return "bg-yellow-950/70";
      default: return "bg-neutral-900/70";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-neutral-300/5 border border-neutral-300/15 rounded-xl p-5 backdrop-blur-lg flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-300/15">
        <Newspaper className="w-5 h-5 text-lime-500" />
        <h3 className="text-lg font-medium text-neutral-300">Latest News</h3>
        <div className="ml-auto text-xs text-neutral-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          <span>Powered by CoinDesk</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-h-96 overflow-auto flex flex-col scrollbar-none">
        {loading ? (
          <div className="space-y-4 overflow-y-clip">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg bg-neutral-300/10" />
            ))}
          </div>
        ) : news && news.length > 0 ? (
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 py-4 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
            {news.map((item, index) => (
              <motion.a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="block group transition"
              >
                <div className="relative rounded-xl border border-neutral-300/5 hover:border-neutral-300/15 overflow-hidden h-40">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  {/* Text overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent p-3 pt-6 flex flex-col justify-end h-full backdrop-brightness-50">
                    <div className="flex items-baseline h-fit w-full justify-start gap-2">
                        <div className="flex items-end justify-between w-full mt-1">
                        	<h3 className={`text-sm text-balance font-medium transition line-clamp-2 ${getSentimentColor(item.sentiment)}`}>
                        	  {item.title}
                        	</h3>
                          <ArrowUpRight className={`size-4 text-neutral-400 flex-shrink-0`} />
                        </div>
                    </div>
                  </div>
                  {/* Sentiment badge */}
                  {item.sentiment && (
                    <div className="absolute top-2 left-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getSentimentColor(item.sentiment)} ${getSentimentBgColor(item.sentiment)} backdrop-blur-sm`}>
                        {item.sentiment}
                      </span>
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-neutral-500">
            No news available
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 text-xs text-neutral-500 text-center border-t border-neutral-300/15 mt-3">
        <p>Always verify news sources before making trading decisions</p>
      </div>
    </motion.div>
  );
}	