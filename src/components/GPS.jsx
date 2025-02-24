const Indicator = ({ label, value, symbol }) => (
  <div className="text-center">
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

const GPS = () => {
  const gps = {
    height: 100,
    bearing: 45,
    speed: 100,
  };

  return (
    <div className="flex">
      <Indicator label="Height" value={gps.height} />
      <Indicator label="Bearing" value={gps.bearing} />
      <Indicator label="Speed" value={gps.speed} />
    </div>
  );
};
export default GPS;
