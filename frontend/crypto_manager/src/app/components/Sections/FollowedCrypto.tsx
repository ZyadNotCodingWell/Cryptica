"use client";
import { Plus, Trash, ChartArea } from "lucide-react";

type FollowedCoinProps = {
  name: string;
  apiReference: string; // ticker
  selected: boolean;
  onRemove: () => void;
  onSelect: () => void;
};

const FollowedCoin = ({
  name,
  apiReference,
  onRemove,
  onSelect,
  selected,
}: FollowedCoinProps) => {
  return (
    <div
      className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
        ${selected ? "bg-lime-500/10 border-lime-500/30" : "bg-white/5 hover:bg-white/10"}
        border ${selected ? "border-lime-500/30" : "border-transparent hover:border-white/10"}
        shadow-sm hover:shadow-md`}
        onClick={onSelect}
    >
      {/* Coin Indicator */}
      <div className="flex items-center mr-3">
        <div className={`w-2 h-2 rounded-full ${selected ? "bg-lime-500" : "bg-white/30"}`} />
      </div>

      {/* Coin Info */}
      <div className="flex-grow min-w-0">
        <h3
          className={`truncate font-semibold ${
            selected ? "text-lime-400 text-base" : "text-white text-base"
          }`}
          title={name}
        >
          {name}
        </h3>
        <p className="text-xs text-white/50 truncate" title={apiReference}>
          {apiReference}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 ml-2">
        <button
          onClick={onSelect}
          className={`p-1 rounded-md transition-colors
            ${selected ? "text-lime-400" : "text-white/40 hover:text-lime-400"}
            hover:bg-white/5`}
          aria-label="Select coin"
        >
          <ChartArea className="w-5 h-5" />
        </button>
        <button
          onClick={onRemove}
          className="p-1 rounded-md text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors"
          aria-label="Remove coin"
        >
          <Trash className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

interface SearchedCoinProps {
  name: string;
  apiReference: string;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  clearSearch: () => void;
  token: string;
}

export function SearchedCoin({
  name,
  apiReference,
  setShowResults,
  clearSearch,
  token,
}: SearchedCoinProps) {
  const handleFollow = async () => {
    try {
      await fetch(`http://localhost:8000/coins/follow/${apiReference}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Followed", apiReference);
    } catch (err) {
      console.error("❌ Error following coin:", err);
    }
  };

  return (
    <div className="flex items-center w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-200">
      {/* Coin Indicator */}
      <div className="flex items-center mr-3">
        <div className="w-2 h-2 rounded-full bg-white/30" />
      </div>

      {/* Coin Info */}
      <div className="flex-grow min-w-0">
        <h3 className="text-base font-semibold text-white truncate" title={name}>
          {name}
        </h3>
        <p className="text-xs text-white/50 truncate" title={apiReference}>
          {apiReference}
        </p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          handleFollow();
          clearSearch();
          setShowResults(false);
          window.location.reload();
        }}
        className="p-1 rounded-md text-white/40 hover:text-lime-400 hover:bg-white/5 transition-colors"
        aria-label="Add coin to followed list"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

export default FollowedCoin;
