import DashboardLayout from "@/components/modules/dashboard/Layout";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user) return null;

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}