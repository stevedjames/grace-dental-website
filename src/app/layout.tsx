import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grace Dental Clinic - Thiruvalla",
  description: "Premium comprehensive dental care and treatments in Pullad P.O, Thiruvalla. Book an appointment today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-800 flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
