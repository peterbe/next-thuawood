import type { Metadata } from "next";
import { type Bust, getBust, getBusts } from "@/db";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { bust } = await getBust(slug);

  return {
    title: bust.title,
    description: bust.description,
    openGraph: {
      images: [`/${bust.image}`],
    },
  };
}

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
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const data = await getBust(slug);
  const { bust, prev, next } = data;

  return (
    <div>
      <h1>{bust.title}</h1>
      {bust.description && <h2>{bust.description}</h2>}

      <img src={`/${bust.image}`} alt={bust.title} />

      <p style={{ marginTop: 50, marginBottom: 100 }}>
        Datum:{" "}
        <strong>{new Date(bust.date).toLocaleDateString("sv-SE")}</strong>
      </p>

      <div className="grid">
        <div>
          {prev && (
            <ThumbnailLink bust={prev}>Föregående: {prev.title}</ThumbnailLink>
          )}
        </div>
        <div>
          {next && (
            <ThumbnailLink bust={next}>Nästa: {next.title}</ThumbnailLink>
          )}
        </div>
      </div>
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
  return (
    <article>
      <div className="grid">
        <div>
          <Link href={`/bilder/${bust.oid}`}>
            <img
              src={`/${bust.image}`}
              alt={bust.title}
              style={{ width: 100, height: 100, objectFit: "contain" }}
            />
          </Link>
        </div>
        <div>
          <Link href={`/bilder/${bust.oid}`}>{children}</Link>
        </div>
      </div>
    </article>
  );
}
