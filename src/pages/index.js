import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import PortalCard from '../components/portalCard';
import { useState, useEffect } from 'react';
import EmailCopyStyle from '../styles/EmailCopyFeedback.module.css';
import { fetchCatImageKeys } from '../lib/fetchCatMedia';

const portals = [
  { href: '/cat', title: 'Cat', subtitle: 'Meet Jiajia', variant: 'cat' },
  { href: '/message-board', title: 'Board', subtitle: 'Leave a message', variant: 'board' },
];

function getImageUrl(imageKey) {
  return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${imageKey}`;
}

function pickCatImage(keys) {
  const images = keys.filter((key) => !key.endsWith('.mp4'));
  if (!images.length) return null;
  return images[Math.floor(Math.random() * images.length)];
}

export default function Home() {
  const [isCopied, setIsCopied] = useState(false);
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [latestMessage, setLatestMessage] = useState(null);

  useEffect(() => {
    fetchCatImageKeys().then((keys) => {
      const key = pickCatImage(keys);
      if (key) setCatImageUrl(getImageUrl(key));
    });
  }, []);

  useEffect(() => {
    fetch('https://messageboard-anniwang.anniwang44.workers.dev/')
      .then((res) => res.json())
      .then((data) => {
        if (!data.messages?.length) return;
        const msg = data.messages[Math.floor(Math.random() * data.messages.length)];
        setLatestMessage({
          name: msg.name,
          text: msg.text.length > 55 ? `${msg.text.slice(0, 55)}…` : msg.text,
        });
      })
      .catch(() => {});
  }, []);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('anniwang44@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Anni Wang</title>
        <meta name="title" content="Anni Wang" />
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center py-12 sm:py-20">
        <header className="mb-12">
          <h1 className="hero-title">Hey, I&apos;m Anni</h1>
          <p className="hero-aside">(w/o the e)</p>
          <p className="hero-lead mt-6">
            Product at{' '}
            <a href="https://www.cloudflare.com/" target="_blank" rel="noreferrer">
              Cloudflare
            </a>
            . Waterloo.
          </p>
        </header>

        <div className="portal-grid mb-14">
          {portals.map((portal) => (
            <PortalCard
              key={portal.href}
              {...portal}
              imageUrl={portal.variant === 'cat' ? catImageUrl : null}
              preview={portal.variant === 'board' ? latestMessage : null}
            />
          ))}
        </div>

        <div className="contact-row">
          <div className={EmailCopyStyle.emailCopyContainer} onClick={copyEmailToClipboard}>
            <button type="button" className="contact-link">
              email
            </button>
            {isCopied && <div className={EmailCopyStyle.copiedToast}>copied</div>}
          </div>
          <span className="contact-sep">·</span>
          <Link href="https://linkedin.com/in/a248wang" target="_blank" className="contact-link">
            linkedin
          </Link>
          <span className="contact-sep">·</span>
          <Link href="https://github.com/aninibread" target="_blank" className="contact-link">
            github
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
