import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 100 }}>
      <hgroup>
        <h1>Välkommen till Thuas Trägubbar</h1>
        <p>Thua Bengtsson&apos;s webbplats med bilder på snideri</p>
      </hgroup>
      <img src="/images/ubat.jpg" alt="I ubåt med hatt" />
      <p style={{ margin: 100, textAlign: "center", fontSize: "120%" }}>
        <Link href="/bilder">All bilder &rarr;</Link>
      </p>
    </div>
  );
}
