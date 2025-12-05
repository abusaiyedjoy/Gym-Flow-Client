"use client";

import { useState } from "react";
import { Database, HardDrive, Mail, Bell, Shield, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SystemSettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="System Settings"
                description="Configure system-wide settings and preferences"
            />

            {/* System Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Database Size</p>
                                <p className="text-2xl font-bold">2.4 GB</p>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-600/10">
                                <Database className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Storage Used</p>
                                <p className="text-2xl font-bold">12.8 GB</p>
                            </div>
                            <div className="p-3 rounded-lg bg-orange-600/10">
                                <HardDrive className="h-5 w-5 text-orange-600" />
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
                            <div className="p-3 rounded-lg bg-green-600/10">
                                <Clock className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">System Status</p>
                                <Badge className="bg-green-500/10 text-green-500 mt-2">Healthy</Badge>
                            </div>
                            <div className="p-3 rounded-lg bg-primary/10">
                                <Shield className="h-5 w-5 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Database Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Database Configuration</CardTitle>
                    <CardDescription>Manage database connection and optimization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="dbHost">Database Host</Label>
                            <Input id="dbHost" defaultValue="localhost" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dbPort">Port</Label>
                            <Input id="dbPort" defaultValue="5432" disabled />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="dbName">Database Name</Label>
                        <Input id="dbName" defaultValue="gymflow_production" disabled />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <p className="font-medium">Auto-vacuum</p>
                            <p className="text-sm text-muted-foreground">Automatically clean up database</p>
                        </div>
                        <Checkbox defaultChecked />
                    </div>
                    <Button onClick={handleSave} variant="outline">
                        Test Connection
                    </Button>
                </CardContent>
            </Card>

            {/* Backup Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Backup & Recovery</CardTitle>
                    <CardDescription>Configure automated backup schedule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="backupFrequency">Backup Frequency</Label>
                        <Select defaultValue="daily">
                            <SelectTrigger id="backupFrequency">
                                <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="backupTime">Backup Time</Label>
                        <Input id="backupTime" type="time" defaultValue="02:00" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="retentionDays">Retention Period (days)</Label>
                        <Input id="retentionDays" type="number" defaultValue="30" />
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={loading}>
                            {loading ? "Saving..." : "Save Settings"}
                        </Button>
                        <Button variant="outline">Create Backup Now</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Email Templates */}
            <Card>
                <CardHeader>
                    <CardTitle>Email Templates</CardTitle>
                    <CardDescription>Customize automated email templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="templateType">Template Type</Label>
                        <Select defaultValue="welcome">
                            <SelectTrigger id="templateType">
                                <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="welcome">Welcome Email</SelectItem>
                                <SelectItem value="payment">Payment Confirmation</SelectItem>
                                <SelectItem value="renewal">Membership Renewal</SelectItem>
                                <SelectItem value="expiry">Membership Expiry</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emailSubject">Subject</Label>
                        <Input id="emailSubject" defaultValue="Welcome to GymFlow!" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="emailBody">Email Body</Label>
                        <Textarea
                            id="emailBody"
                            rows={6}
                            defaultValue="Hi {{member_name}},\n\nWelcome to GymFlow Fitness Center! We're excited to have you as a member.\n\nYour membership details:\nPlan: {{plan_name}}\nStart Date: {{start_date}}\n\nBest regards,\nGymFlow Team"
                        />
                    </div>
                    <Button onClick={handleSave} disabled={loading}>
                        Save Template
                    </Button>
                </CardContent>
            </Card>

            {/* System Notifications */}
            <Card>
                <CardHeader>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>Configure system alert thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium">Low Storage Alert</p>
                                <p className="text-sm text-muted-foreground">Alert when storage is below 10%</p>
                            </div>
                            <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium">Database Performance</p>
                                <p className="text-sm text-muted-foreground">Monitor slow queries and performance issues</p>
                            </div>
                            <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium">Failed Login Attempts</p>
                                <p className="text-sm text-muted-foreground">Alert after 5 failed login attempts</p>
                            </div>
                            <Checkbox defaultChecked />
                        </div>
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="space-y-1">
                                <p className="font-medium">System Updates</p>
                                <p className="text-sm text-muted-foreground">Notify about available system updates</p>
                            </div>
                            <Checkbox defaultChecked />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Configure security and access controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Input id="sessionTimeout" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                        <Input id="maxLoginAttempts" type="number" defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                        </div>
                        <Checkbox />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                            <p className="font-medium">IP Whitelist</p>
                            <p className="text-sm text-muted-foreground">Restrict admin access to specific IPs</p>
                        </div>
                        <Checkbox />
                    </div>
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save Security Settings"}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
