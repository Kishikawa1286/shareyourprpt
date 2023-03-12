'use client';

export default function SignInButton() {
  const onClick = () => {
    // TODO: Sign in function
    return;
  };

  return (
    <button
      className="rounded bg-white py-2 px-4 font-bold text-black hover:bg-blue-200"
      onClick={onClick}
    >
      Sign In
    </button>
  );
}
