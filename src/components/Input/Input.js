import React, { Component } from 'react';
import PropTypes from "prop-types";

//Styles
import './Input.css';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.focusField = this.focusField.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e, this.props.inputName, e.target.value);
  }

  focusField(e) {
    if (this.inputRef) {
      this.inputRef.focus();
    }
    this.props.onFocus();
  }

  render() {
    const {
      type,
      label,
      placeholder,
      value,
      multiple,
    } = this.props;
    return (
      <div className="inputField" onClick={this.focusField}>
        <input
          className="input"
          ref={(ref) => this.inputRef = ref}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
          multiple={multiple}
        />
        <label className="label" >{label}</label>
      </div>
    )
  }
}

Input.propTypes = {
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    multiple: PropTypes.bool,
    value: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

Input.defaultProps = {
  onFocus: Function.prototype,
  inputName: '',
  multiple: false,
  type: 'text',
  label: 'Example',
  placeholder: ' ',
}

export default Input;
