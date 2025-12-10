"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2, Save, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageHeader } from "@/components/shared/PageComponents";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserService } from "@/services/user/user.service";
import { UserInfo } from "@/types/userInfo";
import { toast } from "sonner";

export default function EditProfilePage() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    // Fetch user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getUserInfo();

                if (!data) {
                    setError("Failed to load user information");
                    return;
                }

                setUserInfo(data);
                setFormData({
                    name: data.name || "",
                    phone: data.phone || "",
                });
            } catch (err: any) {
                console.error("Error fetching user info:", err);
                setError(err.message || "Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle avatar upload
    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !userInfo) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select a valid image file");
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size should be less than 5MB");
            return;
        }

        try {
            setUploadingAvatar(true);
            const result = await UserService.uploadAvatar(userInfo.id, file);

            // Update local state
            setUserInfo((prev) => prev ? { ...prev, profileImage: result.url } : null);
            toast.success("Profile picture updated successfully!");
        } catch (err: any) {
            console.error("Error uploading avatar:", err);
            toast.error(err.message || "Failed to upload profile picture");
        } finally {
            setUploadingAvatar(false);
        }
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userInfo) return;

        // Validate form
        if (!formData.name.trim()) {
            toast.error("Name is required");
            return;
        }

        try {
            setSaving(true);

            await UserService.updateUserProfile(userInfo.id, {
                name: formData.name.trim(),
                phone: formData.phone.trim() || undefined,
            });

            toast.success("Profile updated successfully!");
            router.push("/dashboard/member/profile");
        } catch (err: any) {
            console.error("Error updating profile:", err);
            toast.error(err.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error || !userInfo) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <p className="text-red-600 font-semibold">Failed to load profile</p>
                    <p className="text-muted-foreground">{error || "User not found"}</p>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Edit Profile"
                description="Update your personal information"
            />

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            Update your name, phone number, and profile picture
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Avatar Section */}
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={userInfo.profileImage || ""} alt={userInfo.name} />
                                    <AvatarFallback className="text-2xl">
                                        {userInfo.name.split(" ").map((n: string) => n[0]).join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    type="button"
                                    size="icon"
                                    variant="secondary"
                                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploadingAvatar}
                                >
                                    {uploadingAvatar ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Camera className="h-4 w-4" />
                                    )}
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarUpload}
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold">{userInfo.name}</h3>
                                <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Click the camera icon to change your profile picture
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Full Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Email (Read-only) */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    value={userInfo.email}
                                    disabled
                                    className="bg-muted"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Email cannot be changed
                                </p>
                            </div>

                            {/* User ID (Read-only) */}
                            <div className="space-y-2">
                                <Label htmlFor="userId">User ID</Label>
                                <Input
                                    id="userId"
                                    value={userInfo.id}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                disabled={saving}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>
                            <Button type="submit" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
