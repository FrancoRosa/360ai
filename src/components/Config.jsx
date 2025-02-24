import { useState } from "react";
import Button from "./elements/Button";
import Select from "./elements/Select";
import Slider from "./elements/Slider";

const Config = ({ config, setConfig, handleBack }) => {
  const [beep, setBeep] = useState(true);
  const [od, setOd] = useState(true);
  const [upTh, setUpTh] = useState(20);
  const [dnTh, setDnTh] = useState(5);
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-4">
        <Select
          label="Beep:"
          value={beep}
          onChange={(e) => setBeep(e.target.value)}
        />
        <Select
          label="Detect:"
          value={od}
          onChange={(e) => setOd(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Slider
          label="Top Threshold"
          min={0}
          max={30}
          step={1}
          value={upTh}
          onChange={(e) => {
            setUpTh(e.target.value);
            console.log(e.target.value);
          }}
        />
        <Slider
          label="Bottom Threshold"
          min={0}
          max={30}
          step={1}
          value={dnTh}
          onChange={(e) => {
            setDnTh(e.target.value);
            console.log(e.target.value);
          }}
        />
        <Button onClick={handleBack} label="Return" />
      </div>
    </div>
  );
};
export default Config;
