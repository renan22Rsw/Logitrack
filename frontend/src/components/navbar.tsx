"use client";

import { Calendar, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type NavbarProps = {
  title: string;
  description: string;
};

export const Navbar = ({ title, description }: NavbarProps) => {
  const isMobile = useIsMobile();

  return (
    <nav className="flex justify-between py-4">
      <div className="flex space-x-4 px-8">
        <div className="flex items-center">
          <Menu color="#737373" size={20} />
        </div>

        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4">
        {!isMobile && (
          <div className="flex h-10 items-center rounded-md border-[1] px-2">
            <Calendar color="#737373" size={20} className="mr-2" />{" "}
            <span className="text-muted-foreground text-sm font-semibold">
              01/06/2024 - 31/06/2024
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-300">
            <h3>RS</h3>
          </div>
          {!isMobile && (
            <div>
              <h4 className="text-sm font-semibold">Renan Victor</h4>
              <p className="text-xs text-blue-400">Admin</p>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
