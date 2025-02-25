const Slider = ({ label, ...props }) => {
  return (
    <div className="flex">
      <p className="text-xs text-center">{label}</p>
      <input
        type="range"
        {...props}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
      />
    </div>
  );
};

export default Slider;
