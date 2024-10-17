import { CASE_DATA } from '../data';

const entityTypeVsDataGetter = {
  CASE: new Promise((res) => setTimeout(() => res(CASE_DATA), 500)),
};

export const fetchData = (entityType) => entityTypeVsDataGetter[entityType];
