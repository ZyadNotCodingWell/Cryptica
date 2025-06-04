import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
	  (entries) => {
	    entries.forEach((entry) => {
	      const id = entry.target.id;
	      console.log(`[Observer] ${id} → isIntersecting:`, entry.isIntersecting);
	      if (entry.isIntersecting) {
	        setActiveId(id);
	        history.replaceState(null, "", `#${id}`);
	      }
	    });
	  },
	  {
	    rootMargin: "0px 0px -25% 0px", // bottom margin pushed up
			threshold: 0.25,
	  }
	);


    // Defer observing until next tick so sections exist
    const timeout = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 100); // 100ms delay ensures mounting
		console.log("Active section:", activeId);
    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
