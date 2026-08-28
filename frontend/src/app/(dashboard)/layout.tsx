export const dynamic = "force-dynamic";

import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";
import { getCurrentUser } from "@/lib/api/users/get-user";
import { Toaster } from "@/components/ui/sonner";
import { redirect } from "next/navigation";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  if (user.mustChangePassword) {
    redirect("/reset-password");
  }

  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar
            name={user?.name as string}
            email={user?.email as string}
            isDemo={user.isDemo as boolean}
          />

          <main className="w-full bg-[#F8F9F9]">
            <Navbar />
            {children}
          </main>
          <Toaster />
        </TooltipProvider>
      </SidebarProvider>
    </>
  );
}
