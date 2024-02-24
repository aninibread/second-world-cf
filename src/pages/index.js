import { Inter } from 'next/font/google'
import Head from 'next/head'
import ProjectCard from '../components/project_cards';
import ResumeItem from '../components/resumeItem';
import VolCard from '../components/volCards';
import {Projects} from '../data/card_preview';
import {workExperiences} from '../data/work_experience';
import {researchExperiences} from '../data/research_experience';
import {volunteeringExperiences} from '../data/vol_experience';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import React, { useState, useEffect } from 'react';
import EmailCopyStyle from '../styles/EmailCopyFeedback.module.css';

const inter = Inter({ subsets: ['latin'] })



export default function Home() {

  // State to handle copy feedback
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy email to clipboard
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('anniwang44@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
      // Only run this code on the client side
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/6465234174285f0ec46c1008/1h0lh3elo';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      
      document.body.appendChild(script);
  
      // Optional: Clean up script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    }, []);

  return (
    <div className="flex flex-col min-h-screen pt-10">
      <Head>
        <title>Anni Wang</title>
        <link rel="icon" href="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" />
      </Head>
      <Navbar />
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl mb-5 my-4">👋 hiyo, it's anni (w/o the e)</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <p className="bio-text text-lg mb-2">
              <span className="sparkly-text">uWaterloo biomed eng</span> student trying to figure things out. what's on my mind: HCI, neuroscience, law, philosophy, and crafting.
            </p>
          </div>
          <div className="md:col-span-1">
            <h3 className="mb-2">contacts</h3>
            <div className={EmailCopyStyle.emailCopyContainer} onClick={copyEmailToClipboard}>
              <p className="mb-2">📧 <a>anniwang44@gmail.com</a></p>
                {isCopied && (
                  <div className={EmailCopyStyle.speechBubble}>
                    Copied!
                    <div className={EmailCopyStyle.speechBubbleArrowOutline}></div>
                    <div className={EmailCopyStyle.speechBubbleArrow}></div>
                  </div>
                )}
            </div>
            <p className="mb-2">👔 <a href="https://linkedin.com/in/a248wang" target="_blank">linkedin.com/in/a248wang</a></p>
            <p className="mb-2">👾 <a href="https://github.com/aninibread" target="_blank">github.com/aninibread</a></p>
          </div>
        </div>
        <h2 className="intro-header text-2xl my-6">some projects</h2>
        <div className="cardsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        <h2 className="intro-header text-2xl my-6">work exp</h2>
        <p className="mb-4">Explored areas such as fintech, b2b, b2c, and iaas. worked in various company sized from 3 to 100k employees: </p>
        <div>
          {workExperiences.map((experience, index) => (
            <ResumeItem key={index} {...experience} />
          ))}
        </div>
        <h2 className="intro-header text-2xl my-6">research exp</h2>
          {researchExperiences.map((experience, index) => (
            <ResumeItem key={index} {...experience} />
          ))}
        <h2 className="intro-header text-2xl my-6">community service</h2>
        <div className="cardsGrid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {volunteeringExperiences.map((experience, index) => (
            <VolCard key={index} {...experience} />
          ))}
        </div>
        <div className="bounce-link-container">
          <a href="/writing" className="bounce-link">see next: my writing! 🖋️</a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
