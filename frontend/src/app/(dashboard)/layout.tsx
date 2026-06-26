import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";
import { getUser } from "@/lib/api/users/get-user";
import { Toaster } from "@/components/ui/sonner";

export default async function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar
            name={user?.name as string}
            email={user?.email as string}
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
