import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echoes of Space — 3D Atlas of Historic Lunar Equipment",
  description:
    "An educational, scientifically grounded interactive 3D atlas mapping historic and inactive NASA equipment on the Moon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black text-white h-full">
      <body className="antialiased min-h-screen h-full bg-black text-slate-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
