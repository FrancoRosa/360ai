const Button = ({ label, ...props }) => {
  return (
    <button
      {...props}
      className="my-auto px-3 text-sm py-1 bg-slate-300 text-slate-800 dark:bg-lime-800 dark:text-lime-300 rounded-md"
    >
      {label}
    </button>
  );
};

export default Button;
