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
    <div className="flex gap-2">
      <Button onClick={handleLight}>Light</Button>
      <Button onClick={handleDark}>Dark</Button>
    </div>
  );
};
export default Theme;
