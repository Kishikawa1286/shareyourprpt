import 'server-only';

import './globals.scss';

import type { SupabaseClient } from '@supabase/auth-helpers-nextjs';
import Footer from '../components/footer/footer';
import GlobalWrapper from '../components/global-wrapper';
import Header from '../components/header/header';
import type { Database } from '../db_types';
import { createServerClient } from '../utils/supabase/supabase-server';

export type TypedSupabaseClient = SupabaseClient<Database>;

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }: { children?: React.ReactNode }) {
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
          <Header session={session} />

          {children}

          <Footer />
        </GlobalWrapper>
      </body>
    </html>
  );
}
