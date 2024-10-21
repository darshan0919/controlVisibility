import { fetchData } from '../helpers/fetchData';

//Implement the logic for fetching data via "fetchData" function
export const useFetchData = (payload) => {
  return {
    data: {}, // return the loaded data here
    loading: false, // return true if the data is being loaded, and false once the data is loaded
  };
};
