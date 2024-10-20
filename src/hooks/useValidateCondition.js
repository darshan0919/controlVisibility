import { useFetchData } from './useFetchData';

export const useValidateCondition = (conditionsConfig) => {
  const { data, loading } = useFetchData(conditionsConfig?.payload);
  const context = { record: data };

  return {
    visible: !conditionsConfig || conditionsConfig.condition.matches(context),
    loading,
  };

  // Implment the logic for checking the condition against a context
  return {
    visible: true,
    loading,
  };
};
