
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface MemberGrowthChartProps {
  data: Array<{ month: string; count: number }>;
}

export function MemberGrowthChart({ data }: MemberGrowthChartProps) {
  const formattedData = data.map((item) => ({
    month: format(new Date(item.month), "MMM yyyy"),
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Growth</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly member registrations
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}