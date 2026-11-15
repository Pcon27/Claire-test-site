import Image from "next/image";

import clsx from "clsx";
import imageStyles from "./images.module.scss";

type ImageProps = {
  src: string;
  alt: string;
  width?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | "fill";
  height?: 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | "fill";
  small?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  minWidth?: number;
  minHeight?: number;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  radius?: 0 | 10 | 20 | 30 | 40 | 50 | 60;
  priority?: boolean;
  quality?: number;
  customClass?: string;
  resH?: number;
  resW?: number;
  style?: React.CSSProperties;
};

const CustomImage = ({
  src,
  alt,
  width = 40,
  height = 40,
  maxWidth,
  small,
  maxHeight,
  minWidth,
  minHeight,
  resH,
  resW,
  fill = false,
  objectFit = "contain",
  radius,
  priority,
  quality,
  customClass,
  style,
}: ImageProps) => {
  const className = clsx(
    customClass,
    imageStyles[`objectFit-${objectFit}`],
    radius !== undefined && imageStyles[`radius${radius}`],
    !fill && width && imageStyles[`width${width}`],
    !fill && height && imageStyles[`height${height}`],
    maxWidth && small
      ? imageStyles[`smallMaxWidth${maxWidth}`]
      : maxWidth && imageStyles[`maxWidth${maxWidth}`],
    maxHeight && small
      ? imageStyles[`smallMaxHeight${maxHeight}`]
      : maxHeight && imageStyles[`maxHeight${maxHeight}`],
    minWidth && small
      ? imageStyles[`smallMinWidth${minWidth}`]
      : minWidth && imageStyles[`minWidth${minWidth}`],
    minHeight && small
      ? imageStyles[`smallMinHeight${minHeight}`]
      : minHeight && imageStyles[`minHeight${minHeight}`],
    width && small
      ? imageStyles[`smallWidth${width}`]
      : width && imageStyles[`width${width}`],
    height && small
      ? imageStyles[`smallHeight${height}`]
      : height && imageStyles[`height${height}`],
    fill && imageStyles.fill,
  );

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : resW || 500}
      height={fill ? undefined : resH || 500}
      fill={fill}
      priority={priority}
      quality={quality}
      className={className}
      style={style}
    />
  );
};

export default CustomImage;
