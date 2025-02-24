const Button = ({ label, ...props }) => {
  return (
    <button
      {...props}
      className="m-2 px-4 py-2 bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-400 rounded-md"
    >
      {label}
    </button>
  );
};

export default Button;
