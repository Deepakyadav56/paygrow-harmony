
import React from 'react';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ThemeSelector } from "@/components/ui/theme-selector";

export function ThemeControls() {
  return (
    <div className="flex items-center gap-2">
      <ThemeSelector />
      <ThemeToggle />
    </div>
  );
}
