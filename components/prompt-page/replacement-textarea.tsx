'use client';

import { useState } from 'react';

export default function ReplacementTextarea({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <div className="mx-1 mb-4 overflow-hidden rounded-md">
      <textarea
        className="block w-full bg-gray-900 p-4 text-xs text-gray-400"
        style={{ whiteSpace: 'pre-wrap', resize: 'none' }}
        value={value}
        placeholder="Replace the highlighted part with your own..."
        onChange={(event) => {
          setValue(event.target.value);
          if (onChange) {
            onChange(event.target.value);
          }
        }}
      />
    </div>
  );
}
