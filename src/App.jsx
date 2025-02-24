import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Theme from "./components/Theme";

function App() {
  const [status, setStatus] = useState("Safe");
  const handleReports = () => {
    console.log("...handleReports");
  };
  const handleConfig = () => {
    console.log("...handleConfig");
  };
  return (
    <div className="text-slate-900 bg-slate-400 dark:text-slate-400 dark:bg-slate-900">
      <div className="flex justify-around ">
        <Controls
          status={status}
          handleConfig={handleConfig}
          handleReports={handleReports}
        />
        <GPS />
      </div>
      <Cam />
      <Theme />
    </div>
  );
}

export default App;
