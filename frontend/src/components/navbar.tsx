"use client";

import { Calendar } from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const pathname = usePathname().split("/")[1];
  const ismobile = useIsMobile();

  return (
    <nav className="flex justify-between bg-white p-4">
      <div className="flex space-x-4">
        <div className="flex items-center">
          <SidebarTrigger />
        </div>

        <div>
          <h3 className="font-semibold">
            {pathname === "dashboard" && "Dashboard"}
          </h3>
          <p className="text-muted-foreground text-sm">
            {pathname === "dashboard" &&
              "Versão geral da sua operação logística"}
          </p>
        </div>
      </div>

      <div className="border-muted flex max-h-10 items-center rounded-md border px-2">
        <Calendar color="#737373" size={20} className="mr-2" />
        {ismobile ? (
          <p className="text-muted-foreground text-center text-sm">
            01/06/2024 31/06/2024{" "}
          </p>
        ) : (
          <p className="text-muted-foreground text-sm">
            01/06/2024 - 31/06/2024
          </p>
        )}
      </div>
    </nav>
  );
};
