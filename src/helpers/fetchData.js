/* Do Not Change contents of this file */

import { PROFILE_DATA } from '../constants/data';

const entityTypeVsDataGetter = {
  CASE: () => new Promise((res) => setTimeout(() => res(CASE_DATA), 2000)),
  PROFILE: () =>
    new Promise((res) => setTimeout(() => res(PROFILE_DATA), 2000)),
};

export const fetchData = (payload) =>
  entityTypeVsDataGetter[payload.entityType]?.();
