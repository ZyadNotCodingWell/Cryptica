"use client";

import { useState, useEffect } from "react";
import { LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";

type ForecastBlockProps = {
  apiReference: string;
  timeframe: string;
};

export default function ForecastBlock({
  apiReference,
  timeframe,
}: ForecastBlockProps) {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_reference: apiReference,
            interval: timeframe,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch forecast");

        const data = await res.json();
        if (!data.predictions || !Array.isArray(data.predictions)) {
          throw new Error("Invalid forecast data received");
        }
        setPredictions(data.predictions);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Please bear with us, we are working on it!");
        setPredictions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [apiReference, timeframe]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full bg-neutral-300/5 border border-neutral-300/15 rounded-2xl p-5 backdrop-blur-lg flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-neutral-300/15">
        <LineChart className="w-5 h-5 text-lime-500" />
        <h3 className="text-lg font-medium text-neutral-300">Price Forecast</h3>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {loading ? (
          <div className="space-y-2 w-full">
            <Skeleton className="h-6 w-full bg-neutral-300/10" />
            <Skeleton className="h-6 w-3/4 bg-neutral-300/10" />
            <Skeleton className="h-6 w-5/6 bg-neutral-300/10" />
          </div>
        ) : error ? (
          <div className="text-center text-neutral-300/15 text-xl">{error}</div>
        ) : predictions && predictions.length > 0 ? (
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-left p-4 h-full rounded-lg w-full flex flex-col gap-3"
          >
            <h4 className="text-neutral-300/50 text-xl mb-2">
              Forecast for {apiReference} on {timeframe} interval candles
            </h4>
            {/* Full-width candle blocks */}
            <div className="flex flex-col gap-2 w-full">
              {predictions.map((price, i) => (
                <div
                  key={i}
                  className="bg-neutral-700/30 rounded-lg px-4 py-3 text-neutral-300 text-lg font-mono w-full shadow-sm"
                >
                  Candle {i + 1}: <span className="font-semibold">{price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <p className="text-neutral-300 text-lg whitespace-pre-line mt-4">
              We are working on it, please bear with us. The final version will
              include more detailed analysis and insights, predicted by LSTM
              variants and GRU, combined with a short and concise analysis from
              a trained AI agent.
            </p>
          </motion.div>
        ) : (
          <div className="text-neutral-500 text-sm">No forecast available.</div>
        )}
      </div>

      {/* Footer */}
      <div className="pt-3 text-xs text-neutral-500 text-center border-t border-neutral-300/15 mt-3">
        24h LSTM prediction for {apiReference}
      </div>
    </motion.div>
  );
}
