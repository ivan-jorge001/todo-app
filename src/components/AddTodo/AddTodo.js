import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
import Input from '../Input/Input';
import translate from '../../utils/string-translation/translations';
import close from '../../images/close.svg';
import './AddTodo.css';

export default class AddTodo extends Component {
  state = {
    name: '',
  };

  handleChange = (e, inputName, value) => {
    this.setState({ [inputName]: value });
  }

  onSave = () => {
    const { name } = this.state;
    const { date, noDate } = this.props;

    this.props.onSave({ name, noDate, date: moment(date).format('MM/DD/YYYY') });
    this.props.onClose();
  }

  render() {
    return (
      <div className="addTodoContainer">
        <div className="header">
          <img
            className="closeIcon"
            src={close} alt="close"
            onClick={this.props.onClose}
          />
          <span className="title">{translate('create_task')}</span>
          <span className="save" onClick={this.onSave}>{translate('save')}</span>
        </div>
        <Input
          label={translate('task')}
          value={this.state.name}
          inputName="name"
          onChange={this.handleChange}
        />
        <Input
          label={translate('date')}
          value={this.props.noDate ? "" : this.props.date}
          inputName="date"
          onFocus={this.props.onDateFocus}
        />
      </div>
    );
  }
}

AddTodo.propTypes = {
  onDateFocus: PropTypes.func,
  date: PropTypes.string,
  onSave: PropTypes.func,
  noDate: PropTypes.bool,
}

AddTodo.defaultProps = {
  onDateFocus: Function.prototype,
  date: '',
  noDate: true,
  onSave: Function.prototype,
}
