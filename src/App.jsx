/* Do Not Change the contents of this file */

import React, { useState } from 'react';
import Body from './components/Body';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-4 widgets-center w-full p-5">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 self-end"
        onClick={() => setEnableConfig((enabled) => !enabled)}
      >
        {!enableConfig ? 'Show Filtered Widgets' : 'Show All Widgets'}
      </button>
      <Body enableConfig={enableConfig} />
    </div>
  );
}
