import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="flex w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center py-6">
      <div className="logo">
        <img src="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png" alt="Logo" className="h-12 w-12 spin " />
      </div>
      <nav className="nav space-x-4">
        <Link href="/" title="info">info</Link>
        <Link href="/writing" title="writing">writing</Link>
        <Link href="/cat" title="cat">cat</Link>
        {/*<Link href="/message-board" title="messages">board</Link>*/}
      </nav>
    </header>
  );
};

export default Navbar;
