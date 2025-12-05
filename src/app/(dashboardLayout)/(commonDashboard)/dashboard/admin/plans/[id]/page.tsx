"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, Users, DollarSign, Calendar, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/PageComponents";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockPlan = {
  id: "PLAN-002",
  name: "Premium Plan",
  price: 199,
  billingCycle: "Monthly",
  status: "Active",
  description: "Perfect for fitness enthusiasts who want access to all gym facilities, unlimited classes, and personalized training.",
  activeMembers: 234,
  totalRevenue: 46566,
  features: [
    "Unlimited gym access",
    "All group classes included",
    "2 personal training sessions/month",
    "Access to premium equipment",
    "Locker room access",
    "Free gym merchandise",
    "Guest passes (2/month)",
    "Mobile app access",
  ],
};

const recentMembers = [
  { id: "M-045", name: "John Smith", joinDate: "2024-12-01", status: "Active" },
  { id: "M-046", name: "Emily Davis", joinDate: "2024-12-03", status: "Active" },
  { id: "M-047", name: "Michael Brown", joinDate: "2024-12-05", status: "Active" },
  { id: "M-048", name: "Sarah Wilson", joinDate: "2024-12-07", status: "Active" },
];

const getStatusColor = (status: string) => {
  return status === "Active" ? "bg-green-500/10 text-green-500" : "bg-gray-500/10 text-gray-500";
};

export default function PlanDetailPage() {
  const params = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/plans">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <PageHeader
          title={mockPlan.name}
          description={`Plan ID: ${mockPlan.id}`}
          action={
            <Link href={`/dashboard/admin/plans/${params.id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Plan
              </Button>
            </Link>
          }
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Price</p>
                <p className="text-3xl font-bold">${mockPlan.price}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-600/10">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-3xl font-bold">{mockPlan.activeMembers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-600/10">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">${mockPlan.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={`${getStatusColor(mockPlan.status)} mt-2`}>
                  {mockPlan.status}
                </Badge>
              </div>
              <div className="p-3 rounded-lg bg-orange-600/10">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Plan Information</CardTitle>
            <CardDescription>Detailed information about this membership plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Description</p>
              <p className="text-base">{mockPlan.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">Billing Cycle</p>
                <p className="font-semibold">{mockPlan.billingCycle}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="font-semibold">${mockPlan.price}/month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>What's included in this plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockPlan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Recent Members */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Members ({recentMembers.length})</CardTitle>
          <CardDescription>Latest members who joined this plan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">ID: {member.id} • Joined {member.joinDate}</p>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status}
                </Badge>
                <Link href={`/dashboard/admin/members/${member.id}`}>
                  <Button variant="outline" size="sm">View</Button>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
