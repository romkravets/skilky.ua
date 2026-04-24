import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BASE_URL } from '@/lib/config';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  verification: {
    google: 'TCpAsFwFwDmPDE_TPrmXp5Wl8a4ZBlygB-1qmR2uSBA',
  },
  title: 'Калькулятор вкрадених мільярдів',
  description: 'Введіть суму вкрадених коштів — і дізнайтеся, що могло бути збудовано, куплено або врятовано.',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'Калькулятор вкрадених мільярдів',
    description: 'Скільки бронежилетів, лікарень або шкіл можна збудувати за вкрадені мільярди?',
    locale: 'uk_UA',
    type: 'website',
    url: BASE_URL,
    images: [
      {
        url: `${BASE_URL}/api/og?amount=6700000000`,
        width: 1200,
        height: 630,
        alt: 'Калькулятор вкрадених мільярдів',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${BASE_URL}/api/og?amount=6700000000`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="uk"
      className={`${oswald.variable} ${ibmPlexMono.variable} ${ibmPlexSans.variable} h-full`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
