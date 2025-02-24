import Button from "./elements/Button";

const Controls = ({ status, handleConfig, handleReports, handleStatus }) => {
  return (
    <div className="flex items-center">
      <p onClick={handleStatus} className="m-2 capitalize">
        {status}
      </p>
      <Button onClick={handleReports}>Reports</Button>
      <Button onClick={handleConfig}>Config</Button>
    </div>
  );
};
export default Controls;
