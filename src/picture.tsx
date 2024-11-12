export function Picture({ src, alt }: { src: string; alt: string }) {
  const asWebP = src.replace(/\.(jpe?g|png)$/i, ".webp");
  return (
    <picture>
      <source srcSet={asWebP} type="image/webp"></source>
      <img src={src} alt={alt} />
    </picture>
  );
}
