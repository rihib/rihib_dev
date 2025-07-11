import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function CustomCard({ icon, title, description, className }: CardProps) {
  return (
    <Card
      className={`text-center hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 ${className || ''}`}
    >
      <CardHeader>
        <div className="w-12 h-12 mx-auto mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
