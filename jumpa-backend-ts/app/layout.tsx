import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Jumpa Backend",
  description: "Jumpa Backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` `}>
      <body>{children}</body>
    </html>
  );
}
