import Line from "./Line";
const Area = ({ resolution, pos, top = true }) => {
  const { x1, x2, y } = pos;
  return (
    <div
      className={`absolute opacity-20 border-white z-10 
        ${top ? "bg-fuchsia-600" : "bg-cyan-600"} `}
      style={{
        top: y,
        left: x1,
        width: x2 - x1,
        height: resolution.height / 2 - y,
      }}
    ></div>
  );
};

const Lines = ({
  resolution,
  lines = {
    vt1: 20,
    vt2: 30,
    ht: 40,
    vb1: 50,
    vb2: 60,
    hb: 70,
  },
}) => {
  const { vt1, vt2, ht, vb1, vb2, hb } = lines;
  return (
    <>
      <Line resolution={resolution} pos={vt1} vertical={true} top={true} />
      <Line resolution={resolution} pos={vt2} vertical={true} top={true} />
      <Line resolution={resolution} pos={ht} vertical={false} top={true} />
      <Area
        resolution={resolution}
        pos={{ x1: vt1, x2: vt2, y: ht }}
        top={true}
      />
      <Line resolution={resolution} pos={vb1} vertical={true} top={false} />
      <Line resolution={resolution} pos={vb2} vertical={true} top={false} />
      <Line resolution={resolution} pos={hb} vertical={false} top={false} />
      <Area
        resolution={resolution}
        pos={{ x1: vb1, x2: vb2, y: hb }}
        top={false}
      />
    </>
  );
};
export default Lines;
