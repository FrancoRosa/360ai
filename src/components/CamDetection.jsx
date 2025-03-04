import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line no-unused-vars
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { drawRect } from "../js/rectangles";
import Lines from "./Lines";
import beep from "../js/beep";
import { checkIntersections } from "../js/helpers";
import ROI from "./elements/ROI";

const Cam = ({ resolution, lines, config, page, setPerson }) => {
  const { vt1, vt2, ht, vb1, vb2, hb } = lines;
  const { width, height } = resolution;
  const rois = [
    [vt1, ht, vt2, height / 2],
    [vb1, hb, vb2, height],
  ];
  const [coco, setCoco] = useState(false);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState();
  const [status, setStatus] = useState([false, false]);
  const webcamRef = useRef();
  const canvasRef = useRef();

  const style = {
    position: "relative",
    zIndex: 0,
    width,
    height,
  };

  const handleChange = (e) => {
    setDeviceId(e.target.value);
  };

  useEffect(() => {
    cocossd.load().then((res) => {
      console.log("... coco loaded");
      setCoco(res);
    });
  }, []);

  useEffect(() => {
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
        if (config.detection) {
          const obj = await net.detect(video);

          const intersections = checkIntersections(obj, rois);
          setStatus(intersections);
          setPerson(intersections[0] || intersections[1]);
          if (intersections.some((i) => i) && config.beep) {
            beep();
          }
          if (obj.map((o) => o.class).some((e) => e === "person")) {
            const ctx = canvasRef.current.getContext("2d");
            drawRect(obj, ctx);
          }
        }
      }
    };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coco, config, lines]);

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
            <option key={i} value={d.deviceId}>
              {`${i + 1}-${d.label.split("(")[0]}`}
            </option>
          ))}
        </select>

        <div style={style}>
          <Webcam
            ref={webcamRef}
            style={{ position: "absolute", top: 0 }}
            videoConstraints={{
              deviceId,
              ...resolution,
            }}
          />
          <ROI resolution={resolution} top={true} warning={status[0]} />
          <ROI resolution={resolution} top={false} warning={status[1]} />
          <canvas ref={canvasRef} style={{ position: "absolute", top: 0 }} />
          {page === "config" && <Lines resolution={resolution} lines={lines} />}
        </div>
      </div>
    </>
  );
};

Cam.propTypes = {
  resolution: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  lines: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
};

export default Cam;
