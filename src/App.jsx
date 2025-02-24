import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Theme from "./components/Theme";
import Button from "./components/elements/Button";
import Config from "./components/Config";

function App() {
  const [status, setStatus] = useState("safe");
  const [page, setPage] = useState("main"); //main, config, reports
  const [config, setConfig] = useState({}); //main, config, reports

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
            config={config}
            setConfig={setConfig}
            handleBack={handleBack}
          />
        )}
        {page === "reports" && (
          <>
            <Button onClick={handleBack}>Return</Button>
          </>
        )}
      </div>
      <Cam status={status} />
      <Theme />
    </div>
  );
}

export default App;
