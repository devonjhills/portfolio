import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/layout/theme-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devon Hills | Software Engineer",
  description: "Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications. Based in [Location].",
  keywords: ["Devon Hills", "Software Engineer", "Full Stack Developer", "React", "Next.js", "TypeScript", "AI/ML", "Web Development"],
  authors: [{ name: "Devon Hills" }],
  creator: "Devon Hills",
  publisher: "Devon Hills",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devonjhills.dev'), // Update with actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devonjhills.dev', // Update with actual domain
    title: 'Devon Hills | Software Engineer',
    description: 'Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications.',
    siteName: 'Devon Hills Portfolio',
    images: [
      {
        url: '/og-image.jpg', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: 'Devon Hills - Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Devon Hills | Software Engineer',
    description: 'Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications.',
    images: ['/og-image.jpg'], // You'll need to add this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
