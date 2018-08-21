import React from 'react';

// Components


import './TodoPopup.css';

class TodoPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    // For input focus()
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleSubmit(e) {
    e.preventDefault();
    var state = this.state;
    if (state.title === '' || state.desc === '') return alert('Заполните');

    this.props.onSubmit(state);
    
    e.target.reset();
  }

  handleChange(e) {
    var nextState = {};
    // Get data-type attribute value
    nextState[e.target.dataset.type] = e.target.value;

    this.setState(nextState);
  }

  handleDocumentClick(e) {
    if (e.target.closest('.todo-popup')) return;
    this.props.onDocumentClick();
  }

  render() {
    return (
      <div
        className="todo-popup-wrap"
        onClick={this.handleDocumentClick}
        >
        <div className="todo-popup">
          <form className="todo-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="todo-form__input"
              placeholder="Заголовок"
              data-type="title"
              onChange={this.handleChange}
              ref={this.inputRef}
            />
            <input
              type="text"
              className="todo-form__input"
              placeholder="Описание"
              data-type="desc"
              onChange={this.handleChange}
            />
            <button
              className="todo-form__button todo-add-button"
              >Добавить
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoPopup;
