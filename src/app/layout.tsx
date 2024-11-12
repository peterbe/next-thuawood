import "@picocss/pico/css/pico.pumpkin.min.css";
import "../styles.css";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://www.thuasgubbar.se"),
  openGraph: {
    images: "/images/ubat.jpg",
  },
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
      <nav>
        <ul>
          <li>
            <strong>
              <Link href="/">Thuas Trägubbar</Link>
            </strong>
          </li>
        </ul>
        <ul>
          <li>
            <Link href="/bilder">All bilder</Link>
          </li>
          <li>
            <a href="https://www.facebook.com/trafigurer">På Facebook</a>
          </li>
          <li>
            <Link href="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

const THIS_YEAR = new Date().getFullYear();
function Footer() {
  return (
    <footer className="container" style={{ textAlign: "center", margin: 50 }}>
      <p>
        <Link href="/">Hem</Link> {" ⋅ "}
        <Link href="/bilder">All bilder</Link> {" ⋅ "}
        <Link href="/kontakt">Kontakt</Link> {" ⋅ "}
        <a href="https://www.facebook.com/trafigurer">På Facebook</a>
      </p>
      <p>&copy; Thua Bengtsson {THIS_YEAR}</p>
    </footer>
  );
}
