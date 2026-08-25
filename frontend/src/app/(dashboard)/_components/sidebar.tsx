"use client";

import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  FileText,
  Users,
  User,
  LogOut,
  ChevronRight,
  Box,
  ClipboardList,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const mainNavItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Produtos",
    icon: Package,
    href: "/products",
  },
  {
    title: "Movimentações",
    icon: ArrowLeftRight,
    href: "/stock-movements",
  },
];

const adminNavItems = [
  {
    title: "Usuários",
    icon: Users,
    href: "/users",
  },
  {
    title: "Perfil",
    icon: User,
    href: "/profile",
  },

  {
    title: "Audit log",
    icon: ClipboardList,
    href: "/audit-log",
  },
];

interface AppSideBarProps {
  name: string;
  email: string;
  isDemo: boolean;
}

export const AppSidebar = ({ name, email, isDemo }: AppSideBarProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/sign-in");
  };

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center gap-3">
          <div className="bg-sidebar-primary/20 flex size-10 items-center justify-center rounded-lg">
            <Box className="text-sidebar-primary size-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-sidebar-foreground text-base font-semibold">
              LogiTrack
            </span>
            <span className="text-sidebar-foreground/60 text-xs">
              Gestão de Logística
            </span>
          </div>
        </div>
      </SidebarHeader>

      <div className="px-3 py-2">
        <button className="bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors">
          <LayoutDashboard className="size-5" />
          Dashboard
        </button>
      </div>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 px-3 text-xs font-medium tracking-wider uppercase">
            Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground gap-3 px-3 py-2.5"
                    tooltip={item.title}
                  >
                    <item.icon className="size-5" />
                    <Link href={item.href}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 px-3 text-xs font-medium tracking-wider uppercase">
            Administração
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground gap-3 px-3 py-2.5"
                    tooltip={item.title}
                  >
                    <item.icon className="size-5" />
                    <Link href={item.href}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto p-3">
        <div className="bg-sidebar-accent/50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm font-medium">
                {name?.charAt(0) + name?.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <span className="text-sidebar-foreground text-sm font-medium">
                {name}
              </span>
              {isDemo ? (
                ""
              ) : (
                <span className="text-sidebar-foreground/60 text-xs">
                  {email}
                </span>
              )}
            </div>
            <ChevronRight className="text-sidebar-foreground/60 size-4" />
          </div>
        </div>
        <SidebarSeparator className="my-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground gap-3 px-3 py-2"
              onClick={handleLogout}
            >
              <LogOut className="size-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
