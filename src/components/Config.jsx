import Button from "./elements/Button";
import Select from "./elements/Select";
import Slider from "./elements/Slider";

const Config = ({ resolution, config, setConfig, lines, setLines }) => {
  return (
    <div className="flex justify-between w-full p-3 gap-4">
      <div className="flex flex-col items-start gap-2">
        <Select
          label="Beep:"
          value={config.beep}
          onChange={(e) =>
            setConfig((c) => ({ ...c, beep: e.target.value === "true" }))
          }
        />
        <Select
          label="Detect:"
          value={config.detection}
          onChange={(e) =>
            setConfig((c) => ({ ...c, detection: e.target.value === "true" }))
          }
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <Slider
          label="x1:"
          min={0}
          max={resolution.width / 2}
          step={1}
          value={lines.vt1}
          onChange={(e) => {
            setLines((l) => ({ ...l, vt1: parseInt(e.target.value) }));
          }}
        />
        <Slider
          label="x2:"
          min={resolution.width / 2 + 1}
          max={resolution.width}
          step={1}
          value={lines.vt2}
          onChange={(e) => {
            setLines((l) => ({ ...l, vt2: parseInt(e.target.value) }));
          }}
        />
        <Slider
          label="y:"
          min={0}
          max={resolution.height / 2}
          step={1}
          value={lines.ht}
          onChange={(e) => {
            setLines((l) => ({ ...l, ht: parseInt(e.target.value) }));
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-1">
        <Slider
          label="x1:"
          min={0}
          max={resolution.width / 2}
          step={1}
          value={lines.vb1}
          onChange={(e) => {
            setLines((l) => ({ ...l, vb1: parseInt(e.target.value) }));
          }}
        />
        <Slider
          label="x2:"
          min={resolution.width / 2 + 1}
          max={resolution.width}
          step={1}
          value={lines.vb2}
          onChange={(e) => {
            setLines((l) => ({ ...l, vb2: parseInt(e.target.value) }));
          }}
        />
        <Slider
          label="y:"
          min={resolution.height / 2}
          max={resolution.height}
          step={1}
          value={lines.hb}
          onChange={(e) => {
            setLines((l) => ({ ...l, hb: parseInt(e.target.value) }));
          }}
        />
      </div>
    </div>
  );
};
export default Config;
