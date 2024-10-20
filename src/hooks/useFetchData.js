import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetchData';

const INITIAL_STATE = {
  loading: true,
  data: undefined,
};

export const useFetchData = (payload) => {
  //Implement the logic for fetching data via "fetchData" function
  const [state, setState] = useState({
    loading: !!payload,
  });

  useEffect(() => {
    if (!payload) {
      return;
    }

    const fetch = async () => {
      setState(INITIAL_STATE);

      const fetchedData = await fetchData(payload);

      setState({
        loading: false,
        data: fetchedData,
      });
    };

    fetch();
  }, [payload]);

  return state;

  return {
    data: {}, // return the loaded data here
    loading: false, // return true if the data is being loaded, and false once the data is loaded
  };
};
