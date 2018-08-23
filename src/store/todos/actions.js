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

var editTodo = function(id, title, desc) {
  return {
    type: types.EDIT_TODO,
    id, title, desc
  };
};

export default {
  addTodo,
  removeTodo,
  editTodo
};
