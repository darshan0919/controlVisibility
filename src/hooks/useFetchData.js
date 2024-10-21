import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetchData';

//Implement the logic for fetching data via "fetchData" function
export const useFetchData = (payload) => {
  const [state, setState] = useState({
    loading: !!payload,
  });

  useEffect(() => {
    if (!payload) {
      return;
    }

    try {
      const fetch = async () => {
        setState({
          loading: true,
          data: undefined,
        });

        const fetchedData = await fetchData(payload);

        setState({
          loading: false,
          data: fetchedData,
        });
      };

      fetch();
    } catch (e) {
      setState({
        loading: false,
      });
    }
  }, [payload]);

  return state;

  return {
    data: {}, // return the loaded data here
    loading: false, // return true if the data is being loaded, and false once the data is loaded
  };
};
