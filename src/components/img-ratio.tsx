import React from "react";
import { ImgHTMLAttributes, ReactNode } from "react";
import cx from "../utils/cx";

interface ImageWithRatioProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  ratio: number;
  label?: ReactNode;
}

const ImageRatio = ({
  src,
  alt,
  className,
  ratio,
  ...props
}: ImageWithRatioProps) => {
  const pt: string = `${(1 / ratio) * 100}%`;
  return (
    <div
      className={cx("w-full relative", className)}
      style={{ paddingTop: pt }}
    >
      <img
        src={src}
        alt={alt}
        {...props}
        className="w-full absolute top-0 left-0 h-full object-cover"
      />
    </div>
  );
};

export default ImageRatio;
