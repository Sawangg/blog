// Expand window to add theme support
interface Window {
  theme: {
    setTheme: (theme?: string) => void;
    getTheme: () => string;
    systemTheme: string;
    defaultTheme: string;
  };
}

declare namespace App {
  interface Locals {
    session: import("@lib/session").Session | null;
    user: import("@lib/session").User | null;
  }
}
