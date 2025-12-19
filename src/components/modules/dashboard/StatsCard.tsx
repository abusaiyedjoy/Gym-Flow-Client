
"use client";

import { Card, CardContent } from "@/components/ui/card";
import * as Icons from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  iconName: string; // ✅ Icon name as string
  color: string;
  bgColor: string;
}

export function StatsCard({
  title,
  value,
  change,
  iconName,
  color,
  bgColor,
}: StatsCardProps) {
  // ✅ Client Component এ icon dynamically load করুন
  const Icon = (Icons as any)[iconName] || Icons.HelpCircle;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold">{value}</p>
            <p className={`text-xs sm:text-sm ${color}`}>{change}</p>
          </div>
          <div className={`p-2 sm:p-3 rounded-lg ${bgColor}`}>
            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${color}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}