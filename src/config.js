export const CONFIG1 = {
  entityType: 'CASE',
  filter: {
    field: 'fields._c_status',
    value: 'WORK',
    filterType: 'NOT_EQUALS',
  },
};

export const CONFIG2 = {
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
