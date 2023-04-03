'use client';

import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useSupabase } from '../../../supabase-provider';

export default function SignInModal({
  open,
  onClickBackground,
  onSigningIn,
}: {
  open: boolean;
  onClickBackground?: () => void;
  onSigningIn?: () => void;
}) {
  const context = useSupabase();
  if (!context) return null;
  const { supabase } = context;

  const signInWithGoogle = () => supabase.auth.signInWithOAuth({ provider: 'google' });

  const signInWithGitHub = () => supabase.auth.signInWithOAuth({ provider: 'github' });

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center bg-gray-800/50 px-4">
            <div
              onClick={onClickBackground}
              className="fixed inset-0 z-40 bg-gray-500 opacity-75"
            />
            <div
              className="align-center z-50 inline-block overflow-hidden rounded-lg bg-white
              p-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
            >
              <div className="flex flex-col items-center justify-between">
                <h2 className="mb-4 text-center text-3xl font-bold">Sign In</h2>
                <p className="mb-4 text-center text-sm text-gray-500">
                  When registering for this service for the first time,
                  <br />
                  an account will be created automatically.
                </p>
                <hr className="my-2 w-full border-gray-300" />

                <div>
                  <GoogleLoginButton
                    text="Sign in with Google"
                    onClick={async () => {
                      try {
                        await signInWithGoogle();
                        if (onSigningIn) onSigningIn();
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  />
                  <GithubLoginButton
                    text="Sign in with GitHub"
                    onClick={async () => {
                      try {
                        await signInWithGitHub();
                        if (onSigningIn) onSigningIn();
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
