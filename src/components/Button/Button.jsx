import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <button type="button" className={css.Button} onClick={onClick}>
    Load more
  </button>
);
Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;
