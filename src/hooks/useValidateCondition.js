import { useFetchData } from './useFetchData';

export const useValidateCondition = (conditionsConfig) => {
  const { data, loading } = useFetchData(conditionsConfig?.payload);
  const context = { record: data };

  // Implement the logic for checking the condition against a context using "Condition" class
  return {
    visible: !conditionsConfig || conditionsConfig.condition.matches(context),
    loading,
  };
};
