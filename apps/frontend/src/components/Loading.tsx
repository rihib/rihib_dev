'use client';

import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ICON_SIZE_MAP } from '@/lib/constants';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function Loading({ className = '', size = 'md', text = 'Loading...' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex items-center space-x-2">
        <Loader2 className="animate-spin" size={ICON_SIZE_MAP[size]} />
        {text && <span className="text-muted-foreground">{text}</span>}
      </div>
    </div>
  );
}

export function LoadingCard({ text = 'Loading...' }: { text?: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <Loading text={text} />
      </CardContent>
    </Card>
  );
}

export function LoadingPage({ text = 'Loading page...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading size="lg" text={text} />
    </div>
  );
}
