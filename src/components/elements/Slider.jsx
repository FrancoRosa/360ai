const Slider = ({ label }, props) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="default-range">{label}</label>
      <input
        id="default-range"
        type="range"
        {...props}
        // onChange={() => console.log("al")}
        // className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

export default Slider;
