import { legacy_createStore as createStore } from 'redux';

const initialState = {};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };
    default:
      return state;
  }
};

/**
 * Redux store instance
 * @type {import('redux').Store}
 */
const store = createStore(changeState);
export default store;
