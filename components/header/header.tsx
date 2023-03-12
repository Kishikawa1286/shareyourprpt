import 'server-only';
import HamburgerMenu from './hamburger-menu';

export default function Header() {
  return (
    <header className="flex  items-center justify-between bg-gray-900 p-3">
      <h1 className="text-lg font-medium text-white">Share Your Prompt</h1>

      <nav>
        <HamburgerMenu />
      </nav>

      {/* <nav>
        <ul className="flex space-x-2 text-sm font-medium uppercase text-gray-400">
          <li>
            <SignInButton />
          </li>
          <li>
            <SignUpButton />
          </li>
        </ul>
      </nav> */}
    </header>
  );
}
