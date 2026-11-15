"use strict";

import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  // Initialize state with undefined width and height to match the server-rendered layout
  const [dimensions, setDimensions] = useState<{
    width?: number;
    height?: number;
  }>({});

  useEffect(() => {
    const handleResize = () => {
      // Set window width and height
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    !!window && window.addEventListener("resize", handleResize);
    // Call once to set initial state
    handleResize();

    // Cleanup
    return () => !!window && window.removeEventListener("resize", handleResize);
  }, []);

  return dimensions;
};

export default useWindowDimensions;
