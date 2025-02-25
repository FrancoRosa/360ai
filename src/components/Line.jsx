const Line = ({ resolution, pos, vertical = true, color, top = true }) => {
  return (
    <div
      className={`absolute ${
        top ? "bg-fuchsia-600" : "bg-cyan-600"
      } border-solid border-1 border-white z-10`}
      style={{
        top: vertical ? (top ? 0 : resolution.height / 2) : pos,
        width: vertical ? "5px" : resolution.width,
        left: vertical ? pos : 0,
        height: vertical ? resolution.height / 2 : "5px",
      }}
    ></div>
  );
};
export default Line;
