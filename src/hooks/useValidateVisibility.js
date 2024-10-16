import { useEffect, useState } from "react";
import { fetchData } from "../helpers/fetchData";
import { isFilterMatched } from "../modules/filters/isFilterMatched";

const INITIAL_STATE = {
  loading: true,
  data: undefined,
};

export const useValidateVisibility = (visibilityConfig) => {
  const { filter, entityType } = visibilityConfig;

  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const fetch = async () => {
      setState(INITIAL_STATE);

      const fetchedData = await fetchData(entityType);

      setState({
        loading: false,
        data: fetchedData,
      });
    };

    fetch();
  }, [entityType]);

  const visible = isFilterMatched(filter, { record: state.data });

  return {
    visible,
    loading: state.loading,
  };
};
