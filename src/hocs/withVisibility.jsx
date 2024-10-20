import React from 'react';
import { Placeholder } from '../components/Placeholder';
import { useValidateCondition } from '../hooks/useValidateCondition';

// Implement the logic for controlling the visibility of a component based on provided conditions in "conditionsConfig" prop
export const withVisibility = (Component) => (props) => {
  const { conditionsConfig, ...restProps } = props;

  const { visible, loading } = useValidateCondition(conditionsConfig);

  if (loading) {
    return <Placeholder {...restProps} />;
  }

  return visible ? <Component {...restProps} /> : null;
};
