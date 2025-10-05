import { useState, useEffect } from "react";

export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
      console.log("useMobile hook - isMobile:", mobile, "Window Width:", window.innerWidth);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return { isMobile };
};