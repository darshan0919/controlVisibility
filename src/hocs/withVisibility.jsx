import React from 'react';
import { Tombstone } from '../components/Tombstone';
import { useValidateVisibility } from '../hooks/useValidateVisibility';

export const withVisibility = (Component) => (props) => {
  const { visibilityConfig } = props;

  if (!visibilityConfig) {
    return <Component />;
  }

  const { visible, loading } = useValidateVisibility(visibilityConfig);

  if (loading) {
    return <Tombstone />;
  }

  return visible ? <Component /> : null;
};
