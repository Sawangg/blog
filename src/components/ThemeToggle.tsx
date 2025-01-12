"use client";

import { Button, type ButtonProps } from "@ui/Button";

export const ThemeToggle: React.FC<ButtonProps> = ({ children }) => (
  <Button
    onPress={() => (localStorage.theme === "dark" ? window.theme.setTheme("light") : window.theme.setTheme("dark"))}
    aria-label="Theme Toggle"
    plain
  >
    {children}
  </Button>
);
