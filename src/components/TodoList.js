import React from 'react';

import './TodoList.css';

class TodoList extends React.Component {
  render () {
    var todos = Object.entries(this.props.todos).map((prop) => {
      var id = prop[0];
      var content = prop[1];

      return (
        <li className="todo" key={id}>
          <div className="todo__panel">
            <div
              className="todo__edit"
              onClick={()=>this.props.onTodoEdit(id)}>
              Изменить
            </div>
            <div 
              className="todo__remove"
              onClick={()=>this.props.onTodoRemove(id)}>✕</div>
          </div>
          <div className="todo__title">{content.title}</div>
          <div className="todo__desc">{content.description}</div>
        </li>
      );
    });

    return (
      <ul className="todo-list">
        {todos}
      </ul>
    );
  }
}

export default TodoList;
