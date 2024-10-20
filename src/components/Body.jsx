import React from 'react';
import { Text } from './Text';
import { Condition } from '../modules/condition';

export default function Body({ enableConfig }) {
  return (
    <div
      key={`${enableConfig}`}
      className="border border-black rounded-[8px] flex flex-col gap-3 p-3 bg-yellow-100"
    >
      <Text
        text="Properties"
        conditionsConfig={
          enableConfig
            ? {
                payload: { entityType: 'CASE' },
                condition: new Condition({
                  field: 'fields._c_status',
                  value: 'WORK',
                  type: 'EQUALS',
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
