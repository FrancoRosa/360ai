const Button = (props) => {
  return (
    <button
      {...props}
      className="m-2 px-4 py-2 bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-400 rounded-md"
    >
      {props.children}
    </button>
  );
};

export default Button;
