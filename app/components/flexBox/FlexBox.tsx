"use strict";

import React from "react";
import flexStyles from "./flexbox.module.scss";
import clsx from "clsx"; // Install with `npm i clsx`

interface FlexBoxProps {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;
  customClass?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  fit?: "fill" | "fit";
}

const FlexBox = ({
  flexDirection = "column",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  flexWrap = "wrap",
  gap = 0,
  customClass,
  children,
  style,
  fit,
}: FlexBoxProps) => {
  const className = clsx(
    flexStyles[`flex-${flexDirection}`],
    flexStyles[`align-${alignItems}`], // <-- was wrong before (items -> align)
    flexStyles[`justify-${justifyContent}`],
    flexStyles[`gap${gap}`],
    flexStyles[`flex-${flexWrap}`],
    fit && flexStyles[`${fit}`],
    customClass,
  );

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export default FlexBox;
