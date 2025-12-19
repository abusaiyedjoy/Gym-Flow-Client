
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface AttendanceChartProps {
  data: Array<{ month: string; count: number }>;
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const formattedData = data.map((item) => ({
    month: format(new Date(item.month), "MMM yyyy"),
    count: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Attendance</CardTitle>
        <p className="text-sm text-muted-foreground">
          Member check-ins by month
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
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
            <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}