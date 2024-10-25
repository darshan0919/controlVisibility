import React from 'react';

//components
import { Loader } from '../components/Loader';
import { ContentHiddenPlaceholder } from '../components/ContentHiddenPlaceholder';

//hooks
import { useValidateCondition } from '../hooks/useValidateCondition';

// Implement the logic for controlling the visibility of component based on provided conditions in "conditionsConfig" prop
export const withVisibility = (Component) => (props) => {
  const { conditionsConfig, ...restProps } = props;

  const { visible, loading } = useValidateCondition(conditionsConfig);

  /*
    Based on 'loading' and 'visible' flags show either 'Loader' or 'ContentHiddenPlaceholder' or 'Component' itself
  */

  if (loading) {
    return <Loader {...restProps} />;
  }

  return visible ? (
    <Component {...restProps} />
  ) : (
    <ContentHiddenPlaceholder {...restProps} />
  );
};
