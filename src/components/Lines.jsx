import Line from "./Line";

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
      <Line resolution={resolution} pos={vb1} vertical={true} top={false} />
      <Line resolution={resolution} pos={vb2} vertical={true} top={false} />
      <Line resolution={resolution} pos={hb} vertical={false} top={false} />
    </>
  );
};
export default Lines;
