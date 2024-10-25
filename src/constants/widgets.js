/* Do Not Change the contents of this file */

import { Condition } from '../modules/condition';

export const WIDGETS = [
  {
    text: 'Widget 0',
  },
  {
    text: 'Widget 1',
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
    text: 'Widget 2',
  },
  {
    text: 'Widget 3',
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
    text: 'Widget 4',
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
    text: 'Widget 5',
    conditionsConfig: {
      payload: { entityType: 'PROFILE' },
      condition: new Condition({
        field: 'record.profileDetails.handle',
        value: '@gryffindor',
        type: 'NOT_EQUALS',
      }),
    },
  },
  {
    text: 'Widget 6',
    conditionsConfig: {
      payload: { entityType: 'PROFILE' },
      condition: new Condition({
        field: 'record.profileName',
        value: 'Gryffindor | Hogwarts',
        type: 'EQUALS',
      }),
    },
  },
];
