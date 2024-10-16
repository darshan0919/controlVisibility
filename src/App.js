import './styles.css';
import { HelloWorld } from './components/HelloWorld';
import { useState } from 'react';

const CONFIG = {
  entityType: 'CASE',
  filter: {
    field: 'fields._c_status',
    value: 'WORK',
    filterType: 'NOT_EQUALS',
  },
};

const CONFIG2 = {
  entityType: 'CASE',
  filter: {
    filterType: 'AND',
    filters: [
      {
        filterType: 'EQUALS',
        field: 'record.caseNu',
        value: 123,
      },
      {
        filterType: 'EQUALS',
        field: 'record.fields._c_status',
        value: 'IN_PROGRESS',
      },
    ],
  },
};

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setEnableConfig((e) => !e)}>
        {enableConfig
          ? 'Disable Visibility Conditions'
          : 'Enable Visibility Conditions'}
      </button>
      <HelloWorld visibilityConfig={enableConfig ? CONFIG2 : undefined} />
    </div>
  );
}
