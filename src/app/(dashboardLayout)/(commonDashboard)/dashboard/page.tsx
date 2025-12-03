import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function MemberDashboard() {
  const user = await getUserInfo();
  console.log("Member Dashboard User:", user);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{user.name} Dashboard</h1>
      {/* Your dashboard content */}
    </div>
  );
}