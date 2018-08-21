import { createStore, combineReducers } from 'redux';

// Reducers

import todosById from './todos/reducer';

const rootReducer = combineReducers({
  todosById
});

const store = createStore(rootReducer);
window.store = store;

export default store;
