import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ButtonRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      btnClass: props.btnClass,
      choices: props.choices,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
  }

  onInputChange(event) {
    console.log('CHANGE!');
  }

  onInputClick(event) {
    console.log('CLICK!');
  }

  render() {
    const { id, onChange } = this.props;
    const { value, btnClass, choices } = this.state;
    const { onInputChange } = this;

    return (
      <div className="btn-group btn-group-toggle" data-toggle="buttons">
        {choices.map((choice, index) => (
          <label
            key={choice.value}
            className={`btn btn-${btnClass} ${choice.value === value ? 'active' : ''}`}
            htmlFor={`${id}_${index}`}
          >
            <input
              type="radio"
              id={`${id}_${index}`}
              name={id}
              value={choice.value}
              onChange={onInputChange}
              autoComplete="off"
              checked={choice.value === value}
            />
            {choice.text}
          </label>
        ))}
      </div>
    );
  }
}

ButtonRadio.propTypes = {
  id: PropTypes.string.isRequired,
  btnClass: PropTypes.oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'link',
  ]),
  value: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
    }),
  ).isRequired,
  onChange: PropTypes.func,
};
ButtonRadio.defaultProps = {
  btnClass: 'primary',
  value: '',
  onChange: () => {},
};

export default ButtonRadio;
