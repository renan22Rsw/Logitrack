import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";

export default function DashBoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />

          <main className="w-full bg-[#F8F9F9]">
            <Navbar />
            {children}
          </main>
        </TooltipProvider>
      </SidebarProvider>
    </>
  );
}
