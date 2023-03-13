import 'server-only';

import Header from '../components/header/header';
import SupabaseListener from '../components/supabase-listener';
import SupabaseProvider from '../components/supabase-provider';
import { createServerClient } from '../utils/supabase-server';
import './globals.scss';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import Footer from '../components/footer/footer';
import GlobalWrapper from '../components/global-wrapper';
import type { Database } from '../db_types';

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <GlobalWrapper>
          <Header />

          <div className="grow bg-gray-100">
            <SupabaseProvider session={session}>
              <SupabaseListener serverAccessToken={session?.access_token} />
              {children}
            </SupabaseProvider>
          </div>

          <Footer />
        </GlobalWrapper>
      </body>
    </html>
  );
}
