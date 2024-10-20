/* Do Not Change contents of this file */

import { CASE_DATA } from '../constants/data';

const entityTypeVsDataGetter = {
  CASE: new Promise((res) => setTimeout(() => res(CASE_DATA), 500)),
};

export const fetchData = (payload) =>
  entityTypeVsDataGetter[payload.entityType];
