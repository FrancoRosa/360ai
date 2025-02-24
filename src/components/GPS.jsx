import { useEffect, useState } from "react";

const Indicator = ({ label, value, unit }) => (
  <div className="text-center">
    <p className="text-xs ">{label}</p>
    <h3 className="text-2xl ">{value}</h3>
    <p className="text-xs ">{unit}</p>
  </div>
);

const GPS = () => {
  const [gps, setGps] = useState({
    height: 100,
    bearing: 45,
    speed: 100,
  });

  useEffect(() => {
    const plusOrMinus = () => (Math.random() < 0.5 ? -1 : 1);
    const interval1 = setInterval(() => {
      setGps((s) => ({
        height: s.height + Math.floor(Math.random() * 1000 * plusOrMinus()),
        bearing: s.bearing + Math.floor(Math.random() * 10 * plusOrMinus()),
        speed: s.speed + Math.floor(Math.random() * 10 * plusOrMinus()),
      }));
    }, 3000);
    return () => clearInterval(interval1);
  }, []);

  return (
    <div className="flex gap-4">
      <Indicator label="Height" value={gps.height} unit="ft ASL" />
      <Indicator label="Bearing" value={gps.bearing} unit="degrees" />
      <Indicator label="Speed" value={gps.speed} unit="mph" />
    </div>
  );
};
export default GPS;
