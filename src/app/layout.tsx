import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hustler Hunter",
  description: "Expose and track gurus and their claims",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-gray-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
