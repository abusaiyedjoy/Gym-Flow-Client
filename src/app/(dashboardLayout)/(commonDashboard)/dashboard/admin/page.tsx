import { Suspense } from "react";
import { getDashboardMetaData } from "@/services/dashboard/dashboard.service";
import { StatsCard } from "@/components/modules/dashboard/StatsCard";
import { MemberGrowthChart } from "@/components/modules/dashboard/MemberGrowthChart";
import { RevenueChart } from "@/components/modules/dashboard/RevenueChart";
import { AttendanceChart } from "@/components/modules/dashboard/AttendanceChart";
import { PaymentDistributionChart } from "@/components/modules/dashboard/PaymentDistributionChart";
import { ClassPopularityChart } from "@/components/modules/dashboard/ClassPopularityChart";
import { DashboardSkeleton } from "@/components/modules/dashboard/DashboardSkeleton";
import { Dumbbell, AlertCircle } from "lucide-react";

// Super Admin specific data
interface SuperAdminMetaData {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  totalTrainers: number;
  activeTrainers: number;
  totalAdmins: number;
  totalClasses: number;
  totalPayments: number;
  totalRevenue: number;
  todayAttendance: number;
  thisMonthRevenue: number;
  expiringMemberships: number;
  memberGrowthChart: Array<{ month: string; count: number }>;
  revenueChart: Array<{ month: string; revenue: number }>;
  attendanceChart: Array<{ month: string; count: number }>;
  classPopularityChart: Array<{ className: string; bookings: number }>;
  paymentStatusDistribution: Array<{ status: string; count: number }>;
}

// Admin specific data
interface AdminMetaData {
  totalMembers: number;
  activeMembers: number;
  totalTrainers: number;
  totalClasses: number;
  totalPayments: number;
  totalRevenue: number;
  todayAttendance: number;
  pendingPayments: number;
  upcomingClasses: number;
  revenueChart: Array<{ month: string; revenue: number }>;
  attendanceChart: Array<{ month: string; count: number }>;
  membershipPlanDistribution: Array<{ planName: string; memberCount: number }>;
  trainerPerformanceChart: Array<{
    trainerName: string;
    clients: number;
    rating: number;
    successRate: number;
  }>;
}

type DashboardMetaData = SuperAdminMetaData | AdminMetaData;

// Type guard to check if data is SuperAdminMetaData
function isSuperAdminData(data: DashboardMetaData): data is SuperAdminMetaData {
  return 'expiringMemberships' in data && 'memberGrowthChart' in data;
}

