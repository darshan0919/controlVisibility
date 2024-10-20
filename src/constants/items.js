import { Condition } from '../modules/condition';

export const ITEMS = [
  {
    text: 'Item 1',
    conditionsConfig: {
      payload: { entityType: 'CASE' },
      condition: new Condition({
        field: 'fields._c_status',
        value: 'WORK',
        type: 'EQUALS',
      }),
    },
  },
  {
    text: 'Item 2',
    conditionsConfig: {
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
    },
  },
  {
    text: 'Item 3',
    conditionsConfig: {
      payload: { entityType: 'CASE' },
      condition: new Condition({
        field: 'fields._c_status',
        value: 'WORK',
        type: 'NOT_EQUALS',
      }),
    },
  },
  {
    text: 'Item 3',
    conditionsConfig: {
      payload: { entityType: 'PROFILE' },
      condition: new Condition({
        field: 'profileName',
        value: 'Gryffindor | Hogwarts',
        type: 'EQUALS',
      }),
    },
  },
];
