const Button = (props) => {
  return (
    <button
      {...props}
      className="px-4 py-2 dark:bg-blue-500 dark:text-white rounded-md"
    >
      {props.children}
    </button>
  );
};

export default Button;
