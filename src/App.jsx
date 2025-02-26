import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Theme from "./components/Theme";
import Button from "./components/elements/Button";
import Config from "./components/Config";
import useLocal from "./js/storage";

function App() {
  const resolution = {
    width: 640,
    height: 360,
  };
  const [status, setStatus] = useState([false, false]);
  const [page, setPage] = useState("main"); //main, config, reports
  const [config, setConfig] = useLocal("config", {
    beep: true,
    detection: true,
  });
  const [lines, setLines] = useLocal("lines", {
    vt1: resolution.width / 4,
    vt2: (3 * resolution.width) / 4,
    ht: resolution.height / 4,
    vb1: resolution.width / 4,
    vb2: (3 * resolution.width) / 4,
    hb: (3 * resolution.height) / 4,
  });
  const handleReports = () => {
    setPage("reports");
  };
  const handleConfig = () => {
    setPage("config");
  };
  const handleBack = () => {
    setPage("main");
  };

  return (
    <div className="text-slate-900 bg-slate-400 dark:text-lime-400 dark:bg-slate-900 text-sm">
      <p className="m-2 text-sm ">{JSON.stringify(status)}</p>
      <div className="flex justify-around ">
        {page === "main" && (
          <>
            <Controls {...{ status, handleConfig, handleReports }} />
            <GPS {...{ status }} />
          </>
        )}
        {page === "config" && (
          <Config
            {...{ resolution, config, setConfig, handleBack, lines, setLines }}
          />
        )}
        {page === "reports" && (
          <>
            <Button onClick={handleBack}>Return</Button>
          </>
        )}
      </div>

      <Cam {...{ resolution, setStatus, lines, page, config }} />
      <Theme />
    </div>
  );
}

export default App;
