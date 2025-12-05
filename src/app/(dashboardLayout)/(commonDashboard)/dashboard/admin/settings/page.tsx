"use client";

import { useState } from "react";
import { Settings, Building2, Bell, Plug } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/shared/PageComponents";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage gym settings and preferences"
            />

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="profile">
                        <Settings className="h-4 w-4 mr-2" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="business">
                        <Building2 className="h-4 w-4 mr-2" />
                        Business Info
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="h-4 w-4 mr-2" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="integrations">
                        <Plug className="h-4 w-4 mr-2" />
                        Integrations
                    </TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Admin Profile</CardTitle>
                            <CardDescription>Update your personal information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Admin" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" defaultValue="admin@gymflow.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" defaultValue="+1 (555) 123-4567" />
                            </div>
                            <Button onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>Update your password regularly</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <Button onClick={handleSave} disabled={loading}>
                                Update Password
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Business Info Tab */}
                <TabsContent value="business" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Gym Information</CardTitle>
                            <CardDescription>Manage your gym's business details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gymName">Gym Name</Label>
                                <Input id="gymName" defaultValue="GymFlow Fitness Center" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" defaultValue="123 Fitness Street, New York, NY 10001" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="businessPhone">Phone</Label>
                                    <Input id="businessPhone" defaultValue="+1 (555) 987-6543" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="businessEmail">Email</Label>
                                    <Input id="businessEmail" defaultValue="info@gymflow.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    rows={4}
                                    defaultValue="A premium fitness center offering state-of-the-art equipment, expert trainers, and a variety of classes."
                                />
                            </div>
                            <Button onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Operating Hours</CardTitle>
                            <CardDescription>Set your gym's operating schedule</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { day: "Monday - Friday", hours: "5:00 AM - 11:00 PM" },
                                { day: "Saturday", hours: "6:00 AM - 9:00 PM" },
                                { day: "Sunday", hours: "7:00 AM - 8:00 PM" },
                            ].map((schedule) => (
                                <div key={schedule.day} className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>{schedule.day}</Label>
                                    </div>
                                    <div className="space-y-2">
                                        <Input defaultValue={schedule.hours} />
                                    </div>
                                </div>
                            ))}
                            <Button onClick={handleSave} disabled={loading}>
                                Save Hours
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>Manage your email notification preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { id: "newMember", label: "New Member Registration", description: "Get notified when new members join" },
                                { id: "payment", label: "Payment Received", description: "Notifications for successful payments" },
                                { id: "lowAttendance", label: "Low Class Attendance", description: "Alert when class attendance is below threshold" },
                                { id: "feedback", label: "Member Feedback", description: "New feedback and reviews from members" },
                            ].map((notification) => (
                                <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <p className="font-medium">{notification.label}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Push Notifications</CardTitle>
                            <CardDescription>Manage browser push notification settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { id: "urgentAlerts", label: "Urgent Alerts", description: "Critical system alerts and issues" },
                                { id: "dailySummary", label: "Daily Summary", description: "Daily summary of gym activities" },
                            ].map((notification) => (
                                <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <p className="font-medium">{notification.label}</p>
                                        <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Integrations Tab */}
                <TabsContent value="integrations" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Integrations</CardTitle>
                            <CardDescription>Connect payment processing services</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: "Stripe", status: "Connected", description: "Credit card and online payments" },
                                { name: "PayPal", status: "Not Connected", description: "PayPal payment processing" },
                            ].map((integration) => (
                                <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <p className="font-medium">{integration.name}</p>
                                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                                    </div>
                                    <Button variant={integration.status === "Connected" ? "outline" : "default"}>
                                        {integration.status === "Connected" ? "Disconnect" : "Connect"}
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Email Service</CardTitle>
                            <CardDescription>Configure email delivery service</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="emailProvider">Email Provider</Label>
                                <Input id="emailProvider" defaultValue="SendGrid" disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apiKey">API Key</Label>
                                <Input id="apiKey" type="password" defaultValue="sk_test_************************" />
                            </div>
                            <Button onClick={handleSave} disabled={loading}>
                                Test Connection
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
