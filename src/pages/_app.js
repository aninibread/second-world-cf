import { Instrument_Serif, Source_Sans_3 } from 'next/font/google';
import '../styles/globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${instrumentSerif.variable} ${sourceSans.variable} font-body min-h-screen`}>
      <Component {...pageProps} />
    </div>
  );
}
