import { ArrowBigLeft, CogIcon, FileBarChart2Icon } from "lucide-react";
import Button from "./elements/Button";
import Theme from "./Theme";
import PropTypes from "prop-types";
import ButtonIcon from "./elements/ButtonIcon";

const Navigation = ({ page, setPage }) => {
  return (
    <div className="flex justify-between w-full absolute top-0">
      <div className="flex justify-around">
        {page === "main" ? (
          <div className="flex gap-1">
            <ButtonIcon onClick={() => setPage("reports")}>
              <FileBarChart2Icon />
            </ButtonIcon>
            <ButtonIcon onClick={() => setPage("config")}>
              <CogIcon />
            </ButtonIcon>
          </div>
        ) : (
          <ButtonIcon onClick={() => setPage("main")}>
            <ArrowBigLeft />
          </ButtonIcon>
        )}
      </div>
      <Theme />
    </div>
  );
};

Navigation.propTypes = {
  page: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Navigation;
