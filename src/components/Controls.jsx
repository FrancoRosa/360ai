import Button from "./elements/Button";

const Controls = ({ status, handleConfig, handleReports }) => {
  return (
    <div className="flex items-center">
      <p className="m-2">{status}</p>
      <Button onClick={handleReports}>Reports</Button>
      <Button onClick={handleConfig}>Config</Button>
    </div>
  );
};
export default Controls;
