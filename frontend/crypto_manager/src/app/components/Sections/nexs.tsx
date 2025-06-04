"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader2, Newspaper } from "lucide-react";

export function NewsDialog() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<string | null>(null);

  const handleFetchNews = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/news"); // Update if needed
    const data = await res.text();
    setNews(data);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group flex gap-3 items-center justify-center w-full py-8 bg-neutral-300/5 hover:bg-neutral-300/10 border border-neutral-300/15 rounded-2xl transition text-neutral-400 hover:text-neutral-400"
          variant="secondary"
        >
          <Newspaper className="w-6 h-6" />
          <span className="text-xl tracking-wide">News</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl bg-neutral-950/10 backdrop-blur-lg border border-neutral-300/15 rounded-2xl p-6 text-neutral-400">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Latest Crypto News</DialogTitle>
          <DialogDescription className="text-center text-sm text-neutral-400">
            Stay updated with the latest crypto headlines.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-[100px] mt-4 px-2 text-center flex items-center justify-center">
          {loading ? (
            <Loader2 className="animate-spin text-lime-500" size={24} />
          ) : (
            <span className="text-base text-red-500 font-semibold whitespace-pre-line text-balance">
              {news || "It's either you're offline, or we ruined the code."}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
