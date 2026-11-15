"use strict";

import React, { ReactNode } from "react";
import fontStyles from "./text.module.scss";
import clsx from "clsx"; // Install with `npm i clsx`

interface TTextProps {
  italic?: boolean;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; // 🎯 custom weights
  size?: 0 | 10 | 15 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90; // 🎯 added size
  color?: 0 | 1 | 2 | 3 | 4 | 5;
  hover?: "underline" | "fade";
  customClass?: string;
  children?: ReactNode;
  style?: React.CSSProperties; // 🎯 added style prop
  underline?: boolean; // 🎯 added underline prop
  hoverColor?: 0 | 1 | 2 | 3 | 4 | 5; // 🎯 added hoverColor prop
  fontFamily?: 1 | 2; // 🎯 added fontFamily prop
}

const Text = ({
  italic = false,
  underline = false,
  weight = 400,
  size = 40,
  color = 0,
  hover,
  children,
  customClass,
  style,
  hoverColor,
  fontFamily = 1,
}: TTextProps) => {
  const className = clsx(
    customClass,
    fontStyles.font,
    !!italic && fontStyles.italic,
    !!underline && fontStyles.underline,
    fontStyles[`weight${weight}`],
    fontStyles[`textSize${size}`],
    fontStyles[`textColor${color}`],
    hover && fontStyles[`hover-${hover}`],
    hoverColor && fontStyles[`hoverText${hoverColor}`], // 🎯 added hover color class
    fontFamily === 1 ? fontStyles.font1 : fontStyles.font2, // 🎯 added font family class
  );
  const tag = size > 5 ? "h1" : size > 4 ? "h2" : "p";

  return React.createElement(
    tag,
    { className: className, style: style },
    children,
  );
};

export default Text;
