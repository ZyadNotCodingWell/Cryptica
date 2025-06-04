"use client";
import { useState } from "react";
import React from "react";
import { Plus, Trash, ChartAreaIcon } from "lucide-react";

type FollowedCoinProps = {
  name: string;
  apiReference: string;
  selected: boolean;
  onRemove: () => void;
  onSelect: () => void;
};

const FollowedCoin = ({ name, apiReference, onRemove, onSelect, selected }: FollowedCoinProps) => {
  const [hoveringDelete, setHoveringDelete] = useState(false);
  const [hoveringSelect, setHoveringSelect] = useState(false);

  return (
    <div
      className={`flex items-center justify-between w-full px-3 py-2 my-2 gap-2 rounded-xl
        border shadow-md backdrop-blur-md
        transition-all duration-200 ease-in-out transform hover:scale-[102%]
        ${
          selected
            ? hoveringDelete
              ? "border-red-500"
              : "border-lime-400/90 bg-lime-400/5"
            : hoveringDelete
            ? "border-red-500"
            : hoveringSelect
            ? "border-lime-500/30 bg-lime-500/5"
            : "border-neutral-300/10 hover:border-neutral-300/20 bg-neutral-900/30"
        }
      `}
    >
      {/* Left Indicator */}
      <div className="relative flex items-center h-2 px-1">
        {hoveringDelete ? (
          <>
            <div className="absolute size-2 bg-red-500 rounded-full blur-sm opacity-50" />
            <div className="absolute size-2 bg-red-500 rounded-full opacity-80" />
          </>
        ) : hoveringSelect ? (
          <>
            <div className="absolute size-2 bg-lime-500 rounded-full blur-lg opacity-90" />
            <div className="absolute size-2 bg-lime-500 outline outline-lime-800 rounded-full opacity-80" />
          </>
        ) : (
          <>
            <div
              className={`absolute size-2 rounded-full blur-sm opacity-50 ${
                selected ? "bg-lime-400" : "bg-neutral-300/50"
              }`}
            />
            <div
              className={`absolute size-2 rounded-full opacity-80 outline ${
                selected
                  ? "bg-lime-500 outline-lime-800"
                  : "bg-neutral-300/30 outline-neutral-800"
              }`}
            />
          </>
        )}
      </div>

      {/* Name and Reference */}
      <div className="flex flex-col flex-grow gap-0 px-2 overflow-hidden items-center w-full">
        <h2
          className={`truncate text-sm font-semibold ${
            hoveringDelete
              ? "text-red-500"
              : selected
              ? "text-lime-500"
              : "text-neutral-300/70"
          }`}
        >
          {name}
        </h2>
        <p className="text-xs text-neutral-300/20 truncate">{apiReference}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          className={`transition duration-200 ${
            hoveringDelete
              ? "text-red-500"
              : selected
              ? "text-lime-400"
              : "text-neutral-300/40 hover:text-lime-400"
          }`}
          onClick={onSelect}
          onMouseEnter={() => setHoveringSelect(true)}
          onMouseLeave={() => setHoveringSelect(false)}
        >
          <ChartAreaIcon className="w-4 h-4" />
        </button>
        <button
          onClick={onRemove}
          onMouseEnter={() => setHoveringDelete(true)}
          onMouseLeave={() => setHoveringDelete(false)}
          className="transition duration-200 text-neutral-300/40 hover:text-red-500"
          aria-label="Remove coin"
        >
          <Trash className="w-4 h-4" />
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
  const [hovering, setHovering] = useState(false);

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
    <div
      className={`flex items-center justify-between w-full px-3 py-2 my-2 rounded-xl
        border backdrop-blur-md transition-all duration-200 shadow-md
        ${
          hovering
            ? "border-lime-500 bg-lime-500/5"
            : "border-neutral-300/10 hover:border-neutral-300/20 bg-neutral-900/30"
        }
      `}
    >
      {/* Left Indicator */}
      <div className="relative flex items-center h-2 px-1">
        {hovering ? (
          <>
            <div className="absolute size-2 bg-lime-500 rounded-full blur-lg opacity-90" />
            <div className="absolute size-2 bg-lime-500 outline outline-lime-800 rounded-full opacity-80" />
          </>
        ) : (
          <div className="absolute size-2 bg-neutral-300/50 outline outline-neutral-300/30 rounded-full opacity-80" />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow gap-0 px-2 overflow-hidden items-center w-full">
        <h2
          className={`truncate text-sm font-semibold ${
            hovering ? "text-lime-500" : "text-neutral-500"
          }`}
        >
          {name}
        </h2>
        <p className="text-xs text-neutral-300/20 truncate">{apiReference}</p>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          console.log("Button Clicked");
          handleFollow();
          clearSearch();
          setShowResults(false);
          window.location.reload();
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className="transition duration-200 text-neutral-300/40 hover:text-lime-500"
        aria-label="Add coin to followed list"
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

export default FollowedCoin;