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
    <>
      <Theme />
      <Controls
        status={status}
        handleConfig={handleConfig}
        handleReports={handleReports}
      />
      <GPS />
      <Cam />
    </>
  );
}

export default App;
