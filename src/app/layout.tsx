import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B4D2E',
};

export const metadata: Metadata = {
  title: "RhinoRoam - Roam Assam with the Locals",
  description: "Discover Assam through local eyes. Connect with community hosts, explore Kaziranga's wildlife, Majuli's heritage, and the hidden gems of Northeast India.",
  keywords: [
    "Assam tourism", "Northeast India travel", "Kaziranga safari", "Majuli island",
    "Brahmaputra cruise", "Muga silk", "Bihu festival", "tea garden stay",
    "tribal tourism", "community tourism", "sustainable travel", "heritage tourism",
    "Guwahati", "Sivasagar", "Bodo culture", "Mising tribe", "one-horned rhino"
  ],
  authors: [{ name: "RhinoRoam Team" }],
  openGraph: {
    title: "RhinoRoam - Roam Assam with the Locals",
    description: "Connect with Assam's communities, explore hidden trails, and experience the soul of Northeast India",
    type: "website",
    locale: "en_IN",
    siteName: "RhinoRoam",
  },
  twitter: {
    card: "summary_large_image",
    title: "RhinoRoam - Roam Assam with the Locals",
    description: "Connect with Assam's communities, explore hidden trails, and experience Northeast India",
    creator: "@rhinoroam",
  },
  other: {
    "google-site-verification": "your-verification-code",
  },
};

import { ChatWidget } from "@/components/chat/ChatWidget";

// ... existing imports ...

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
          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
