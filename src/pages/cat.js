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
        <link rel="icon" href="/profile_favcon.jpeg" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6">🐱 cat gallery</h1>
      <p>This is my kitty cat. Her name is Jiajia and she is turning 3 y/o (2024). Her name Jiajia or 佳佳 is a common Chinese name character that shares the same sound with the word 家 meaning 'Home'. </p>
      <br/>
        <div className={galleryStyles.masonryGrid}>
            {catImageKeys && catImageKeys.map((imageKey, index) => (
                <div key={index} className={galleryStyles.masonryGridItem}>
                    <figure>
                        <img src={getImageHostUrl(imageKey)} alt={formatTitle(imageKey)} className="w-full h-auto rounded-lg shadow-lg" />
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
