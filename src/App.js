import React from 'react';

// Components

import TodoAddButton from './components/TodoAddButton';
import TodoList from './components/TodoList';
import TodoPopup from './components/TodoPopup';

import store from './store';
import todoActions from './store/todos/actions';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todosById: {

      },
      popupIsVisible: false
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    this.unsub = store.subscribe(() => {
      var jsonTodos = JSON.stringify(store.getState().todosById);
      localStorage.setItem('todosById', jsonTodos);
      this.setState(store.getState());
    });

    this.setState(store.getState());
  }

  componentWillUnmount() {
    this.unsub();
  }

  addTodo(data) {
    store.dispatch(todoActions.addTodo(data.title, data.desc));
    this.closePopup();
  }

  removeTodo(id) {
    store.dispatch(todoActions.removeTodo(id));
  }

  closePopup() {
    this.setState({
      popupIsVisible: false
    });
  }

  openPopup() {
    this.setState({
      popupIsVisible: true
    });
  }

  render() {
    var popup = null;
    if (this.state.popupIsVisible) {
      popup = (
        <TodoPopup
          onSubmit={this.addTodo}
          onDocumentClick={this.closePopup}
        />
      );
    }

    return (
      <div className="app">
        <TodoAddButton onClick={this.openPopup} />
        <TodoList
          todos={this.state.todosById}
          onTodoRemove={this.removeTodo}
        />

        { popup }
      </div>
    );
  }
}

export default App;
