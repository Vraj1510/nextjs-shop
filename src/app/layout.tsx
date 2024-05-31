import type { Metadata } from 'next';
import '/src/app/globals.css';
import { Montserrat, Poppins } from 'next/font/google';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Providers } from '@/redux/Provider';
import Cart from '@/components/Cart/Cart';
import Toast from '@/components/Toast/Toast';
import { NextAuthProvider } from '@/components/AuthProvider/AuthProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic', 'normal'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['italic', 'normal'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'NextJs Ecommerce',
  description: 'This is a shop where we sell online games',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <Toast></Toast>
        <Providers>
          <NextAuthProvider>
            <Cart></Cart>
            <Header></Header>
            {/* <header>Header</header> */}
            <main className='bg-primary-gradient min-h-screen'>{children}</main>
            {/* <footer>Footer</footer> */}
            <Footer></Footer>
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}
