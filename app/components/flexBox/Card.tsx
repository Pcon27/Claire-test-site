import React from "react";

import clsx from "clsx"; // Install with `npm i clsx`
import flexStyles from "./flexbox.module.scss";

// For a border width, you must have a color as well

type CardProps = {
  children?: React.ReactNode;
  backgroundColor?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  size?: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80;
  borderColor?: 0 | 1 | 2 | 3 | 4 | 5;
  borderWidth?: 0 | 1 | 5 | 10 | 20 | 30 | 40 | 50 | 60;
  dropShadow?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  radius?: 0 | 10 | 20 | 30 | 40 | 50 | 60;
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  alignItems?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "stretch"
    | "baseline"
    | "normal";
  justifyContent?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  customClass?: string;
  fit?: "fit" | "fill";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  gap?: number; // New prop for gap
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  style?: React.CSSProperties;
  width?: number | "fill";
  height?: number | "fill";
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  tabIndex?: number;
  onBlur?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  ref?: React.Ref<HTMLDivElement | HTMLButtonElement>;
  hoverBlur?: boolean; // New prop for hover blur effect
  hoverColor?: 0 | 1 | 2 | 3 | 4 | 5; // New prop for hover color effect
  boxSizing?: "border-box" | "content-box";
};

const Card = ({
  customClass,
  children,
  backgroundColor,
  size = 40,
  borderColor,
  // For a border width, you must have a color as well
  borderWidth,
  dropShadow,
  radius,
  flexDirection = "column",
  alignItems = "flex-start",
  justifyContent = "flex-start",
  fit = "fit",
  disabled,
  onClick,
  gap,
  flexWrap,
  style,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  tabIndex,
  onBlur,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  ref,
  hoverBlur,
  hoverColor,
  boxSizing = "border-box",
}: CardProps) => {
  const className = clsx(
    customClass,
    backgroundColor && flexStyles[`bg${backgroundColor}`],
    flexStyles[`size${size}`],
    flexStyles[`flex-${flexDirection}`],
    flexStyles[`align-${alignItems}`],
    flexStyles[`justify-${justifyContent}`],
    borderColor ? flexStyles[`borderColor${borderColor}`] : flexStyles.noBorder,
    // For a border width, you must have a color as well
    borderColor && !borderWidth
      ? flexStyles[`borderWidth1`]
      : borderWidth && flexStyles[`borderWidth${borderWidth}`],
    fit && flexStyles[`${fit}`],
    dropShadow && !disabled && flexStyles[`dropShadow${dropShadow}`],
    flexStyles[`radius${radius}`],
    flexStyles[`flex-${flexWrap}`],
    disabled && flexStyles.disabled,
    gap && flexStyles[`gap${gap}`], // Example for gap usage
    width && flexStyles[`width${width}`],
    height && flexStyles[`height${height}`],
    maxWidth && flexStyles[`maxWidth${maxWidth}`],
    maxHeight && flexStyles[`maxHeight${maxHeight}`],
    minWidth && flexStyles[`minWidth${minWidth}`],
    minHeight && flexStyles[`minHeight${minHeight}`],
    hoverBlur && flexStyles.hoverBlur, // Add hover blur class if prop is true
    hoverColor && flexStyles[`hover${hoverColor}`], // Add hover color class if prop is provided
    boxSizing && flexStyles[`${boxSizing}`],
  );

  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      className={className}
      style={style}
      tabIndex={tabIndex}
      onBlur={onBlur}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={ref as React.Ref<HTMLDivElement & HTMLButtonElement>}
    >
      {children}
    </Wrapper>
  );
};

export default Card;
