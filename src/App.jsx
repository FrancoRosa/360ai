import { useEffect, useState } from "react";
import Cam from "./components/CamDetection";
import GPS from "./components/GPS";
import Config from "./components/Config";
import useLocal from "./js/storage";
import Navigation from "./components/Navigation";
import { io } from "socket.io-client";
import Button from "./components/elements/Button";
import { addEvent, getDayEvents } from "./js/inDB";
import ZoomableTimeline from "./components/ZoomableTimeLine";
function App() {
  const resolution = {
    // width: 1280,
    // height: 720,
    width: 640,
    height: 480,
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

  const [person, setPerson] = useState(false);
  let start = new Date();
  let counter = 0;
  let activeCount = 0;
  let running = false;
  const minSpeed = 2;
  const minCount = 5;
  let speeds = [];
  let detections = [];
  const data = [
    {
      start: "22:34:28",
      end: "22:34:50",
      speeds: [
        2.3, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 1, 1, 5.3, 5.3, 5.3, 5.3, 5.3,
        5.3, 5.3, 0.4, 0, 0, 0, 0,
      ],
      detections: [
        false,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
      ],
    },
    {
      start: "22:35:57",
      end: "22:36:26",
      speeds: [
        6.2, 6.2, 6.2, 6.2, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1,
        7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 7.1, 0, 0, 0, 0, 0,
      ],
      detections: [
        true,
        true,
        true,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
    },
  ];

  useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("gpsData", (data) => {
      const { speed, person } = data;
      setGPS(data);
      if (speed >= minSpeed) {
        counter = 0;
        if (!running) {
          start = new Date();
          speeds = [];
          detections = [];
          running = true;
          console.log("... start");
        }
      }

      if (speed < minSpeed && running) {
        counter++;
        if (counter > minCount) {
          running = false;
          const end = new Date();
          console.log("... end");
          addEvent({
            date: start.toLocaleDateString("sv"),
            start: start.toLocaleTimeString("sv"),
            end: end.toLocaleTimeString("sv"),
            speeds,
            detections,
          });
        }
      }

      if (running) {
        speeds.push(speed);
        detections.push(person);
      }
    });

    return () => {
      socket.off("gpsData");
    };
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

      {page !== "reports" && (
        <Cam {...{ resolution, lines, page, config, setPerson }} />
      )}
      <ZoomableTimeline data={data} />
      <Navigation {...{ page, setPage }} />
      <div className="flex flex-around gap-4">
        <Button
          label="Read"
          onClick={() => {
            const date = new Date().toLocaleDateString("sv");
            console.log(getDayEvents(date));
          }}
        />
      </div>
    </div>
  );
}

export default App;
