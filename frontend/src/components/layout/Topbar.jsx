import { useLocation, matchPath } from "react-router-dom";
import { LogOut } from "lucide-react";

import { useAuth } from "../../auth/AuthContext";
import { navItems } from "./navItems";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRef, useState } from "react";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const { user, logout } = useAuth();

  const name = user?.name || user?.username || "";

  const initial = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleEnter() {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            />
          }
        >
          <Avatar>
            <AvatarImage src={user?.picture} alt={name} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex flex-col gap-0.5 py-1.5">
              <span className="truncate text-sm font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal">
                {user?.email}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal">
                {user?.email}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal">
                {user?.email}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {name}
              </span>
              <span className="truncate text-xs font-normal">
                {user?.email}
              </span>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={logout}>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default function Topbar() {
  const { pathname } = useLocation();

  const current = navItems.find((item) =>
    matchPath({ path: item.to, end: !!item.end }, pathname),
  );

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center gap-3 border-b bg-background/80 px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      {/* Vertical divider */}
      <div aria-hidden="true" className="h-6 w-px shrink-0 bg-amber-700" />

      <h1 className="text-sm font-semibold">{current?.lable}</h1>

      <div className="ml-auto">
        <UserMenu />
      </div>
    </header>
  );
}
