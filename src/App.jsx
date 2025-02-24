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
    <div className=" dark:text-blue-500 dark:bg-white">
      <Theme />
      <Controls
        status={status}
        handleConfig={handleConfig}
        handleReports={handleReports}
      />
      <GPS />
      <Cam />
    </div>
  );
}

export default App;
