import { type Bust, getBust, getBusts } from "@/db";
import Link from "next/link";

export async function generateStaticParams() {
  const { busts } = await getBusts();

  return busts.map((bust) => {
    return {
      slug: bust.oid,
    };
  });
}

type Params = {
  slug: string;
  prev: Bust | undefined;
  next: Bust | undefined;
} & Bust;

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await getBust(slug);
  const { bust, prev, next } = data;

  return (
    <div>
      <h1>{bust.title}</h1>
      {bust.description && <h2>{bust.description}</h2>}

      <img src={`/${bust.image}`} alt={bust.title} />

      <p>
        Datum:{" "}
        <strong>{new Date(bust.date).toLocaleDateString("sv-SE")}</strong>
      </p>

      <hr />
      {next && <ThumbnailLink bust={next}>Nästa: {next.title}</ThumbnailLink>}
      <br />
      {prev && (
        <ThumbnailLink bust={prev}>Föregående: {prev.title}</ThumbnailLink>
      )}
    </div>
  );
}

function ThumbnailLink({
  bust,
  children,
}: {
  bust: Bust;
  children: React.ReactNode;
}) {
  return <Link href={`/bilder/${bust.oid}`}>{children}</Link>;
}
