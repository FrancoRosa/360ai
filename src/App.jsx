import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Theme from "./components/Theme";
import Button from "./components/elements/Button";
import Config from "./components/Config";

function App() {
  const resolution = {
    width: 640,
    height: 360,
  };
  const [status, setStatus] = useState("safe");
  const [page, setPage] = useState("main"); //main, config, reports
  const [config, setConfig] = useState({}); //main, config, reports
  const [lines, setLines] = useState({
    vt1: 20,
    vt2: 30,
    ht: 40,
    vb1: 50,
    vb2: 60,
    hb: 70,
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
  const handleStatus = () => {
    console.log(status);

    switch (status) {
      case "safe":
        setStatus("warning");
        break;
      case "warning":
        setStatus("danger");
        break;
      case "danger":
        setStatus("safe");
        break;

      default:
        setStatus("safe");
        break;
    }
  };

  return (
    <div className="text-slate-900 bg-slate-400 dark:text-slate-400 dark:bg-slate-900">
      <div className="flex justify-around ">
        {page === "main" && (
          <>
            <Controls
              status={status}
              handleConfig={handleConfig}
              handleReports={handleReports}
              handleStatus={handleStatus}
            />
            <GPS status={status} />
          </>
        )}
        {page === "config" && (
          <Config
            resolution={resolution}
            config={config}
            setConfig={setConfig}
            handleBack={handleBack}
            lines={lines}
            setLines={setLines}
          />
        )}
        {page === "reports" && (
          <>
            <Button onClick={handleBack}>Return</Button>
          </>
        )}
      </div>
      <Cam resolution={resolution} status={status} lines={lines} />
      <Theme />
    </div>
  );
}

export default App;