async function AdminDashboardContent() {
  const result = await getDashboardMetaData();

  if (!result.success) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-semibold text-lg">
            Failed to load dashboard
          </p>
          <p className="text-muted-foreground">{result.message}</p>
        </div>
      </div>
    );
  }

  const data: DashboardMetaData = result.data;
  const isSuperAdmin = isSuperAdminData(data);

  // Stats configuration based on role
  const stats = isSuperAdmin
    ? [
        {
          title: "Total Members",
          value: data.totalMembers.toString(),
          change: `${data.activeMembers} active`,
          iconName: "Users",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Active Members",
          value: data.activeMembers.toString(),
          change: `${data.inactiveMembers} inactive`,
          iconName: "UserCheck",
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          title: "Total Trainers",
          value: data.totalTrainers.toString(),
          change: `${data.activeTrainers} active`,
          iconName: "Dumbbell",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
        {
          title: "Total Admins",
          value: data.totalAdmins.toString(),
          change: "System admins",
          iconName: "Shield",
          color: "text-red-600",
          bgColor: "bg-red-100",
        },
        {
          title: "Total Classes",
          value: data.totalClasses.toString(),
          change: "Active classes",
          iconName: "Activity",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        },
        {
          title: "Total Revenue",
          value: `৳${data.totalRevenue.toLocaleString()}`,
          change: `৳${data.thisMonthRevenue.toLocaleString()} this month`,
          iconName: "TrendingUp",
          color: "text-emerald-600",
          bgColor: "bg-emerald-100",
        },
        {
          title: "Today's Attendance",
          value: data.todayAttendance.toString(),
          change: "Check-ins today",
          iconName: "Calendar",
          color: "text-indigo-600",
          bgColor: "bg-indigo-100",
        },
        {
          title: "Total Payments",
          value: data.totalPayments.toString(),
          change: "Completed payments",
          iconName: "CreditCard",
          color: "text-cyan-600",
          bgColor: "bg-cyan-100",
        },
      ]
    : [
        {
          title: "Total Members",
          value: data.totalMembers.toString(),
          change: `${data.activeMembers} active`,
          iconName: "Users",
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Active Members",
          value: data.activeMembers.toString(),
          change: "Current active",
          iconName: "UserCheck",
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          title: "Total Trainers",
          value: data.totalTrainers.toString(),
          change: "Available trainers",
          iconName: "Dumbbell",
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
        {
          title: "Total Classes",
          value: data.totalClasses.toString(),
          change: "Active classes",
          iconName: "Activity",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
        },
        {
          title: "Total Revenue",
          value: `৳${data.totalRevenue.toLocaleString()}`,
          change: "All time revenue",
          iconName: "TrendingUp",
          color: "text-emerald-600",
          bgColor: "bg-emerald-100",
        },
        {
          title: "Today's Attendance",
          value: data.todayAttendance.toString(),
          change: "Check-ins today",
          iconName: "Calendar",
          color: "text-indigo-600",
          bgColor: "bg-indigo-100",
        },
        {
          title: "Pending Payments",
          value: data.pendingPayments.toString(),
          change: "Awaiting payment",
          iconName: "Clock",
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        },
        {
          title: "Upcoming Classes",
          value: data.upcomingClasses.toString(),
          change: "Confirmed bookings",
          iconName: "CalendarCheck",
          color: "text-cyan-600",
          bgColor: "bg-cyan-100",
        },
      ];

  return (
    <div className="space-y-6">
      {/* Stats Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            iconName={stat.iconName}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>

      {/* Important Alerts - Super Admin Only */}
      {isSuperAdmin && data.expiringMemberships > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-yellow-900">
                ⚠️ Expiring Memberships
              </h4>
              <p className="text-sm text-yellow-700">
                {data.expiringMemberships} membership(s) expiring in the next 7
                days
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Payments Alert - Admin Only */}
      {!isSuperAdmin && data.pendingPayments > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900">
                💳 Pending Payments
              </h4>
              <p className="text-sm text-amber-700">
                {data.pendingPayments} payment(s) awaiting confirmation
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section - Different for Super Admin and Admin */}
      {isSuperAdmin ? (
        <>
          {/* Super Admin Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {data.memberGrowthChart.length > 0 && (
              <MemberGrowthChart data={data.memberGrowthChart} />
            )}

            {data.revenueChart.length > 0 && (
              <RevenueChart data={data.revenueChart} />
            )}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {data.attendanceChart.length > 0 && (
              <AttendanceChart data={data.attendanceChart} />
            )}

            {data.paymentStatusDistribution.length > 0 && (
              <PaymentDistributionChart data={data.paymentStatusDistribution} />
            )}
          </div>

          {data.classPopularityChart.length > 0 && (
            <ClassPopularityChart data={data.classPopularityChart} />
          )}
        </>
      ) : (
        <>
          {/* Admin Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {data.revenueChart.length > 0 && (
              <RevenueChart data={data.revenueChart} />
            )}

            {data.attendanceChart.length > 0 && (
              <AttendanceChart data={data.attendanceChart} />
            )}
          </div>

          {/* Additional Admin-specific charts can be added here */}
          {/* For example: membershipPlanDistribution, trainerPerformanceChart */}
        </>
      )}

      {/* Empty State */}
      {data.totalClasses === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Dumbbell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">No Classes Yet</h3>
          <p className="text-sm text-gray-600">
            Start by creating your first gym class
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of gym operations and performance
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <AdminDashboardContent />
      </Suspense>
    </div>
  );
}