import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Theme from "./components/Theme";

function App() {
  const [status, setStatus] = useState("safe");
  const handleReports = () => {
    console.log("...handleReports");
  };
  const handleConfig = () => {
    console.log("...handleConfig");
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
        <Controls
          status={status}
          handleConfig={handleConfig}
          handleReports={handleReports}
          handleStatus={handleStatus}
        />
        <GPS status={status} />
      </div>
      <Cam status={status} />
      <Theme />
    </div>
  );
}

export default App;
