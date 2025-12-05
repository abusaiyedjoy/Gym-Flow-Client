"use client";

import { useState } from "react";
import { Database, Download, Upload, RefreshCw, HardDrive, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const backupHistory = [
  { id: "BKP-001", date: "2024-12-15 02:00 AM", size: "2.4 GB", type: "Automated", status: "Success" },
  { id: "BKP-002", date: "2024-12-14 02:00 AM", size: "2.3 GB", type: "Automated", status: "Success" },
  { id: "BKP-003", date: "2024-12-13 02:00 AM", size: "2.3 GB", type: "Automated", status: "Success" },
  { id: "BKP-004", date: "2024-12-12 10:30 AM", size: "2.2 GB", type: "Manual", status: "Success" },
];

const databaseStats = [
  { table: "members", records: 499, size: "450 MB" },
  { table: "trainers", records: 18, size: "12 MB" },
  { table: "classes", records: 45, size: "8 MB" },
  { table: "payments", records: 1247, size: "180 MB" },
  { table: "attendance", records: 8934, size: "520 MB" },
];

export default function DatabasePage() {
  const [loading, setLoading] = useState(false);

  const handleBackup = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleOptimize = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Database Management"
        description="Backup, restore, and optimize database"
      />

      {/* Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-orange-900 mb-1">Important</h4>
              <p className="text-sm text-orange-800">
                Always create a backup before performing any database operations. Last automated backup was 2 hours ago.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Database Size</p>
                <p className="text-3xl font-bold">2.4 GB</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-600/10">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Records</p>
                <p className="text-3xl font-bold">10,743</p>
              </div>
              <div className="p-3 rounded-lg bg-green-600/10">
                <HardDrive className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Last Backup</p>
                <p className="text-xl font-bold">2 hours ago</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Health Status</p>
                <Badge className="bg-green-500/10 text-green-500 mt-2">Healthy</Badge>
              </div>
              <div className="p-3 rounded-lg bg-green-600/10">
                <RefreshCw className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Database operations and maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button onClick={handleBackup} disabled={loading} className="h-20">
              <div className="flex flex-col items-center gap-2">
                <Download className="h-6 w-6" />
                <span>{loading ? "Creating..." : "Create Backup"}</span>
              </div>
            </Button>
            <Button variant="outline" className="h-20">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-6 w-6" />
                <span>Restore Backup</span>
              </div>
            </Button>
            <Button onClick={handleOptimize} disabled={loading} variant="outline" className="h-20">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-6 w-6" />
                <span>{loading ? "Optimizing..." : "Optimize Database"}</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Database Tables */}
      <Card>
        <CardHeader>
          <CardTitle>Database Tables</CardTitle>
          <CardDescription>Overview of database tables and sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {databaseStats.map((table) => (
              <div key={table.table} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{table.table}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold">{table.records.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-2">records</span>
                    <span className="text-sm text-muted-foreground ml-4">{table.size}</span>
                  </div>
                </div>
                <Progress value={Math.random() * 40 + 30} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>Recent database backups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-600/10">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{backup.id}</p>
                    <p className="text-sm text-muted-foreground">{backup.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{backup.size}</p>
                    <Badge variant="outline" className="text-xs">
                      {backup.type}
                    </Badge>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500">
                    {backup.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Database Configuration</CardTitle>
          <CardDescription>Current database settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Database Type</p>
              <p className="font-semibold">PostgreSQL 15.4</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Host</p>
              <p className="font-semibold">localhost:5432</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Backup Schedule</p>
              <p className="font-semibold">Daily at 2:00 AM</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Retention Period</p>
              <p className="font-semibold">30 days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
