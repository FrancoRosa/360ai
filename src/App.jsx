import { useEffect, useState } from "react";
import Cam from "./components/CamDetection";
import GPS from "./components/GPS";
import Config from "./components/Config";
import useLocal from "./js/storage";
import Navigation from "./components/Navigation";
import { io } from "socket.io-client";
function App() {
  const resolution = {
    width: 1280,
    height: 720,
  };
  const [page, setPage] = useState("main"); //main, config, reports
  const [config, setConfig] = useLocal("config", {
    beep: true,
    detection: true,
  });
  const [gps, setGPS] = useState({});
  const [lines, setLines] = useLocal("lines", {
    vt1: resolution.width / 4,
    vt2: (3 * resolution.width) / 4,
    ht: resolution.height / 4,
    vb1: resolution.width / 4,
    vb2: (3 * resolution.width) / 4,
    hb: (3 * resolution.height) / 4,
  });

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("gpsData", (data) => {
      setGPS(data);
    });

    // Handle connection errors
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });
  }, []);

  return (
    <div className=" h-screen text-slate-900 bg-slate-400 dark:text-lime-400 dark:bg-slate-900 text-sm flex flex-col justify-around items-center">
      <div className="flex justify-around">
        {page === "main" && (
          <>
            <GPS {...{ gps }} />
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
