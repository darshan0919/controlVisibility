import React from 'react';
import { Placeholder } from '../components/Placeholder';
import { useValidateVisibility } from '../hooks/useValidateCondition';

// Implement the logic for controlling the visibility of a component based on provided conditions in "conditionsConfig" prop
export const withVisibility = (Component) => (props) => {
  const { conditionsConfig, ...restProps } = props;

  if (!conditionsConfig) {
    return <Component {...restProps} />;
  }

  const { visible, loading } = useValidateVisibility(conditionsConfig);

  if (loading) {
    return <Placeholder />;
  }

  return visible ? <Component {...restProps} /> : null;
};
