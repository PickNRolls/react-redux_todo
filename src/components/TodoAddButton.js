import React from 'react';

import './TodoAddButton.css';

var TodoAddButton = (props) => {
  return (
    <button
      className="todo-add-button"
      onClick={props.onClick}
      >Добавить TODO
    </button>
  );
}
;
export default TodoAddButton;
