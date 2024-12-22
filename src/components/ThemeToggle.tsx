"use client";

import { Button, type ButtonProps } from "@ui/Button";

export const ThemeToggle: React.FC<ButtonProps> = ({ children }) => {
  const handlePress = () => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <Button onPress={handlePress} aria-label="Theme Toggle" plain>
      {children}
    </Button>
  );
};
