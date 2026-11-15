import React from "react";
import flexStyles from "./flexbox.module.scss";

type GutterProps = {
  size: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;
  horizontal?: boolean;
};

const Gutter = ({ size = 40, horizontal = false }: GutterProps) => {
  const className = horizontal
    ? flexStyles[`gutter-horizontal${size}`]
    : flexStyles[`gutter-vertical${size}`];

  return <div className={className}></div>;
};

export default Gutter;
