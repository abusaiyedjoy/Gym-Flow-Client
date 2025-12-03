import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserInfo();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={!!user?.id} user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
