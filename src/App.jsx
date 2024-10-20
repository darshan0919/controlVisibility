import React, { useState } from 'react';
import Body from './components/Body';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2"
        onClick={() => setEnableConfig((enabled) => !enabled)}
      >
        {enableConfig ? 'Hide Unmatched Items' : 'Show All Items'}
      </button>
      <Body enableConfig={enableConfig} />
    </div>
  );
}
