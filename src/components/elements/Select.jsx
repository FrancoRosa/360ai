const Select = ({ label }, props) => {
  return (
    <div className="flex">
      <label>{label}</label>
      <select
        className="border-slite-600 border-solid border-1 rounded-md py-1"
        {...props}
      >
        <option value={true}>On</option>
        <option value={false}>Off</option>
      </select>
    </div>
  );
};

export default Select;
