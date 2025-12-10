"use client";

import { useEffect, useState } from "react";
import {
    Users,
    Dumbbell,
    DollarSign,
    TrendingUp,
    Calendar,
    Activity,
    UserPlus,
    CreditCard,
    UserCheck,
    UserX,
    Shield,
    Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/PageComponents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { UserService } from "@/services/user/user.service";
import { MemberService } from "@/services/member/member.service";
import { TrainerService } from "@/services/trainer/trainer.service";
import { UserStats } from "@/types/user.types";
import { MemberStatsResponse } from "@/types/member.types";
import { TrainerStats } from "@/types/trainer.types";

// Mock data for charts (keeping these static as requested)
const revenueData = [
    { month: "Jan", revenue: 45000, expenses: 28000, profit: 17000 },
    { month: "Feb", revenue: 52000, expenses: 30000, profit: 22000 },
    { month: "Mar", revenue: 48000, expenses: 29000, profit: 19000 },
    { month: "Apr", revenue: 61000, expenses: 32000, profit: 29000 },
    { month: "May", revenue: 58000, expenses: 31000, profit: 27000 },
    { month: "Jun", revenue: 67000, expenses: 34000, profit: 33000 },
];

const memberGrowthData = [
    { month: "Jan", members: 245, trainers: 12 },
    { month: "Feb", members: 268, trainers: 13 },
    { month: "Mar", members: 292, trainers: 14 },
    { month: "Apr", members: 315, trainers: 15 },
    { month: "May", members: 342, trainers: 16 },
    { month: "Jun", members: 378, trainers: 18 },
];

const membershipDistribution = [
    { name: "Basic", value: 145, color: "#3b82f6" },
    { name: "Premium", value: 158, color: "#ef4444" },
    { name: "Elite", value: 75, color: "#f59e0b" },
];

const attendanceData = [
    { day: "Mon", attendance: 156 },
    { day: "Tue", attendance: 142 },
    { day: "Wed", attendance: 168 },
    { day: "Thu", attendance: 151 },
    { day: "Fri", attendance: 173 },
    { day: "Sat", attendance: 189 },
    { day: "Sun", attendance: 134 },
];

interface RecentActivity {
    id: string;
    type: "member" | "payment" | "class" | "trainer";
    title: string;
    description: string;
    time: string;
    icon: typeof Users;
}

const recentActivities: RecentActivity[] = [
    {
        id: "1",
        type: "member",
        title: "New Member Joined",
        description: "Sarah Johnson registered for Premium plan",
        time: "5 minutes ago",
        icon: UserPlus,
    },
    {
        id: "2",
        type: "payment",
        title: "Payment Received",
        description: "$299 from John Doe - Elite Membership",
        time: "15 minutes ago",
        icon: CreditCard,
    },
    {
        id: "3",
        type: "class",
        title: "Class Completed",
        description: "HIIT Cardio Blast - 18 attendees",
        time: "1 hour ago",
        icon: Activity,
    },
    {
        id: "4",
        type: "trainer",
        title: "Trainer Added",
        description: "Mike Chen joined as Strength Trainer",
        time: "2 hours ago",
        icon: Dumbbell,
    },
];

export default function AdminDashboardPage() {
    // State for API data
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [memberStats, setMemberStats] = useState<MemberStatsResponse | null>(null);
    const [trainerStats, setTrainerStats] = useState<TrainerStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch all stats on component mount
    useEffect(() => {
        const fetchAllStats = async () => {
            try {
                setLoading(true);
                setError(null);

                const [users, members, trainers] = await Promise.allSettled([
                    UserService.getUserStats(),
                    MemberService.getMemberStats(),
                    TrainerService.getTrainerStats(),
                ]);

                if (users.status === "fulfilled") {
                    setUserStats(users.value);
                }

                if (members.status === "fulfilled") {
                    setMemberStats(members.value);
                }

                if (trainers.status === "fulfilled") {
                    // TrainerService returns ApiResponse<TrainerStatsResponse>
                    // TrainerStatsResponse extends ApiResponse<TrainerStats>
                    // So we need to access trainers.value.data.data
                    const trainerResponse = trainers.value as any;
                    setTrainerStats(trainerResponse.data);
                }
            } catch (err: any) {
                console.error("Failed to fetch stats:", err);
                setError(err.message || "Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        fetchAllStats();
    }, []);

    // Calculate dynamic stats from API data
    const stats = [
        {
            title: "Total Users",
            value: userStats?.totalUsers.toString() || "0",
            change: userStats?.recentUsers ? `+${userStats.recentUsers} this week` : "Loading...",
            trend: "up",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Active Members",
            value: memberStats?.activeMembers.toString() || "0",
            change: memberStats?.newMembersThisMonth ? `+${memberStats.newMembersThisMonth} this month` : "Loading...",
            trend: "up",
            icon: UserCheck,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Active Trainers",
            value: trainerStats?.activeTrainers.toString() || "0",
            change: trainerStats ? `${trainerStats.availableTrainers} available` : "Loading...",
            trend: "up",
            icon: Dumbbell,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Total Admins",
            value: userStats?.admins.toString() || "0",
            change: "System administrators",
            trend: "neutral",
            icon: Shield,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

    // Calculate membership distribution from member stats
    const membershipDistributionData = memberStats ? [
        {
            name: "With Plan",
            value: memberStats.membersWithPlan,
            color: "#3b82f6"
        },
        {
            name: "Without Plan",
            value: memberStats.membersWithoutPlan,
            color: "#ef4444"
        },
    ] : membershipDistribution;

    // Calculate member growth data from stats
    const memberGrowthDataCalculated = [
        {
            month: "Current",
            members: memberStats?.totalMembers || 0,
            trainers: trainerStats?.totalTrainers || 0
        },
    ];

    // Calculate user role distribution
    const usersByRoleData = userStats?.usersByRole.map(item => ({
        name: item.role.replace('_', ' '),
        value: item.count,
        color: item.role === 'SUPER_ADMIN' ? '#8b5cf6' :
            item.role === 'ADMIN' ? '#3b82f6' :
                item.role === 'TRAINER' ? '#10b981' : '#f59e0b'
    })) || [];

    // Show loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="text-muted-foreground">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                    <p className="text-red-600 font-semibold">Failed to load dashboard</p>
                    <p className="text-muted-foreground">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                title="Admin Dashboard"
                description="Overview of gym operations and performance"
            />

            {/* Key Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardContent className="pt-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                                    <p className="text-3xl font-bold">{stat.value}</p>
                                    <div className="flex items-center gap-1">
                                        {stat.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                                        <span className="text-sm text-green-600">{stat.change}</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* User Statistics Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>User Overview</CardTitle>
                                <CardDescription>Current system users breakdown</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Users className="h-4 w-4 text-blue-600" />
                                            <span className="text-sm">Total Users</span>
                                        </div>
                                        <span className="text-lg font-bold">{userStats?.totalUsers || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <UserCheck className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Active Users</span>
                                        </div>
                                        <span className="text-lg font-bold text-green-600">{userStats?.activeUsers || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <UserX className="h-4 w-4 text-red-600" />
                                            <span className="text-sm">Inactive Users</span>
                                        </div>
                                        <span className="text-lg font-bold text-red-600">{userStats?.inactiveUsers || 0}</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Members</span>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm text-green-600">{userStats?.members.active || 0} active</span>
                                            <span className="text-sm text-muted-foreground">/</span>
                                            <span className="text-sm font-semibold">{userStats?.members.total || 0}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Trainers</span>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-sm text-green-600">{userStats?.trainers.active || 0} active</span>
                                            <span className="text-sm text-muted-foreground">/</span>
                                            <span className="text-sm font-semibold">{userStats?.trainers.total || 0}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Admins</span>
                                        <span className="text-sm font-semibold">{userStats?.admins || 0}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* User Roles Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>User Roles Distribution</CardTitle>
                                <CardDescription>Users by role type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {usersByRoleData.length > 0 ? (
                                    <>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={usersByRoleData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) =>
                                                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                                                    }
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {usersByRoleData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="mt-4 space-y-2">
                                            {usersByRoleData.map((item) => (
                                                <div key={item.name} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-3 w-3 rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <span className="text-sm">{item.name}</span>
                                                    </div>
                                                    <span className="text-sm font-semibold">{item.value} users</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">No data available</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Membership Plan Distribution */}
                    <div className="grid gap-6 md:grid-cols-2 mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Membership Status</CardTitle>
                                <CardDescription>Members with and without active plans</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {memberStats ? (
                                    <>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <PieChart>
                                                <Pie
                                                    data={membershipDistributionData}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={({ name, percent }) =>
                                                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                                                    }
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {membershipDistributionData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="mt-4 space-y-2">
                                            {membershipDistributionData.map((item) => (
                                                <div key={item.name} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-3 w-3 rounded-full"
                                                            style={{ backgroundColor: item.color }}
                                                        />
                                                        <span className="text-sm">{item.name}</span>
                                                    </div>
                                                    <span className="text-sm font-semibold">{item.value} members</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">No data available</p>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Stats</CardTitle>
                                <CardDescription>Key performance indicators</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Active Members</span>
                                            <span className="text-sm font-semibold">
                                                {memberStats?.activeMembers || 0} / {memberStats?.totalMembers || 0}
                                            </span>
                                        </div>
                                        <Progress
                                            value={memberStats ? (memberStats.activeMembers / memberStats.totalMembers) * 100 : 0}
                                            className="h-2"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Members with Plans</span>
                                            <span className="text-sm font-semibold">
                                                {memberStats?.membersWithPlan || 0} / {memberStats?.totalMembers || 0}
                                            </span>
                                        </div>
                                        <Progress
                                            value={memberStats ? (memberStats.membersWithPlan / memberStats.totalMembers) * 100 : 0}
                                            className="h-2"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Members with Trainers</span>
                                            <span className="text-sm font-semibold">
                                                {memberStats?.membersWithTrainer || 0} / {memberStats?.totalMembers || 0}
                                            </span>
                                        </div>
                                        <Progress
                                            value={memberStats ? (memberStats.membersWithTrainer / memberStats.totalMembers) * 100 : 0}
                                            className="h-2"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Trainer Capacity</span>
                                            <span className="text-sm font-semibold">
                                                {trainerStats?.avgCapacityUsage || 0}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={trainerStats?.avgCapacityUsage || 0}
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Weekly Attendance */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Attendance</CardTitle>
                            <CardDescription>Average daily check-ins this week</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={attendanceData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="attendance" fill="#ef4444" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Revenue Tab */}
                <TabsContent value="revenue">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Trend</CardTitle>
                                <CardDescription>6-month revenue analysis</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#ef4444"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="expenses"
                                            stroke="#f59e0b"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="profit"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Breakdown</CardTitle>
                                <CardDescription>Current month revenue sources</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Memberships</span>
                                            <span className="text-sm font-semibold">$45,200 (67%)</span>
                                        </div>
                                        <Progress value={67} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Personal Training</span>
                                            <span className="text-sm font-semibold">$15,400 (23%)</span>
                                        </div>
                                        <Progress value={23} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Classes</span>
                                            <span className="text-sm font-semibold">$4,800 (7%)</span>
                                        </div>
                                        <Progress value={7} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium">Other</span>
                                            <span className="text-sm font-semibold">$1,600 (3%)</span>
                                        </div>
                                        <Progress value={3} className="h-2" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Revenue</span>
                                        <span className="text-lg font-bold">$67,000</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Expenses</span>
                                        <span className="text-lg font-bold text-orange-600">$34,000</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <span className="font-semibold">Net Profit</span>
                                        <span className="text-xl font-bold text-green-600">$33,000</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Members Tab */}
                <TabsContent value="members">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Member Statistics</CardTitle>
                                <CardDescription>Detailed member breakdown</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Total Members</p>
                                        <p className="text-2xl font-bold text-blue-600">{memberStats?.totalMembers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Active</p>
                                        <p className="text-2xl font-bold text-green-600">{memberStats?.activeMembers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Inactive</p>
                                        <p className="text-2xl font-bold text-red-600">{memberStats?.inactiveMembers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">New This Month</p>
                                        <p className="text-2xl font-bold text-purple-600">{memberStats?.newMembersThisMonth || 0}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">With Trainer</span>
                                        <span className="font-semibold">{memberStats?.membersWithTrainer || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Without Trainer</span>
                                        <span className="font-semibold">{memberStats?.membersWithoutTrainer || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">With Active Plan</span>
                                        <span className="font-semibold text-green-600">{memberStats?.membersWithPlan || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">Without Plan</span>
                                        <span className="font-semibold text-red-600">{memberStats?.membersWithoutPlan || 0}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Trainer Statistics</CardTitle>
                                <CardDescription>Trainer performance overview</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Total Trainers</p>
                                        <p className="text-2xl font-bold text-blue-600">{trainerStats?.totalTrainers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Active</p>
                                        <p className="text-2xl font-bold text-green-600">{trainerStats?.activeTrainers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-orange-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Available</p>
                                        <p className="text-2xl font-bold text-orange-600">{trainerStats?.availableTrainers || 0}</p>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-muted-foreground">Avg Capacity</p>
                                        <p className="text-2xl font-bold text-purple-600">
                                            {trainerStats?.avgCapacityUsage ? `${trainerStats.avgCapacityUsage}%` : "0%"}
                                        </p>
                                    </div>
                                </div>
                                {trainerStats?.topRatedTrainers && trainerStats.topRatedTrainers.length > 0 && (
                                    <div className="pt-4 border-t">
                                        <h4 className="font-semibold mb-3">Top Rated Trainers</h4>
                                        <div className="space-y-2">
                                            {trainerStats.topRatedTrainers.slice(0, 3).map((trainer) => (
                                                <div key={trainer.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                                    <span className="text-sm">{trainer.user.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-yellow-600">
                                                            ⭐ {trainer.rating.toFixed(1)}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            ({trainer.reviewCount})
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Member Experience Distribution */}
                    {memberStats?.membersByExperience && memberStats.membersByExperience.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Members by Experience Level</CardTitle>
                                <CardDescription>Distribution of workout experience</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={memberStats.membersByExperience}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="experience" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#ef4444" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    )}

                    {/* Trainer Specializations */}
                    {trainerStats?.trainersBySpecialization && trainerStats.trainersBySpecialization.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Trainers by Specialization</CardTitle>
                                <CardDescription>Expertise distribution</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {trainerStats.trainersBySpecialization.map((spec) => (
                                        <div key={spec.specialization} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">{spec.specialization}</span>
                                                <span className="text-sm font-semibold">{spec.count} trainers</span>
                                            </div>
                                            <Progress
                                                value={(spec.count / (trainerStats.totalTrainers || 1)) * 100}
                                                className="h-2"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Activity Tab */}
                <TabsContent value="activity">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Latest updates and events</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivities?.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                                            <activity.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <p className="font-semibold">{activity.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
