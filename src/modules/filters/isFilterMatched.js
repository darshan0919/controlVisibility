import { FILTER_TYPES } from './constants';
import _ from 'lodash';

const isEqualsFilterMatched = (filter, context) => {
  const fieldValue = _.get(context, filter.field);

  return filter.value === fieldValue;
};

const isNotEqualsFilterMatched = (filter, context) => {
  const fieldValue = _.get(context, filter.field);

  return filter.value !== fieldValue;
};

export const isFilterMatched = (filter, context) => {
  switch (filter?.filterType) {
    case FILTER_TYPES.AND: {
      return filter.filters.every((filter) => isFilterMatched(filter, context));
    }
    case FILTER_TYPES.OR: {
      return filter.filters.some((filter) => isFilterMatched(filter, context));
    }
    case FILTER_TYPES.EQUALS: {
      return isEqualsFilterMatched(filter, context);
    }
    case FILTER_TYPES.NOT_EQUALS: {
      return isNotEqualsFilterMatched(filter, context);
    }
    default: {
      return true;
    }
  }
};
