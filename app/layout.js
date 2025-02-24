import { Inter } from 'next/font/google'
import './globals.css'

import { Playfair_Display, Changa, Arsenal, Karma } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-playfair',
});

const changa = Changa({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-changa',
});

const arsenal = Arsenal({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-arsenal',
});

const karma = Karma({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-karma',
});

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Acervo Digital - Voto Feminino',
  description: 'Celebrando 90+ Anos do Voto Feminino no Brasil',
  icons: {
    icon: '/memorial_legislativo.png',
    apple: '/memorial_legislativo.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${changa.variable} ${arsenal.variable} ${karma.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}