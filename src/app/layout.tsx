import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  title: "GUenARK - Discover India's Heritage",
  description: "A map-centric tourism and heritage intelligence platform helping travellers discover, plan, navigate, and respect India's cultural destinations while supporting local communities.",
  keywords: ["tourism", "heritage", "India", "travel", "culture", "sustainable tourism", "community tourism"],
  authors: [{ name: "GUenARK Team" }],
  openGraph: {
    title: "GUenARK - Discover India's Heritage",
    description: "Explore India's rich cultural heritage with our intelligent tourism platform",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "GUenARK - Discover India's Heritage",
    description: "Explore India's rich cultural heritage with our intelligent tourism platform",
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#D4A574",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
