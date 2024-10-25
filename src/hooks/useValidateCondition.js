import { useFetchData } from './useFetchData';

//utils
import { Condition } from '../modules/condition';

export const useValidateCondition = (conditionsConfig) => {
  const { data, loading } = useFetchData(conditionsConfig?.payload);
  const context = { record: data };

  // Implement the logic for checking the condition against a context using "Condition" class
  return {
    visible: true,
    loading,
  };
};
