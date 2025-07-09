import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Markdown to PDF Converter | Devon Hills',
  description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting, standard fonts, and clean structure optimized for Applicant Tracking Systems.',
  keywords: ['markdown', 'PDF', 'resume', 'ATS', 'converter', 'Devon Hills'],
  openGraph: {
    title: 'Markdown to PDF Converter | Devon Hills',
    description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting.',
    url: 'https://devonhills.dev/md-to-pdf',
  },
  twitter: {
    title: 'Markdown to PDF Converter | Devon Hills',
    description: 'Convert your markdown resume to an ATS-compliant PDF with professional formatting.',
  },
};

export default function MDToPDFLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}