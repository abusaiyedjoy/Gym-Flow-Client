"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Shield, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/shared/PageComponents";

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    workoutReminders: boolean;
    classReminders: boolean;
    paymentReminders: boolean;
    promotionalEmails: boolean;
}

export default function MemberSettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: true,
        workoutReminders: true,
        classReminders: true,
        paymentReminders: true,
        promotionalEmails: false,
    });

    const handleSaveProfile = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const handleSavePassword = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const handleSaveNotifications = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const toggleNotification = (key: keyof NotificationSettings) => {
        setNotifications((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Manage your account settings and preferences"
            />

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your profile information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="phone"
                                        type="tel"
                                        defaultValue="+1 234 567 8900"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    defaultValue="123 Main St, New York, NY 10001"
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSaveProfile} disabled={isSaving}>
                                    {isSaving ? (
                                        "Saving..."
                                    ) : (
                                        <>
                                            <Check className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Change Password</CardTitle>
                            <CardDescription>
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSavePassword} disabled={isSaving}>
                                    {isSaving ? "Updating..." : "Update Password"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Two-Factor Authentication</CardTitle>
                            <CardDescription>
                                Add an extra layer of security to your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Two-Factor Authentication</p>
                                    <p className="text-sm text-muted-foreground">
                                        Not enabled
                                    </p>
                                </div>
                                <Button variant="outline">Enable</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notification Preferences</CardTitle>
                            <CardDescription>
                                Choose what notifications you want to receive
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Checkbox
                                        checked={notifications.emailNotifications}
                                        onCheckedChange={() =>
                                            toggleNotification("emailNotifications")
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>SMS Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications via text message
                                        </p>
                                    </div>
                                    <Checkbox
                                        checked={notifications.smsNotifications}
                                        onCheckedChange={() =>
                                            toggleNotification("smsNotifications")
                                        }
                                    />
                                </div>

                                <div className="border-t pt-4 space-y-4">
                                    <h4 className="font-semibold">Reminder Notifications</h4>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Workout Reminders</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get reminded about your workout schedule
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.workoutReminders}
                                            onCheckedChange={() =>
                                                toggleNotification("workoutReminders")
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Class Reminders</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get reminded about upcoming classes
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.classReminders}
                                            onCheckedChange={() =>
                                                toggleNotification("classReminders")
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Payment Reminders</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get reminded about upcoming payments
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.paymentReminders}
                                            onCheckedChange={() =>
                                                toggleNotification("paymentReminders")
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Promotional Emails</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates about new features and offers
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.promotionalEmails}
                                            onCheckedChange={() =>
                                                toggleNotification("promotionalEmails")
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 border-t">
                                <Button onClick={handleSaveNotifications} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save Preferences"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Privacy Settings</CardTitle>
                            <CardDescription>
                                Control your privacy and data settings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Profile Visibility</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Make your profile visible to other members
                                        </p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Progress Photos</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Allow others to see your progress photos
                                        </p>
                                    </div>
                                    <Checkbox />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Activity Status</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Show when you're active in the gym
                                        </p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <Button variant="outline" className="w-full">
                                    <Shield className="h-4 w-4 mr-2" />
                                    Download My Data
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-destructive/50">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                            <CardDescription>
                                Permanently delete your account and all data
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="w-full">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                            <p className="text-sm text-muted-foreground mt-3">
                                This action cannot be undone. All your data will be permanently
                                deleted.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
