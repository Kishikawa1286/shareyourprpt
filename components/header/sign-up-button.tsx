'use client';

export default function SignUpButton() {
  const onClick = () => {
    // TODO: Sign up function
    return;
  };

  return (
    <button
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      onClick={onClick}
    >
      Sign Up
    </button>
  );
}
