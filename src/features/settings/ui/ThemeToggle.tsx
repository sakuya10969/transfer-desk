"use client";

import { useTheme } from "@/features/settings/model/useTheme";
import { Button } from "@/shared/ui";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
    );
  }

  return (
    <Button variant="outline" onClick={toggleTheme} className="cursor-pointer">
      {theme === "light" ? "ダークモード" : "ライトモード"}
    </Button>
  );
}
