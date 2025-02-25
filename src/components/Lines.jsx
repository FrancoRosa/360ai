const Line = ({ resolution, pos, vertical = true }) => {
  return (
    <div
      className={`absolute bg-lime-400 border-solid border-1 border-white z-10`}
      style={{
        top: vertical ? 0 : pos,
        width: vertical ? "5px" : resolution.width,
        left: vertical ? pos : 0,
        height: vertical ? resolution.height : "5px",
      }}
    ></div>
  );
};
const Lines = ({ resolution }) => {
  return (
    <>
      <Line resolution={resolution} pos={10} vertical={true} />
      <Line resolution={resolution} pos={60} vertical={true} />
      <Line resolution={resolution} pos={100} vertical={false} />
      <Line resolution={resolution} pos={150} vertical={false} />
    </>
  );
};
export default Lines;
