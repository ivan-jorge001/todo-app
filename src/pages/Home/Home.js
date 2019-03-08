import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import classnames from 'classnames';

// Components
import { DayPickerSingleDateController } from 'react-dates';
import Button from '../../components/Button/Button';
import AddTodo from '../../components/AddTodo/AddTodo';

// Utils
import translate from '../../utils/string-translation';
import { findAllTodosInDate } from '../../utils/todos';

// Actions
import todosAction from '../../actions/todos';

// Images
import emptyCheck from '../../images/emptyCheck.svg';
import fullCheck from '../../images/fullCheck.svg';
import trashBin from '../../images/trashBin.svg';

// Styles
import './Home.css';

class Home extends Component {
  state = {
    date: moment(),
    showCalendar: false,
    createTaskScreen: false,
    noDate: true
  };

  focusCalendar({ showCalendar }) {
    this.setState({ showCalendar });
  }

  onDateChange = (date) => {
    let state = { date };
    if (this.state.createTaskScreen) {
      state = { ...state, noDate: false };
    }

    this.setState({ ...state });
    this.focusCalendar({ showCalendar: false });
  }

  toggleCreateTask = () => {
    this.setState({ createTaskScreen: !this.state.createTaskScreen });
  }

  saveTask = ({ name, noDate, date }) => {
    this.props.todosAction.addTodo({ name, noDate, date });
  }

  toggleActiveTab(todo) {
    if (todo.active) {
      return this.props.todosAction.setInactiveTodo(todo.id, todo.noDate);
    }

    return this.props.todosAction.setActiveTodo(todo.id, todo.noDate);
  }

  removeTodo(todo) {
    this.props.todosAction.removeTodo(todo);
  }

  renderCalendar() {
    if (this.state.showCalendar) {
      const { todosWithDates } = this.props;

      return (
        <div
          className="modal"
          onClick={() => this.focusCalendar({ showCalendar: false })}
        >
          <DayPickerSingleDateController
            date={this.state.date}
            onDateChange={this.onDateChange}
            withPortal
            isDayHighlighted={(date) => findAllTodosInDate(date, todosWithDates).length}
            renderCalendarInfo={() =>
              this.state.createTaskScreen
                ? <Button
                    label={translate('no_dates')}
                    onClick={() => this.setState({ noDate: true, date: moment() })}
                    inverseColor
                    style={{
                      margin: '0 0 20px 20px'
                    }}
                  />
                : <div/>
            }
          />
        </div>
      );
    }

    return <div/>;
  }

  renderCreateTaskButton() {
    return (
      <div className="addButton">
        <Button
          label={translate('plus')}
          onClick={this.toggleCreateTask}
          style={{
            fontSize: 50,
            paddingBottom: '8px',
            width: '80px',
            height: '80px',
            borderRadius: '50%'
          }}
        />
      </div>
    );
  }

  renderItem(todo, idx) {
    const labelClassName = classnames('name', { 'greyOut': todo.active });

    return (
      <div
        className="item" key={`${todo.name}_${todo.id}_${idx}`}
      >
        <div
          className="itemName"
          onClick={() => this.toggleActiveTab(todo)}
        >
          <img
            className="checkMark"
            src={todo.active ? fullCheck : emptyCheck}
            alt="checkmark"
          />
          <label className={labelClassName}>{todo.name}</label>
        </div>
        <img
          className="trashBin"
          src={trashBin}
          alt="trash"
          onClick={() => this.removeTodo(todo)}
        />
      </div>
    );
  }

  renderListOfItem() {
    const { todosWithDates, globalTodos } = this.props;
    const todos = [
      ...findAllTodosInDate(this.state.date, todosWithDates),
      ...globalTodos,
    ];

    return (
      <div className="listOfItem">
        {todos.map((todo, idx) => this.renderItem(todo, idx))}
      </div>
    );
  }

  renderHeader() {
    const { date } = this.state;

    return (
      <div className="header">
        <div
          className="calendar"
          onClick={() => this.focusCalendar({ showCalendar: true })}
        >
          <span className="day">{date.format('DD')}</span>
          <div className="date">
            <span className="month">{date.format('MMM')}</span>
            <span className="year">{date.year()}</span>
          </div>
        </div>
        <span className="dayOfTheWeek is-hidden-mobile">{date.format('dddd')}</span>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        {this.renderCalendar()}

        {this.state.createTaskScreen
          ? (
            <div className="todoList">
              <AddTodo
                onDateFocus={() => this.focusCalendar({ showCalendar: true})}
                date={this.state.date.format('MM/DD/YYYY')}
                onSave={this.saveTask}
                onClose={this.toggleCreateTask}
                noDate={this.state.noDate}
              />
            </div>
          )
        : (
          <div className="todoList">
            {this.renderHeader()}
            {this.renderListOfItem()}
            {this.renderCreateTaskButton()}
          </div>
        )}
      </div>
    );
  }
}

Home.propType = {
  todosAction: PropTypes.func,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      active: PropTypes.bool,
    }),
  ),
};

Home.defaultProps = {
  todosAction: Function.prototype,
  todos: [{
    id: 3,
    name: 'do somehting',
    active: false,
  }],
};

function mapDispatchToProps(dispatch) {
  return {
    todosAction: bindActionCreators(todosAction, dispatch),
  }
};

function mapStateToProps(state) {
  return {
    todosWithDates: state.todos.todosWithDates,
    globalTodos: state.todos.globalTodos,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
