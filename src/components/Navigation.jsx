import Button from "./elements/Button";
import Theme from "./Theme";

const Navigation = ({ page, setPage }) => {
  return (
    <div className="flex justify-between w-full py-2">
      <div className="flex justify-around">
        {page === "main" ? (
          <div className="flex gap-1">
            <Button onClick={() => setPage("reports")} label={"Reports"} />
            <Button onClick={() => setPage("config")} label={"Config"} />
          </div>
        ) : (
          <Button onClick={() => setPage("main")} label="Return" />
        )}
      </div>
      <Theme />
    </div>
  );
};
export default Navigation;
