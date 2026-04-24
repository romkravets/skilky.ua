import type { Metadata } from 'next';
import { Oswald, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
  title: 'Калькулятор вкрадених мільярдів',
  description: 'Введіть суму вкрадених коштів — і дізнайтеся, що могло бути збудовано, куплено або врятовано.',
  openGraph: {
    title: 'Калькулятор вкрадених мільярдів',
    description: 'Скільки бронежилетів, лікарень або шкіл можна збудувати за вкрадені мільярди?',
    locale: 'uk_UA',
    type: 'website',
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
