import type { Metadata } from "next";
import "@picocss/pico/css/pico.pumpkin.min.css";
import "../styles.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thuas trägubbar",
  description:
    "Trägubbar, snideri, hantverk, trä, träskulptur, träfigur, träleksak, träleksaker, trägubbe, trägubbar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="container">
      <div className="grid">
        <div>
          <Link href="/">Thuas Trägubbar</Link>
        </div>
        <div>
          <Link href="/bilder">All bilder</Link> {" ⋅ "}
          <Link href="/bilder">På Facebook</Link> {" ⋅ "}
          <Link href="/kontakt">Kontakt</Link>
        </div>
      </div>
    </header>
  );
}

const THIS_YEAR = new Date().getFullYear();
function Footer() {
  return (
    <footer className="container" style={{ textAlign: "center", margin: 50 }}>
      &copy; Thua Bengtsson {THIS_YEAR}
    </footer>
  );
}
