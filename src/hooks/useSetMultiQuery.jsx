/** @format */

import { useLocation, useNavigate } from 'react-router';
import replaceMultiParams from './replaceMultiParams';

const useSetMultiQuery = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setMultiQuery = (key, values) => {
    navigate(`${pathname}${replaceMultiParams(key, values ? values : [])}`);
  };
  return setMultiQuery;
};

export default useSetMultiQuery;
