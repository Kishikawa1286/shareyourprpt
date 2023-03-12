'use client';

import { useState } from 'react';

export default function ReplacementTextarea({ onChange }: { onChange?: (value: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <div className="mx-1 mb-4 overflow-hidden rounded-md bg-gray-900">
      <textarea
        className="block w-full p-4 text-xs text-gray-400"
        style={{ whiteSpace: 'pre-wrap', resize: 'none' }}
        value={value}
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
