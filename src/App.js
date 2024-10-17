import React, { useState } from 'react';
import { HelloWorld } from './components/HelloWorld';
import { CONFIG1 } from './config';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setEnableConfig((enabled) => !enabled)}>
        {enableConfig
          ? 'Disable Visibility Conditions'
          : 'Enable Visibility Conditions'}
      </button>
      <HelloWorld visibilityConfig={enableConfig ? CONFIG1 : undefined} />
    </div>
  );
}
