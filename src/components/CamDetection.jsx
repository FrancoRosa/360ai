import { useState, useRef, useEffect } from "react";

// eslint-disable-next-line no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../js/rectangles";

const Cam = () => {
  const [coco, setCoco] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState();
  const resolution = {
    width: 640,
    height: 360,
  };
  const webcamRef = useRef();
  const canvasRef = useRef();

  const style = {
    position: "relative",
    zIndex: 0,
    ...resolution,
  };

  const handleChange = (e) => {
    setDeviceId(e.target.value);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const {
        video,
        video: { videoWidth, videoHeight },
      } = webcamRef.current;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    cocossd.load().then((res) => {
      console.log("... coco loaded");
      setCoco(res);
    });
  }, []);

  useEffect(() => {
    let detectInterval;
    if (coco) {
      detectInterval = setInterval(() => {
        detect(coco);
      }, 300);
    } else {
      clearInterval(detectInterval);
    }

    return () => {
      clearInterval(detectInterval);
    };
  }, [coco]);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((res) => {
      const webcams = res.filter(({ kind }) => kind === "videoinput");
      setDevices(webcams);
      if (!webcams.map((w) => w.deviceId).includes(deviceId)) {
        setDeviceId(webcams[0].deviceId);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="text-center mt-4 ">
        <select
          onChange={handleChange}
          value={deviceId}
          className="w-50 border-slite-600 border-solid border-2 rounded-md m-2"
        >
          {devices.map((d, i) => (
            <option
              key={i}
              // selected={deviceId === d.deviceId}
              value={d.deviceId}
            >
              {`${i + 1}-${d.label.split("(")[0]}`}
            </option>
          ))}
        </select>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <div style={style}>
          <Webcam
            ref={webcamRef}
            style={{ position: "absolute", top: 0 }}
            videoConstraints={{
              deviceId,
              ...resolution,
            }}
          />
          <canvas ref={canvasRef} style={{ position: "absolute", top: 0 }} />
        </div>
      </div>
    </>
  );
};

export default Cam;
