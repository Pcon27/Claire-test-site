"use client";

import { useState } from "react";
import BasicDJ from "./BasicDJ";

const PressPlay = () => {
  const [showNext, setShowNext] = useState(false);

  const handleShowNextFromChild = (value: boolean) => {
    if (value === true) {
      setShowNext(true); // ✅ Only change when showNext is true
    }
  };

  return (
    <div>
      <BasicDJ onShowNext={handleShowNextFromChild} showNext={showNext} />
    </div>
  );
};

export default PressPlay;
