import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonExpandable = ({ icon, text, id, btnClass, className, onClick, align, type, size, ...otherProps }) => {
  let iconElement = <></>;
  if (typeof icon === 'string') {
    iconElement = <FontAwesomeIcon icon={icon} className="fa-fw mx-1" />;
  } else {
    iconElement = icon;
  }

  return (
    <button
      type={type}
      className={`btn btn-expandable btn-${btnClass} ${size !== null ? `btn-${size}` : ''} btn-expandable-${align} ${className}`}
      id={id}
      onClick={onClick}
      {...otherProps}>
      {align === 'right' ? (
        <>
          {iconElement}
          <span>{text}</span>
        </>
      ) : (
        <>
          <span>{text}</span>
          {iconElement}
        </>
      )}
    </button>
  );
};

ButtonExpandable.propTypes = {
  id: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  btnClass: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']).isRequired,
  size: PropTypes.oneOf(['sm', 'lg']),
  onClick: PropTypes.func.isRequired,
};

ButtonExpandable.defaultProps = {
  id: null,
  align: 'left',
  type: 'button',
  size: null,
  text: null,
};

export default ButtonExpandable;
