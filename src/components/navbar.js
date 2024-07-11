import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

const Navbar = () => {
  const [isPopped, setIsPopped] = useState(false);
  const [isGrownBack, setIsGrownBack] = useState(false);
  const spinRef = useRef(null);

  const handleMouseDown = () => {
    // Remove the hold logic
  };

  const handleMouseUp = () => {
    setIsPopped(true);
    setTimeout(() => {
      setIsPopped(false);
      setIsGrownBack(true);
      setTimeout(() => {
        setIsGrownBack(false);
      }, 600); // Duration of the grow-back effect
    }, 400); // Duration of the popping effect
  };

  return (
    <header className="flex w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center py-6">
      <div
        className="relative w-12 h-12 logo"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Transition
          show={!isPopped}
          enter="transition-transform duration-500"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="transition-opacity duration-400"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <img
            ref={spinRef}
            src="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png"
            alt="Logo"
            className={`absolute inset-0 w-full h-full ${
              isPopped
                ? 'animate-pop'
                : isGrownBack
                ? 'animate-growBack'
                : 'animate-spin'
            }`}
          />
        </Transition>
      </div>
      <nav className="nav space-x-4">
        <Link href="/" title="info">info</Link>
        <Link href="/writing" title="writing">writing</Link>
        <Link href="/cat" title="cat">cat</Link>
        <Link href="/message-board" title="messages">board</Link>
      </nav>
    </header>
  );
};

export default Navbar;
