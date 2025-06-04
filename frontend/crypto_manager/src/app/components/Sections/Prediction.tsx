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
import { Loader2, LineChart } from "lucide-react";

export function ForecastDialog() {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:8000/predict");
    const data = await res.text();
    setForecast(data);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group flex gap-3 items-center justify-center w-full py-8 bg-neutral-300/5 hover:bg-neutral-300/10 border border-neutral-300/15 rounded-2xl transition text-neutral-400 hover:text-neutral-400"
          variant="secondary"
        >
          <LineChart className="w-6 h-6" />
          <span className="text-xl tracking-wide">Forecast</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-xl bg-neutral-950/10 backdrop-blur-lg border border-neutral-300/15 rounded-2xl p-6 text-neutral-400">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Forecast Preview</DialogTitle>
          <DialogDescription className="text-center text-sm text-neutral-400">
            This is a sample prediction. We'll soon plug in LSTM logic.
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-[80px] mt-4 px-2 text-center flex items-center justify-center">
          {loading ? (
            <Loader2 className="animate-spin text-lime-500" size={24} />
          ) : (
            <span className="text-base text-red-500 font-semibold whitespace-pre-line text-balance">
              {forecast || "No forecast available. Try generating one."}
            </span>
          )}
        </div>


      </DialogContent>
    </Dialog>
  );
}
