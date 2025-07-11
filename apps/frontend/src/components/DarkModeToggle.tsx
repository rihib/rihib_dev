'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';

export default function DarkModeToggle() {
  const { isDark, mounted, toggleTheme } = useTheme();

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        disabled
        aria-label="Loading theme toggle"
      >
        <Moon size={16} />
        <span className="text-sm font-medium">Theme</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="flex items-center space-x-2"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>
    </Button>
  );
}
