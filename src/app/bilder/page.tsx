import type { Metadata } from "next";
import { getBusts } from "@/db";
import Link from "next/link";
import { Picture } from "@/picture";

export const metadata: Metadata = {
  title: "Alla bilder - Thuas Trägubbar",
};

export default async function Page() {
  const { busts } = await getBusts();
  return (
    <div>
      <h1>Alla Thuas Trägubbar</h1>
      {busts.map((bust) => {
        return (
          <article
            key={bust.oid}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Link href={`/bilder/${bust.oid}`}>
              <Picture
                src={bust.image}
                alt={bust.title}
                style={{
                  width: 200,
                  marginRight: 20,
                  marginBottom: 20,
                }}
              />
            </Link>
            <div>
              <h2>
                <Link href={`/bilder/${bust.oid}`}>{bust.title}</Link>
              </h2>
              <p>
                <strong>
                  {new Date(bust.date).toLocaleDateString("sv-SE")}
                </strong>
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
