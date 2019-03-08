import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import translate from '../..//utils/string-translation';

import './Button.css';

export default function Button({ inverseColor, onClick, style, label }) {
  const className = classnames('button', { 'inverseColor': inverseColor });
  return (
    <button className={className} style={style} onClick={onClick}>
      {translate(label)}
    </button>
  );
};


Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  inverseColor: PropTypes.bool,
}

Button.defaultProps = {
  inverseColor: false,
  labe: '',
  style: {},
  onClick: Function.prototype,
}


