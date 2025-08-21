import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { useEffect } from 'react';
import { getSortedPostsData, getSortedProjectPostsData } from '../lib/posts';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allProjectPostsData = getSortedProjectPostsData();
  return {
    props: {
      allPostsData,
      allProjectPostsData
    }
  };
}


export default function Blog({ allPostsData, allProjectPostsData }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { NLWebDropdownChat } from 'https://ask.anniwang.me/nlweb-dropdown-chat.js';
      
      try {
        const chat = new NLWebDropdownChat({
          containerId: 'docs-search-container',
          site: 'https://ask.anniwang.me/',
          placeholder: 'Search for docs...',
          endpoint: 'https://ask.anniwang.me/'
        });
      } catch (error) {
        console.error('Failed to initialize NLWeb chat:', error);
      }
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Anni Wang</title>
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <div id="docs-search-container"></div>
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 my-4">🖍️ random brain dumps 📄</h1>
        <div className="divide-y divide-gray-200">
          {allPostsData.map(({ id, date, title, summary, tags }) => (
            <div key={id} className="py-4">
              <Link href={`/posts/${id}`} passHref>
                <h2 className="text-2xl font-semibold text-gray-700 hover:text-blue-800 hover:underline cursor-pointer">{title}</h2>
              </Link>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
              <div className="tags">
                {tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <p className="mt-1 text-gray-500">{summary}</p>
            </div>
          ))}
        </div>
        <br/>
        <h1 className="text-4xl font-bold mb-6 my-4">🕹️ project docs 💻</h1>
        <div className="divide-y divide-gray-200">
          {allProjectPostsData.map(({ id, date, title, summary, tags }) => (
            <div key={id} className="py-4">
              <Link href={`/project-posts/${id}`} passHref>
                <h2 className="text-2xl font-semibold text-gray-700 hover:text-blue-800 hover:underline cursor-pointer">{title}</h2>
              </Link>
              <p className="text-sm text-gray-500">{formatDate(date)}</p>
              <div className="project-tags">
                {tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
              <p className="mt-1 text-gray-500">{summary}</p>
            </div>
          ))}
        </div>
        <div className="bounce-link-container">
          <a href="/cat" className="bounce-link">Look at my cat 🐱</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
