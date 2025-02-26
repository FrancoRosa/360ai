import { useEffect, useState } from "react";
import Button from "./elements/Button";

const Theme = () => {
  const [theme, setTheme] = useState(localStorage.theme || "light");

  const handleLight = () => {
    setTheme("light");
  };

  const handleDark = () => {
    setTheme("dark");
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.theme = theme;
  }, [theme]);

  return (
    <div className="flex  w-full justify-end gap-1 p-2">
      <Button label="Light" onClick={handleLight} />
      <Button label="Dark" onClick={handleDark} />
    </div>
  );
};
export default Theme;
