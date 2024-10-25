/* Do Not Change the contents of this file */

import React, { useState } from 'react';
import Body from './components/Body';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-4 widgets-center w-full p-5">
      <Body enableConfig={enableConfig} />
      <button
        className="px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 rounded-md"
        onClick={() => setEnableConfig((enabled) => !enabled)}
      >
        {!enableConfig ? 'Show Visible Widgets Only' : 'Show All Widgets'}
      </button>
    </div>
  );
}
