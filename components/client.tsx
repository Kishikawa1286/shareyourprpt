import { Session } from '@supabase/auth-helpers-nextjs';
import 'server-only';

import SupabaseListener from './supabase-listener';
import SupabaseProvider from './supabase-provider';

export default function Client({
  children,
  session,
}: {
  children?: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SupabaseProvider session={session}>
      <SupabaseListener serverAccessToken={session?.access_token} />
      {children}
    </SupabaseProvider>
  );
}
