import type { ImgHTMLAttributes } from "react";

interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export function Picture({ src, alt, ...props }: PictureProps) {
  const asWebP = src.replace(/\.(jpe?g|png)$/i, ".webp");
  return (
    <picture>
      <source srcSet={asWebP} type="image/webp"></source>
      <img src={src} alt={alt} {...props} />
    </picture>
  );
}
