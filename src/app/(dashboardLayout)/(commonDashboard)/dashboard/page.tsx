import { getUserInfo } from "@/services/auth/getUserInfo";
import { redirect } from "next/navigation";

export default async function DashboardRedirectPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/signin");
  }

  // Redirect based on user role
  switch (user.role) {
    case "SUPER_ADMIN":
      redirect("/dashboard/admin");
    case "ADMIN":
      redirect("/dashboard/admin");
    case "TRAINER":
      redirect("/dashboard/trainer");
    case "MEMBER":
      redirect("/dashboard/member");
    default:
      redirect("/signin");
  }
}