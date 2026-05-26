import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glossy Blush Women's Beauty Studio | Bandar Seri Begawan, Brunei",
  description:
    "Luxury beauty parlour in Bandar Seri Begawan, Brunei. Hair, nails, facials, makeup, lash & brow services. Book your appointment today.",
  keywords: [
    "beauty salon",
    "Brunei",
    "Bandar Seri Begawan",
    "hair salon",
    "nail salon",
    "facial",
    "makeup",
    "luxury beauty",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
