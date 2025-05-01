
import React from "react";
import { Check, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme, themes, ThemeName } from "@/contexts/ThemeContext";

export function ThemeSelector() {
  const { themeName, setThemeName } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full flex items-center gap-2 px-3"
          title="Select color theme"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(themes).map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setThemeName(theme.name)}
          >
            <div 
              className="h-4 w-4 rounded-full" 
              style={{ backgroundColor: theme.colors.primary }}
            />
            <span>{theme.label}</span>
            {themeName === theme.name && <Check className="h-4 w-4 ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
