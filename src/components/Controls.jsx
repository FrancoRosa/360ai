import Button from "./elements/Button";

const Controls = ({ handleConfig, handleReports }) => {
  return (
    <div className="flex gap-2 items-center">
      <Button onClick={handleReports} label={"Reports"} />
      <Button onClick={handleConfig} label={"Config"} />
    </div>
  );
};
export default Controls;
