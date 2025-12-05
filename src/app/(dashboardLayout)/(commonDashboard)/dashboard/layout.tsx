import DashboardLayout from "@/components/modules/dashboard/Layout";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export default async function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user) return redirect('/signin');

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}