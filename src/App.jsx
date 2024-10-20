import React, { useState } from 'react';
import { Text } from './components/Text';
import { Condition } from './modules/condition';

export default function App() {
  const [enableConfig, setEnableConfig] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button onClick={() => setEnableConfig((enabled) => !enabled)}>
        {enableConfig
          ? 'Disable Visibility Conditions'
          : 'Enable Visibility Conditions'}
      </button>
      <Text
        text="Properties"
        conditionsConfig={
          enableConfig
            ? {
                payload: { entityType: 'CASE' },
                condition: new Condition({
                  field: 'fields._c_status',
                  value: 'WORK',
                  type: 'NOT_EQUALS',
                }),
              }
            : undefined
        }
      />
      <Text
        text="RecordCardList"
        conditionsConfig={
          enableConfig
            ? {
                payload: { entityType: 'CASE' },
                condition: new Condition({
                  type: 'AND',
                  conditions: [
                    new Condition({
                      type: 'EQUALS',
                      field: 'record.caseNu',
                      value: 123,
                    }),
                    new Condition({
                      type: 'EQUALS',
                      field: 'record.fields._c_status',
                      value: 'IN_PROGRESS',
                    }),
                  ],
                }),
              }
            : undefined
        }
      />
    </div>
  );
}
