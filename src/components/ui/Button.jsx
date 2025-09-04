import PropTypes from "prop-types";

const Button = ({
  onClick,
  size = "button-medium",
  color = "primary-green",
  iconClass,
  children,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type="button"
      className={`dp-button ${size} ${color} ${isLoading && "button--loading"} ${iconClass && "button-icon"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {iconClass && <span className={`dpicon ${iconClass}`}></span>}
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
  iconClass: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};
