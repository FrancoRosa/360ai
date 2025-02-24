import { useEffect, useState } from "react";

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
      <button onClick={handleLight}>Light</button>
      <button onClick={handleDark}>Dark</button>
    </div>
  );
};
export default Theme;
