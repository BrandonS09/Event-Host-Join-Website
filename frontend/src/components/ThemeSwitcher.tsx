import React from "react";
import { useTheme } from "./ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa6";
import "../styles/ThemeSwitcher.css";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeSwitcher;
