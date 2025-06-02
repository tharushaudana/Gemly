"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Package, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      href: "/products",
      label: "Products",
      icon: <Package className="h-5 w-5" />,
      active: pathname === "/products",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const sidebarContent = (
    <div className={cn("flex h-full flex-col gap-2", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <span className="text-lg">Jewel Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={route.active ? "default" : "ghost"}
              className={cn("w-full justify-start gap-2", route.active && "bg-primary text-primary-foreground")}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={route.href}>
                {route.icon}
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
      <div className="mt-auto border-t p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[160px]">{user?.email || "user@example.com"}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r">
        {sidebarContent}
      </aside>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}