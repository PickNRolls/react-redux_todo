import types from '../actionTypes';

var addTodo = function(title, desc) {
  return {
    type: types.ADD_TODO,
    title,
    desc
  };
};

var removeTodo = function(id) {
  return {
    type: types.REMOVE_TODO,
    id
  };
};

export default {
  addTodo,
  removeTodo
};
