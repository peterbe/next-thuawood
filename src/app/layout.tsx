import type { Metadata } from "next";
// import "@picocss/pico";
import "@picocss/pico/css/pico.pumpkin.min.css";

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
        <header>HUVUD</header>
        <main className="container">{children}</main>
        <footer>FOOTER</footer>
      </body>
    </html>
  );
}
