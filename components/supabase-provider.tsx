'use client';

import type { Session } from '@supabase/auth-helpers-nextjs';
import { createContext, useContext, useState } from 'react';
import type { TypedSupabaseClient } from '../app/layout';
import { createBrowserClient } from '../utils/supabase/supabase-browser';

type SupabaseContext = {
  supabase: TypedSupabaseClient;
  session: Session | null;
};

const Context = createContext<SupabaseContext | null>(null);

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  const [supabase] = useState(() => createBrowserClient());

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => useContext(Context);
