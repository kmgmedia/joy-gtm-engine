"use client";
import { useState, useEffect } from "react";
import type { ResponsiveBreakpoints } from "@/types/gtm";

export const useResponsive = (): ResponsiveBreakpoints => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Set hydration flag to true after component mounts
    setIsHydrated(true);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    // Call once to set initial values
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return default values until hydration is complete to avoid mismatch
  if (!isHydrated) {
    return { isMobile: false, isTablet: false };
  }

  return { isMobile, isTablet };
};
