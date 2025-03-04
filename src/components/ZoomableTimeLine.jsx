import React, { useState, useRef, useEffect } from "react";
import Button from "./elements/Button";

const secondsOfDay = (time) => {
  const [h, m, s] = time.split(":").map(Number);
  return h * 3600 + m * 60 + s;
};

const ZoomableTimeline = ({ data }) => {
  const [zoom, setZoom] = useState(1);
  const timelineRef = useRef(null);
  const totalSeconds = 24 * 3600;
  const totalHours = 24;

  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft =
        timelineRef.current.scrollWidth / 2 -
        timelineRef.current.clientWidth / 2;
    }
  }, []);

  const getColor = (second) => {
    for (const entry of data) {
      const startSec = secondsOfDay(entry.start);
      const endSec = secondsOfDay(entry.end);
      if (second >= startSec && second <= endSec) {
        const relativeIndex = second - startSec;
        if (entry.speeds[relativeIndex] > 5) return "bg-red-500";
        if (entry.detections[relativeIndex]) return "bg-orange-500";
        return "bg-green-500";
      }
    }
    return "bg-blue-500";
  };

  return (
    <>
      <div
        ref={timelineRef}
        className="w-full overflow-x-auto border border-gray-400 p-2"
      >
        <div className="relative w-max">
          {/* Hour Labels */}
          <div className="flex text-xs text-gray-700">
            {[...Array(totalHours)].map((_, h) => (
              <div key={h} className="w-[150px] text-center">
                {h.toString().padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {/* Timeline */}
          <div
            className="flex h-10 mt-1"
            style={{ transform: `scaleX(${zoom})`, transformOrigin: "left" }}
          >
            {[...Array(totalSeconds / 60)].map((_, i) => (
              <div
                key={i}
                className={`w-[2px] h-full ${getColor(i * 60)}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        <Button label="+" onClick={() => setZoom(Math.min(zoom * 1.2, 10))} />
        <Button label="-" onClick={() => setZoom(Math.max(zoom / 1.2, 1))} />
      </div>
    </>
  );
};

export default ZoomableTimeline;
