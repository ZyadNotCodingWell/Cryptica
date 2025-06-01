"use client";
import { useState } from "react";
import React from "react";

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
		  className={`flex items-center justify-between w-full px-2 py-2 my-1 gap-2 h-fit rounded-md
		    bg-neutral-900/30
		    border hover:scale-[102%]
		    transition duration-200 group
		    ${selected ? hoveringDelete ? "border-red-500" : "border-lime-400/80" : hoveringDelete ? "border-red-500" : hoveringSelect ? "border-lime-500/35" : "border-neutral-300/5 hover:border-neutral-300/10"}
		  `}
		>
      <div className="relative flex items-center h-2 px-1">
        {hoveringDelete ? (
					<div className="absolute left-0 flex items-center justify-center h-full w-full">
						<div className="absolute size-2 bg-red-500 rounded-full blur-sm opacity-50" />
						<div className="absolute size-2 bg-red-500 rounded-full opacity-80" />
					</div>
        ) : hoveringSelect ?  (
					<>
						<div className={"absolute inset-0 size-2 bg-lime-400 rounded-full blur-sm opacity-50"} />
						<div className={"absolute inset-0 size-2 bg-lime-400 rounded-full opacity-80" }/>
					</>
				) : (

					<>
						<div className={ selected ? "absolute inset-0 size-2 bg-lime-400 rounded-full blur-sm opacity-50" : "absolute inset-0 size-2 bg-neutral-300/50 rounded-full blur-sm opacity-50"} />
						<div className={ selected ? "absolute inset-0 size-2 bg-lime-500 rounded-full opacity-80 outline outline-lime-800" : "outline outline-neutral-800 absolute inset-0 size-2 bg-neutral-300/30 rounded-full opacity-80" }/>
					</>
        )}
      </div>
      <div className="flex gap-2 items-center w-full justify-between">
        <h2 className={hoveringDelete? "text-red-500 text-sm" : selected ?"text-lime-500 text-sm" : "text-neutral-300/30 text-sm"}>{name}</h2>
        <p className="text-neutral-300/15 w-full text-xs">{apiReference}</p>
      </div>
			<div className="flex gap-1 items-center justify-between w-fit">
				<button 
				className={ hoveringDelete ? "relative text-red-500 transition duration-200" : selected? "relative text-lime-400 transition duration-200" :"relative text-neutral-300/30 hover:text-lime-400 transition duration-200"}
				onClick={() => {onSelect()}}
				onMouseEnter={() => setHoveringSelect(true)}
				onMouseLeave={() => setHoveringSelect(false)}
				>
					<svg 
						viewBox="0 0 24 24" 
						fill="none" 
						className="w-5 h-5" 
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							 <path d="M21 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V3M15 4V8M11 8V12M7 13V17M19 4V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
						</g>
					</svg>
				</button>

      	<button
      	  onClick={onRemove}
      	  onMouseEnter={() => setHoveringDelete(true)}
      	  onMouseLeave={() => setHoveringDelete(false)}
      	  className="relative text-neutral-300/30 hover:text-red-500 transition duration-200"
      	  aria-label="Remove coin"
      	>
      	  <svg
      	    xmlns="http://www.w3.org/2000/svg"
      	    fill="none"
      	    viewBox="0 0 24 24"
      	    strokeWidth={1.5}
      	    stroke="currentColor"
      	    className="w-5 h-5"
      	  >
      	    <path
      	      d="M10 12V17M14 12V17M4 7H20M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
      	      strokeLinecap="round"
      	      strokeLinejoin="round"
      	    />
      	  </svg>
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
console.log("SearchedCoin component is mounted");

export function SearchedCoin({ name, apiReference, setShowResults, clearSearch, token }: SearchedCoinProps) {
  const [hoveringDelete, setHoveringDelete] = useState(false);

  const handleFollow = async () => {
    try {
      await fetch(`http://localhost:8000/coins/follow/${apiReference}`, {
        method: 'POST',
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
      className={`flex items-center justify-between w-full px-2 py-2 my-1 gap-2 h-fit rounded-md
        bg-neutral-900/30
        border
        transition duration-200 backdrop-blur-sm
        ${hoveringDelete ? "border-lime-500" : "border-neutral-300/5 hover:border-neutral-300/10"}`}
    >
      <div className="relative flex items-center h-2 px-1">
        {!hoveringDelete ? (
          <>
            <div className="absolute inset-0 size-2 bg-neutral-300/50 outline outline-neutral-300/30 rounded-full opacity-80" />
          </>
        ) : (
          <div className="absolute left-0 flex items-center justify-center h-full w-full">
            <div className={"absolute size-2 bg-lime-500 rounded-full blur-lg opacity-90"} />
            <div className="absolute size-2 bg-lime-500 outline outline-lime-800 rounded-full opacity-80" />
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center w-full justify-between">
        <h2 className={ !hoveringDelete? "text-neutral-500 text-sm font-semibold" : "text-lime-500 text-sm font-semibold"}>{name}</h2>
        <p className="text-neutral-300/15 text-sm">{apiReference}</p>
      </div>

      <button
        onClick={() => {
          console.log("Button Clicked");
					handleFollow();
          clearSearch();
          setShowResults(false);
					window.location.reload();
        }}
        onMouseEnter={() => setHoveringDelete(true)}
        onMouseLeave={() => setHoveringDelete(false)}
        className="relative text-neutral-300/30 hover:text-lime-500 transition duration-200"
        aria-label="Add coin to followed list"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
  				  strokeLinecap="round"
  				  strokeLinejoin="round"
						strokeWidth={3}
  				  d="M12 4v16m8-8H4"
  				/>
        </svg>
      </button>
    </div>
  );
}


export default FollowedCoin;

