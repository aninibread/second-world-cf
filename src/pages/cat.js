import Head from 'next/head'
import galleryStyles from '../styles/galleryStyles.module.css';
import { useState, useEffect } from 'react';
import {fetchCatMedia} from '../lib/fetchCatMedia';
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

export default function Cat() {
    const [catMedia, setCatMedia] = useState([]);

    useEffect(() => {
        const loadMedia = async () => {
        const media = await fetchCatMedia();
        setCatMedia(media);
        console.log('Media URLs set in state:', media);
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
            {catMedia.map((media, index) => (
                <div key={index} className={galleryStyles.masonryGridItem}>
                    <figure>
                    {media.type === 'image' && (
                        <>
                        <img src={media.url} alt={formatTitle(media.url)} className="w-full h-auto rounded-lg shadow-lg" />
                        </>
                    )}
                    {media.type === 'video' && (
                        <>
                        <video autoPlay loop muted className="w-full h-auto rounded-lg shadow-lg">
                            <source src={media.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        </>
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
