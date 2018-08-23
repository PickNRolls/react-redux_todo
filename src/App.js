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

    // Strategy

    this.popupMode = this.addTodo;
    this.handlePopupMode = this.handlePopupMode.bind(this);
    this.removeTodo = this.removeTodo.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.openPopup = this.openPopup.bind(this);
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

  handlePopupMode(id) {
    if (id) {
      this.editableTodoId = id;
      this.popupMode = this.editTodo;
    } else {
      this.popupMode = this.addTodo;
    }
    
    this.openPopup();
  }

  removeTodo(id) {
    store.dispatch(todoActions.removeTodo(id));
  }

  // Form strategies

  handleSubmit(data) {
    this.popupMode(data);
  }

  addTodo(data) {
    this.openPopup();
    store.dispatch(todoActions.addTodo(data.title, data.desc));
    this.closePopup();
  }

  editTodo(data) {
    var {title, desc} = data;
    var id = this.editableTodoId;
    store.dispatch(todoActions.editTodo(id, title, desc));
    this.closePopup();
  }

  // Popup methods

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
          onSubmit={this.handleSubmit}
          onDocumentClick={this.closePopup}
        />
      );
    }

    return (
      <div className="app">
        <TodoAddButton onClick={()=>this.handlePopupMode(null, this.addTodo)} />
        <TodoList
          todos={this.state.todosById}
          onTodoRemove={this.removeTodo}
          onTodoEdit={this.handlePopupMode}
        />

        { popup }
      </div>
    );
  }
}

export default App;
