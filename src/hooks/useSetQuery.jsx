/** @format */

import { useNavigate } from 'react-router-dom';
import replaceParams from './replaceParams';

const useSetQuery = () => {
  const navigate = useNavigate();
  const setQuery = (key, value) => {
    navigate(`${window.location.pathname}${replaceParams(key, value)}`);
  };
  return setQuery;
};

export default useSetQuery;
