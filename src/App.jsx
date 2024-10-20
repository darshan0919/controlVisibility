import React, { useState } from 'react';
import Body from './components/Body';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setEnableConfig((enabled) => !enabled)}>
        {enableConfig
          ? 'Disable Visibility Conditions'
          : 'Enable Visibility Conditions'}
      </button>
      <Body enableConfig={enableConfig} />
    </div>
  );
}
