import type { Metadata } from "next";
import { Inter, Fira_Code, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/layout/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Devon Hills | Software Engineer",
  description:
    "Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications. Based in [Location].",
  keywords: [
    "Devon Hills",
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "AI/ML",
    "Web Development",
  ],
  authors: [{ name: "Devon Hills" }],
  creator: "Devon Hills",
  publisher: "Devon Hills",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://devonjhills.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devonjhills.dev",
    title: "Devon Hills | Software Engineer",
    description:
      "Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications.",
    siteName: "Devon Hills Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Devon Hills - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Devon Hills | Software Engineer",
    description:
      "Full-stack software engineer specializing in modern web technologies, AI/ML integration, and scalable applications.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
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
        className={`${inter.variable} ${firaCode.variable} ${sora.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
