import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter | Devon Hills',
  description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting, standard fonts, and clean structure optimized for Applicant Tracking Systems.',
  keywords: ['markdown', 'PDF', 'resume', 'ATS', 'converter', 'Devon Hills'],
  metadataBase: new URL("https://devonhills.dev"),
  alternates: {
    canonical: "/md-to-pdf",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://devonhills.dev/md-to-pdf',
    title: 'Markdown to PDF Converter | Devon Hills',
    description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting.',
    siteName: "Devon Hills Portfolio",
    images: [
      {
        url: "/api/og?name=Devon%20Hills&role=Markdown%20to%20PDF%20Converter&description=Convert%20your%20markdown%20resume%20to%20an%20ATS-compliant%20PDF",
        width: 1200,
        height: 630,
        alt: "Markdown to PDF Converter - Devon Hills",
      },
    ],
  },
  other: {
    "og:logo": "https://devonhills.dev/logo.png",
  },
  twitter: {
    card: "summary",
    title: 'Markdown to PDF Converter | Devon Hills',
    description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting.',
    images: ["/api/og/twitter?name=Devon%20Hills&role=Markdown%20to%20PDF%20Converter&description=Convert%20your%20markdown%20resume%20to%20an%20ATS-compliant%20PDF"],
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

export default function MDToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}