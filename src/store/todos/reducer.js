import types from '../actionTypes';

var initialState;
var storageValue = JSON.parse(localStorage.getItem('todosById'));

if (storageValue == null) initialState = {};
else initialState = storageValue;

var todos = function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO:

      // Get last item id and transfrom from string to num
      // With increment

      var id;
      var lastElement = Object.keys(state).slice(-1);
      if (lastElement[0] == null) id = 0;
      else id = lastElement[0] - 1 + 2;

      var innerTodo = {
        title: action.title,
        description: action.desc
      };

      var todo = {};
      todo[id] = innerTodo;

      innerTodo = todo.id;

      return Object.assign({}, state, todo);


    case types.REMOVE_TODO:
      id = action.id;
      var nextState = {};

      for (var prop in state) {
        if (prop === id) continue;
        nextState[prop] = state[prop];
      }

      return nextState;


    case types.EDIT_TODO:
      id = action.id;
      var title = action.title;
      var description = action.desc;

      var changedTodo = Object.assign({}, state[id], {
        title,
        description
      });

      nextState = {};
      nextState[id] = changedTodo;
      nextState = Object.assign({}, state, nextState);

      return nextState;

    default:
      return state;
  }
};

export default todos;
