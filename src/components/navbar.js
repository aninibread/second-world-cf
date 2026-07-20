import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="flex w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center py-6">
      <Link href="/" className="block w-10 h-10" title="Home">
        <img
          src="https://pub-4b3c8e02204249afb15ca13b88ec64ef.r2.dev/nav-logo.png"
          alt="Home"
          className="w-full h-full"
        />
      </Link>
      <nav className="nav">
        <Link href="/cat" title="Cat">Cat</Link>
        <Link href="/message-board" title="Board">Board</Link>
      </nav>
    </header>
  );
};

export default Navbar;
