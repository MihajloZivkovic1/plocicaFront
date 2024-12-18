import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://plocica-front.vercel.app/"),
  title: "MemoryPlate",
  description: "Create lasting memories with personalized QR plates for loved ones, offering a digital gateway to cherished stories and photos on gravestones.",
  keywords: ["QR plates", "memorial plates", "digital gravestones", "graveyard QR codes", "lasting memories"],
  authors: [{ name: "MemoryPlate", url: "https://plocica-front.vercel.app/" }],
  openGraph: {
    title: "Personalized QR Plates for Gravestones",
    description: "Durable QR codes for gravestones provide a digital gateway to cherished memories, photos, and stories.",
    url: "https://plocica-front.vercel.app/",
    type: "website",
    images: [
      {
        url: "/path-to-social-sharing-image.jpg",
        width: 1200,
        height: 630,
        alt: "MemoryPlate QR code example",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
};


export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
