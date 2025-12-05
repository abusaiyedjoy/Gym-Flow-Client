"use client";

import { useState } from "react";
import { User, Mail, Phone, Lock, Bell, Shield, Trash2, Check, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/shared/PageComponents";

interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    newClientAlerts: boolean;
    sessionReminders: boolean;
    paymentNotifications: boolean;
    reviewAlerts: boolean;
}

export default function TrainerSettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [notifications, setNotifications] = useState<NotificationSettings>({
        emailNotifications: true,
        smsNotifications: true,
        newClientAlerts: true,
        sessionReminders: true,
        paymentNotifications: true,
        reviewAlerts: true,
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
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your personal details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="David" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Martinez" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        defaultValue="david.martinez@gym.com"
                                        className="pl-10"
                                    />
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
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    rows={4}
                                    defaultValue="Certified personal trainer with 8 years of experience in strength training and body transformation."
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

                {/* Professional Settings */}
                <TabsContent value="professional" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Professional Information</CardTitle>
                            <CardDescription>
                                Update your professional details and credentials
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="specialization">Specialization</Label>
                                <Input
                                    id="specialization"
                                    defaultValue="Strength Training, Weight Loss, Muscle Gain"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="experience">Years of Experience</Label>
                                    <Input id="experience" type="number" defaultValue="8" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="hourlyRate"
                                            type="number"
                                            defaultValue="80"
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="certifications">Certifications</Label>
                                <Textarea
                                    id="certifications"
                                    rows={3}
                                    placeholder="List your certifications, one per line"
                                    defaultValue="NASM Certified Personal Trainer
Precision Nutrition Level 1
CrossFit Level 2 Trainer"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Availability</Label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                    ].map((day) => (
                                        <div key={day} className="flex items-center space-x-2">
                                            <Checkbox id={day} defaultChecked={day !== "Sunday"} />
                                            <Label htmlFor={day} className="text-sm font-normal">
                                                {day.slice(0, 3)}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSaveProfile} disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security Settings */}
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

                {/* Notification Settings */}
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
                                    <h4 className="font-semibold">Alert Types</h4>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>New Client Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when a new client signs up
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.newClientAlerts}
                                            onCheckedChange={() =>
                                                toggleNotification("newClientAlerts")
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Session Reminders</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get reminded about upcoming sessions
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.sessionReminders}
                                            onCheckedChange={() =>
                                                toggleNotification("sessionReminders")
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Payment Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified about payments received
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.paymentNotifications}
                                            onCheckedChange={() =>
                                                toggleNotification("paymentNotifications")
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Review Alerts</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when you receive new reviews
                                            </p>
                                        </div>
                                        <Checkbox
                                            checked={notifications.reviewAlerts}
                                            onCheckedChange={() =>
                                                toggleNotification("reviewAlerts")
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

                {/* Privacy Settings */}
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
                                            Make your profile visible in trainer directory
                                        </p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Statistics</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Display your stats on public profile
                                        </p>
                                    </div>
                                    <Checkbox defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Allow Messages</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Let potential clients message you
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
