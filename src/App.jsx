import { useState } from "react";
import Cam from "./components/CamDetection";
import Controls from "./components/Controls";
import GPS from "./components/GPS";
import Config from "./components/Config";
import useLocal from "./js/storage";
import Navigation from "./components/Navigation";

function App() {
  const resolution = {
    width: 640,
    height: 360,
  };
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

  return (
    <div className=" h-screen text-slate-900 bg-slate-400 dark:text-lime-400 dark:bg-slate-900 text-sm flex flex-col justify-around items-center">
      <div className="flex justify-around">
        {page === "main" && (
          <>
            <Controls />
            <GPS />
          </>
        )}
        {page === "config" && (
          <Config {...{ resolution, config, setConfig, lines, setLines }} />
        )}
      </div>

      {page !== "reports" && <Cam {...{ resolution, lines, page, config }} />}
      <Navigation {...{ page, setPage }} />
    </div>
  );
}

export default App;
