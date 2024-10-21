import React from 'react';
import { useValidateCondition } from '../hooks/useValidateCondition';

// Implement the logic for controlling the visibility of a component based on provided conditions in "conditionsConfig" prop
/*
1. When the 'loading' is true, show placeholder
2. Once loading is false, hide or show the Component based on 'visible' flag
*/

export const withVisibility = (Component) => (props) => {
  const { conditionsConfig, ...restProps } = props;

  const { visible, loading } = useValidateCondition(conditionsConfig);

  return <Component {...restProps} />;
};
