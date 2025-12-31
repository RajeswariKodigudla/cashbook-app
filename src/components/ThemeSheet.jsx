import { useState } from "react";
import { getTheme, setTheme } from "../utils/theme";

export default function ThemeSheet({ onClose }) {
  const [theme, setThemeState] = useState(getTheme());

  const select = (val) => {
    setThemeState(val);
    setTheme(val);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sort-sheet" onClick={(e) => e.stopPropagation()}>
        <h3>App Theme</h3>

        <label>
          <input
            type="radio"
            checked={theme === "light"}
            onChange={() => select("light")}
          />
          Light
        </label>

        <label>
          <input
            type="radio"
            checked={theme === "dark"}
            onChange={() => select("dark")}
          />
          Dark
        </label>

        <label>
          <input
            type="radio"
            checked={theme === "system"}
            onChange={() => select("system")}
          />
          System Default
        </label>
      </div>
    </div>
  );
}
