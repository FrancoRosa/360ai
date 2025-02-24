const Controls = ({ status, handleConfig, handleReports }) => {
  return (
    <div className="flex gap-2">
      <p>{status}</p>
      <button onClick={handleReports}>Reports</button>
      <button onClick={handleConfig}>Config</button>
    </div>
  );
};
export default Controls;
