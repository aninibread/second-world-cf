import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="flex w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center py-6">
      <div className="logo text-5xl">🧸</div>
      <nav className="nav space-x-4">
        <Link href="/" title="info">info</Link>
        <Link href="/writing" title="writing">writing</Link>
        <Link href="/cat" title="cat">cat</Link>
      </nav>
    </header>
  );
};

export default Navbar;
