import { useState } from "react";
import Button from "./elements/Button";
import Select from "./elements/Select";
import Slider from "./elements/Slider";

const Config = ({ config, setConfig, handleBack }) => {
  const [beep, setBeep] = useState(true);
  const [od, setOd] = useState(true);
  const [upTh, setUpTh] = useState(20);
  return (
    <div className="flex justify-between">
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
        <Button onClick={handleBack}>Return</Button>
      </div>

      <div className="flex items-center gap-4">
        <Slider
          label="Upper Threshold"
          min={0}
          max={30}
          step={1}
          value={upTh}
          // onChange={({ target: value }) => {
          //   setUpTh(value);
          //   console.log(value);
          // }}
          onChange={(e) => {
            setUpTh(e.target.value);
            console.log("value");
          }}
        />
      </div>
    </div>
  );
};
export default Config;
