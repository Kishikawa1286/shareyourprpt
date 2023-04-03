import 'server-only';

import { Session } from '@supabase/auth-helpers-nextjs';
import Client from '../client';
import HamburgerMenu from './client/hamburger-menu/hamburger-menu';

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="flex  items-center justify-between bg-gray-900 p-3">
      <h1 className="text-lg font-medium text-white">Share Your Prompt</h1>
      <nav className="md:mr-4">
        <Client session={session}>
          <HamburgerMenu />
        </Client>
      </nav>
    </header>
  );
}
