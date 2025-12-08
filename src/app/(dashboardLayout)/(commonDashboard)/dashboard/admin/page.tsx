"use client";

import {
    Users,
    Dumbbell,
    DollarSign,
    TrendingUp,
    Calendar,
    Activity,
    UserPlus,
    CreditCard,
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

// Mock data for charts
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

    const stats = [
        {
            title: "Total Members",
            value: "378",
            change: "+12.5%",
            trend: "up",
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-600/10",
        },
        {
            title: "Active Trainers",
            value: "18",
            change: "+2",
            trend: "up",
            icon: Dumbbell,
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Monthly Revenue",
            value: "$67,000",
            change: "+15.3%",
            trend: "up",
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-600/10",
        },
        {
            title: "Avg Attendance",
            value: "159/day",
            change: "+8.2%",
            trend: "up",
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-orange-600/10",
        },
    ];

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
                                        <TrendingUp className="h-4 w-4 text-green-600" />
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
                        {/* Revenue Chart */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Revenue Overview</CardTitle>
                                <CardDescription>Monthly revenue, expenses, and profit</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={revenueData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area
                                            type="monotone"
                                            dataKey="revenue"
                                            stackId="1"
                                            stroke="#ef4444"
                                            fill="#ef4444"
                                            fillOpacity={0.6}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="profit"
                                            stackId="2"
                                            stroke="#10b981"
                                            fill="#10b981"
                                            fillOpacity={0.6}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Membership Distribution */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Membership Distribution</CardTitle>
                                <CardDescription>Members by plan type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={membershipDistribution}
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
                                            {membershipDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-4 space-y-2">
                                    {membershipDistribution?.map((item) => (
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Member Growth</CardTitle>
                            <CardDescription>6-month member and trainer growth trend</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={memberGrowthData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="members"
                                        stroke="#ef4444"
                                        strokeWidth={3}
                                        dot={{ r: 6 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="trainers"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
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
