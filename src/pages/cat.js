import Head from 'next/head'
import galleryStyles from '../styles/galleryStyles.module.css';
import { useState, useEffect } from 'react';
import { fetchCatImageKeys } from '../lib/fetchCatMedia';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const formatTitle = (url) => {
    const filename = url.split('/').pop();
  
    return filename
      .replace(/_/g, ' ')
      .replace(/\.\w+$/, '')
      .split(' ')
      .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
      .join(' ');
};

const getImageHostUrl = (imageKey) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_HOST}/${imageKey}`
};

export default function Cat() {
    const [catImageKeys, setCatImageKeys] = useState([]);

    useEffect(() => {
        const loadMedia = async () => {
          const imageKeys = await fetchCatImageKeys();
          setCatImageKeys(imageKeys);
          console.log('Media URLs set in state:', imageKeys);
        };

        loadMedia();
    }, []);

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Anni Wang</title>
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">🐱 cat gallery</h1>
      <p>This is my kitty cat. Her name is Jiajia and she is turning 3 y/o (2024). Her name Jiajia or 佳佳 is a common Chinese name character that shares the same sound with the word 家 meaning 'Home'. </p>
      <br/>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {catImageKeys && catImageKeys.map((imageKey, index) => (
                <div key={index} className="col-span-1">
                    <figure>
                        {imageKey.endsWith("mp4") ? (
                          <video autoPlay loop muted playsInline className="w-full h-auto rounded-lg shadow-lg">
                            <source src={getImageHostUrl(imageKey)} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img src={getImageHostUrl(imageKey)} alt={formatTitle(imageKey)} className="w-full h-auto rounded-lg shadow-lg" />
                        )}
                    </figure>
                </div>
            ))}
        </div>
        <br/>
        <div className="bounce-link-container">
          <a href="/writing" className="bounce-link">see: my writing! 🖋️</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
