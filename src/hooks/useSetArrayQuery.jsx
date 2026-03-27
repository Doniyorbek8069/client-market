/** @format */

import { useLocation, useNavigate } from 'react-router';
import setMultiQuery from './setMultiQuery';

const useSetArrayQuery = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const setArrayQuery = (key, values) => {
    navigate(`${pathname}${setMultiQuery(key, values)}`);
  };
  return setArrayQuery;
};

export default useSetArrayQuery;
