const Button = (props) => {
  const { onClick, children, ...rest } = props;

  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <button onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
