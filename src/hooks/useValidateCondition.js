import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetchData';
import { isFilterMatched } from '../modules/filters/isFilterMatched';

const INITIAL_STATE = {
  loading: true,
  data: undefined,
};

export const useValidateCondition = (conditionsConfig) => {
  const { data, loading } = useFetchData(conditionsConfig.payload);
  const context = { record: data };

  return {
    visible: conditionsConfig.condition.matched(context),
    loading: state.loading,
  };

  // Implment the logic for checking the condition against a context
  return {
    visible: true,
    loading,
  };
};
