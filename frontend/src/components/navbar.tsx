"use client";

import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname().split("/")[1];

  return (
    <nav className="flex justify-between p-4">
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
    </nav>
  );
};
